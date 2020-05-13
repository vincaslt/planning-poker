import { useState, useRef } from 'react';
import { createContainer } from 'unstated-next';
import SocketIO from 'socket.io-client';
import EstimationSession, { EstimationSessionData } from './estimationSession';
import { API_URL } from '../constants';

function useConnection() {
  const {
    setEstimationSession,
    setParticipantId,
  } = EstimationSession.useContainer();
  const connectionRef = useRef<SocketIOClient.Socket>();
  const [connected, setConnected] = useState(
    () => connectionRef.current?.connected ?? false
  );

  const connect = async () => {
    const standardEvents = [
      'participant_joined',
      'participant_joined',
      'participant_left',
      'task_added',
      'estimation_started',
      'estimation_finished',
      'estimation_canceled',
      'estimates_revealed',
      'estimate_added',
      'task_renamed',
    ];

    return new Promise<void>((resolve, reject) => {
      connectionRef.current = SocketIO(API_URL, {
        path: '/ws',
      });

      connectionRef.current.on('disconnect', () => {
        setConnected(false);
        setEstimationSession(undefined);
      });

      connectionRef.current.on('connect', () => {
        setConnected(true);
        resolve();
      });

      connectionRef.current.on('connect_error', (err: Error) => {
        reject(err);
      });

      connectionRef.current.on(
        'joined_session',
        (session: EstimationSessionData, participantId: string) => {
          setParticipantId(participantId);
          setEstimationSession(session);
        }
      );

      standardEvents.forEach((event) => {
        connectionRef.current?.on(event, (session: EstimationSessionData) => {
          setEstimationSession(session);
        });
      });
    });
  };

  const disconnect = () => {
    connectionRef.current?.close();
  };

  const createSession = (
    sessionTitle: string,
    name: string,
    isSpectator = false
  ) => {
    connectionRef.current?.emit('create_session', sessionTitle, {
      name,
      isSpectator,
    });
  };

  const joinSession = (
    sessionId: string,
    name: string,
    isSpectator = false
  ) => {
    connectionRef.current?.emit('join_session', sessionId, {
      name,
      isSpectator,
    });
  };

  const addTask = (name: string) => {
    connectionRef.current?.emit('add_task', name);
  };

  const renameTask = (taskId: string, name: string) => {
    connectionRef.current?.emit('rename_task', taskId, name);
  };

  const startEstimation = (taskId: string) => {
    connectionRef.current?.emit('start_estimation', taskId);
  };

  const addEstimate = (estimate: number | null) => {
    connectionRef.current?.emit('add_estimate', estimate);
  };

  const revealEstimates = () => {
    connectionRef.current?.emit('reveal_estimates');
  };

  const finishEstimation = (estimate: number | null) => {
    connectionRef.current?.emit('finish_estimation', estimate);
  };

  const cancelEstimation = () => {
    connectionRef.current?.emit('cancel_estimation');
  };

  return {
    connected,
    connect,
    disconnect,
    createSession,
    joinSession,
    addTask,
    renameTask,
    startEstimation,
    addEstimate,
    revealEstimates,
    finishEstimation,
    cancelEstimation,
  };
}

const Connection = createContainer(useConnection);

export default Connection;
