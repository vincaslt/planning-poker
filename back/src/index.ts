import micro, { createError } from 'micro';
import * as SocketIO from 'socket.io';
import { generateRandomString } from './utils/string';
import { withCors } from './lib/decorators/withCors';
import { withErrorHandling } from './lib/decorators/withErrorHandling';
import { withRouter } from './lib/decorators/withRouter';
import { get } from 'microrouter';
import { getParams } from './lib/utils/getParams';
import { STATUS_ERROR } from './lib/constants';
import { omit } from 'ramda';

const withDefaultLogging = <R, A extends any[]>(fn: (...args: A) => R) => {
  return (...args: A) => {
    try {
      return fn(...args);
    } catch (err) {
      console.error(err);
    }
  };
};

interface Estimate {
  participant: Participant;
  estimate?: number | null;
}

interface Participant {
  id: string;
  name: string;
  isSpectator: boolean;
}

interface Task {
  id: string;
  name: string;
  estimates: Estimate[];
  estimate?: number | null;
}

interface ActiveTask {
  taskId: string;
  revealed: boolean;
  estimates: Estimate[];
}

interface EstimationSession {
  id: string;
  title: string;
  tasks: { [taskId: string]: Task };
  participants: { [participantId: string]: Participant };
  ownerId?: string;
  active?: ActiveTask;
  cleanupTimeout?: NodeJS.Timeout;
}

const toActiveTask = (task?: ActiveTask) => {
  return (
    task && {
      taskId: task.taskId,
      revealed: task.revealed,
      ...(task.revealed
        ? { estimates: task.estimates }
        : {
            readyIds: task.estimates.map(({ participant }) => participant.id),
          }),
    }
  );
};

const toClientData = (session: EstimationSession) => {
  return omit(['cleanupTimeout'], {
    ...session,
    active: toActiveTask(session.active),
  });
};

const participants = new Map<SocketIO.Socket, Participant>(); // Socket : participantId
const participantSessions = new Map<Participant, EstimationSession>();
const sessions = new Map<string, EstimationSession>(); // sessionId : EstimationSession

const server = micro(
  withCors(
    withErrorHandling(
      withRouter(
        get('/:id', (req, res) => {
          const { id } = getParams(req, ['id']);
          const session = sessions.get(id);
          if (session) {
            return toClientData(session);
          }

          throw createError(STATUS_ERROR.NOT_FOUND, 'Session does not exist');
        })
      )
    )
  )
);

const io = SocketIO(server, { path: '/ws' });

io.on('connection', (ws) => {
  console.log('a user connected', ws.id);

  const getParticipantSession = () => {
    const participant = participants.get(ws);
    if (!participant) {
      throw new Error(`Participant not found for socket (${ws.id})`);
    }

    const session = participantSessions.get(participant);
    if (!session?.participants[participant.id]) {
      throw new Error(`Session not found for participant ${participant.id}`);
    }

    return { session, participant };
  };

  // TODO: on reconnect reclaim participant based on token in a session

  ws.on(
    'disconnect',
    withDefaultLogging(() => {
      const { session, participant } = getParticipantSession();

      // Keep participant for revealed task as a snapshot
      if (session.active && !session.active.revealed) {
        session.active.estimates = session.active.estimates.filter(
          ({ participant: { id } }) => participant.id !== id
        );
      }
      delete session.participants[participant.id];
      participantSessions.delete(participant);
      participants.delete(ws);

      const hasOwnerLeft = session.ownerId === participant.id;
      const participantsList = Object.keys(session.participants);

      if (hasOwnerLeft) {
        session.ownerId = participantsList[0];
      }

      if (participantsList.length) {
        io.in(session.id).emit(
          'participant_left',
          toClientData(session),
          participant.id
        );
      } else {
        if (session.cleanupTimeout) {
          clearTimeout(session.cleanupTimeout);
        }
        session.cleanupTimeout = setTimeout(() => {
          if (!Object.keys(session.participants).length) {
            sessions.delete(session.id);
          }
        }, 1000 * 60 * 60);
      }
    })
  );

  ws.on(
    'reconnect',
    withDefaultLogging(() => {
      console.log('user reconnected', ws.id);
    })
  );

  ws.on(
    'create_session',
    withDefaultLogging(
      (sessionTitle: string, participantInfo: Omit<Participant, 'id'>) => {
        const sessionId = generateRandomString(9);

        ws.join(sessionId, (err) => {
          if (err) {
            throw err;
          }

          const participant: Participant = {
            id: generateRandomString(16),
            ...participantInfo,
          };
          const session: EstimationSession = {
            id: sessionId,
            title: sessionTitle,
            participants: { [participant.id]: participant },
            ownerId: participant.id,
            tasks: {},
          };

          participants.set(ws, participant);
          sessions.set(sessionId, session);
          participantSessions.set(participant, session);

          ws.emit('joined_session', toClientData(session), participant.id); // TODO: send token
        });
      }
    )
  );

  ws.on(
    'join_session',
    withDefaultLogging(
      async (sessionId: string, participantInfo: Omit<Participant, 'id'>) => {
        console.log('joining', sessionId, participantInfo);
        const session = sessions.get(sessionId);

        if (!session) {
          throw new Error(`Session not found ${sessionId}`);
        }

        ws.join(sessionId, (err) => {
          if (err) {
            throw err;
          }

          const participant = {
            id: generateRandomString(16),
            ...participantInfo,
          };
          participants.set(ws, participant);
          session.participants[participant.id] = participant;
          participantSessions.set(participant, session);

          if (Object.keys(session.participants).length === 1) {
            session.ownerId = participant.id;
          }

          ws.emit('joined_session', toClientData(session), participant.id); // TODO: send token
          ws.to(sessionId).emit(
            'participant_joined',
            toClientData(session),
            participant.id
          );
        });
      }
    )
  );

  ws.on(
    'add_task',
    withDefaultLogging((name: string) => {
      const { session } = getParticipantSession();

      const id = generateRandomString(9);
      const task: Task = {
        id,
        estimates: [],
        name,
      };
      session.tasks[id] = task;

      io.in(session.id).emit('task_added', toClientData(session), task.id);
    })
  );

  ws.on(
    'rename_task',
    withDefaultLogging((taskId: string, name: string) => {
      const { session } = getParticipantSession();

      const task = session.tasks[taskId];

      if (!task) {
        throw new Error(`Task not found ${taskId}`);
      }

      task.name = name;

      io.in(session.id).emit('task_renamed', toClientData(session), task.id);
    })
  );

  ws.on(
    'start_estimation',
    withDefaultLogging((taskId: string) => {
      // TODO: is user owner check
      const { session } = getParticipantSession();

      session.active = {
        taskId: session.tasks[taskId].id,
        estimates: [],
        revealed: false,
      };

      io.in(session.id).emit(
        'estimation_started',
        toClientData(session),
        session.active.taskId
      );
    })
  );
  ws.on(
    'cancel_estimation',
    withDefaultLogging(() => {
      // TODO: is user owner check
      const { session } = getParticipantSession();

      session.active = undefined;

      io.in(session.id).emit('estimation_canceled', toClientData(session));
    })
  );

  ws.on(
    'add_estimate',
    withDefaultLogging((estimate: number | null) => {
      // TODO: check if participant already estimated
      const { participant, session } = getParticipantSession();

      if (!session.active) {
        throw new Error('No task is currently being estimated');
      }

      session.active.estimates = session.active.estimates.filter(
        ({ participant: { id } }) => participant.id !== id
      );
      session.active.estimates.push({
        estimate,
        participant,
      });

      io.in(session.id).emit(
        'estimate_added',
        toClientData(session),
        participant.id
      );
    })
  );

  ws.on(
    'reveal_estimates',
    withDefaultLogging(() => {
      const { session } = getParticipantSession();

      if (!session.active) {
        throw new Error('No task is currently being estimated');
      }

      // Adds "unknown" estimates for every participant who was not ready
      Object.values(session.participants).forEach((participant) => {
        const participantEstimate = session.active?.estimates.find(
          ({ participant: { id } }) => participant.id === id
        );
        if (!participant.isSpectator && !participantEstimate) {
          session.active?.estimates.push({
            participant,
          });
        }
      });

      session.active.revealed = true;

      io.in(session.id).emit(
        'estimates_revealed',
        toClientData(session),
        session.active.estimates
      );
    })
  );

  ws.on(
    'finish_estimation',
    withDefaultLogging((estimate: number | null) => {
      // TODO: is user owner check
      const { session } = getParticipantSession();

      if (!session.active) {
        throw new Error('No task is currently being estimated');
      }

      const task = session.tasks[session.active.taskId];
      task.estimate = estimate;
      task.estimates = session.active.estimates;

      session.active = undefined;

      io.in(session.id).emit(
        'estimation_finished',
        toClientData(session),
        task
      );
    })
  );
});

server.listen(5000, () => console.log('Listening on localhost:5000'));
