import React from 'react';
import ParticipantScore from './ParticipantScore';
import { Participant } from '../state/estimationSession';
import ScoresArea from './ScoresArea';

interface Props {
  participantId: string;
  estimate?: number | null;
  participants: { [id: string]: Participant };
  readyIds: string[];
}

function UnrevealedEstimates({
  estimate,
  participantId,
  participants,
  readyIds,
}: Props) {
  return (
    <ScoresArea>
      {readyIds &&
        Object.values(participants).map(
          ({ id, name, isSpectator }) =>
            !isSpectator && (
              <ParticipantScore
                key={id}
                name={name}
                ready={readyIds.includes(id)}
                score={id === participantId ? estimate : undefined}
              />
            )
        )}
    </ScoresArea>
  );
}

export default UnrevealedEstimates;
