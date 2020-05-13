import { useState } from 'react';
import { createContainer } from 'unstated-next';

export interface Estimate {
  participant: Participant;
  estimate: number | null;
}

export interface Participant {
  id: string;
  name: string;
  isSpectator: boolean;
}

export interface ActiveTask {
  taskId: string;
  revealed: false;
  readyIds: string[];
}

export interface RevealedActiveTask {
  taskId: string;
  revealed: true;
  estimates: Estimate[];
}

export interface Task {
  id: string;
  name: string;
  estimates: Estimate[];
  estimate?: number | null;
}

export interface EstimationSessionData {
  id: string;
  title: string;
  tasks: { [taskId: string]: Task };
  participants: { [participantId: string]: Participant };
  active?: ActiveTask | RevealedActiveTask;
  ownerId?: string;
}

function useEstimationSession() {
  const [participantId, setParticipantId] = useState<string>();
  const [estimationSession, setEstimationSession] = useState<
    EstimationSessionData
  >();

  return {
    isOwner: !!(participantId && estimationSession?.ownerId === participantId),
    estimationSession,
    participantId,
    setEstimationSession,
    setParticipantId,
  };
}

const EstimationSession = createContainer(useEstimationSession);

export default EstimationSession;
