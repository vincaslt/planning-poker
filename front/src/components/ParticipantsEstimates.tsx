import React from 'react';
import ParticipantScore from './ParticipantScore';
import { Estimate } from '../state/estimationSession';
import ScoresArea from './ScoresArea';

interface Props {
  estimates: Estimate[];
}

function ParticipantsEstimates({ estimates }: Props) {
  return (
    <ScoresArea>
      {estimates
        .filter(({ participant: { isSpectator } }) => !isSpectator)
        .map(({ participant: { name, id } }) => (
          <ParticipantScore
            key={id}
            name={name}
            revealed
            score={
              estimates.find(({ participant }) => id === participant.id)
                ?.estimate
            }
          />
        ))}
    </ScoresArea>
  );
}

export default ParticipantsEstimates;
