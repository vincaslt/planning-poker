import React, { useState, useEffect } from 'react';
import {
  Participant,
  ActiveTask,
  RevealedActiveTask,
} from '../../../state/estimationSession';
import Connection from '../../../state/connection';
import SpectatorActions from './Actions/SpectatorActions';
import EstimationActions from './Actions/EstimationActions';
import RevealActions from './Actions/RevealActions';
import ParticipantsEstimates from '../../../components/ParticipantsEstimates';
import UnrevealedEstimates from '../../../components/UnrevealedEstimates';
import { roundToArray, average } from '../../../utils/math';
import { ESTIMATION_VALUES } from '../../../constants';

interface Props {
  participantId: string;
  participants: { [id: string]: Participant };
  activeTask: ActiveTask | RevealedActiveTask;
}

function EstimationArea({ participantId, participants, activeTask }: Props) {
  const { addEstimate } = Connection.useContainer();
  const [estimate, setEstimate] = useState<number | null>();
  const estimates = 'estimates' in activeTask ? activeTask.estimates : [];
  const spectator = participants[participantId]?.isSpectator;

  useEffect(() => {
    if (estimate) {
      setEstimate(undefined);
    }
  }, [activeTask.taskId]);

  const handleSelect = (value: number | null) => {
    setEstimate(value);
    addEstimate(value);
  };

  if (activeTask.revealed) {
    const avg = average(
      estimates.map((e) => e.estimate).filter((e): e is number => e !== null)
    );
    const preliminaryEstimate =
      avg !== null
        ? roundToArray(
            ESTIMATION_VALUES.filter((e): e is number => e !== null),
            avg
          )
        : avg;

    return (
      <>
        <ParticipantsEstimates estimates={activeTask.estimates} />
        <RevealActions estimate={preliminaryEstimate} />
      </>
    );
  }

  return (
    <>
      <UnrevealedEstimates
        participantId={participantId}
        participants={participants}
        readyIds={activeTask.readyIds}
        estimate={estimate}
      />
      {spectator ? (
        <SpectatorActions />
      ) : (
        <EstimationActions onSelect={handleSelect} selected={estimate} />
      )}
    </>
  );
}

export default EstimationArea;
