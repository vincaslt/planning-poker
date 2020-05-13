import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Connection from '../../state/connection';
import EstimationSession from '../../state/estimationSession';
import EstimationArea from './EstimationArea/EstimationArea';
import Tasks from './Tasks/Tasks';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import JoinEstimation from './JoinEstimation';
import Guide from '../../components/Guide';
import ParticipantsEstimates from '../../components/ParticipantsEstimates';

function EstimationPage() {
  const {
    estimationSession,
    participantId,
    isOwner,
  } = EstimationSession.useContainer();
  const { disconnect, startEstimation } = Connection.useContainer();
  const [viewingTask, setViewingTask] = useState<string>();
  const { sessionId } = useParams<{ sessionId: string }>();
  const activeTask = estimationSession?.active;

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeTask && viewingTask) {
      setViewingTask(undefined);
    }
  }, [activeTask]);

  if (
    !estimationSession ||
    !participantId ||
    estimationSession.id !== sessionId
  ) {
    return <JoinEstimation sessionId={sessionId} />;
  }

  const handleClickTask = (taskId: string) => {
    const hasEstimate = estimationSession.tasks[taskId].estimate !== undefined;

    if (
      (isOwner && (!activeTask || !hasEstimate)) ||
      (!activeTask && hasEstimate)
    ) {
      setViewingTask(taskId);
    }

    if (isOwner && !hasEstimate && activeTask?.taskId !== taskId) {
      startEstimation(taskId);
    }
  };

  const hasTasks = Object.keys(estimationSession.tasks).length > 0;
  const spectators = Object.values(estimationSession.participants)
    .filter(({ isSpectator }) => isSpectator)
    .map(({ name }) => name);

  return (
    <>
      <Header title={estimationSession.title} spectators={spectators} />
      <Layout className="flex" hasHeader>
        <Tasks
          onSelect={handleClickTask}
          selected={activeTask?.taskId || viewingTask}
        />
        <div className="py-4 px-4 xl:px-8 w-full overflow-auto relative flex flex-col">
          {activeTask ? (
            <EstimationArea
              participantId={participantId}
              participants={estimationSession.participants}
              activeTask={activeTask}
            />
          ) : viewingTask ? (
            <ParticipantsEstimates
              estimates={estimationSession.tasks[viewingTask].estimates}
            />
          ) : (
            <Guide hasTasks={hasTasks} />
          )}
        </div>
      </Layout>
    </>
  );
}

export default EstimationPage;
