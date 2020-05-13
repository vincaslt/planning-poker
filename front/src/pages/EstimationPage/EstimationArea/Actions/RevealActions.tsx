import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import Connection from '../../../../state/connection';
import EstimationButton from '../../../../components/EstimationButton';
import ActionArea from '../../../../components/ActionArea';
import { ESTIMATION_VALUES } from '../../../../constants';
import EstimationSession from '../../../../state/estimationSession';

interface Props {
  estimate: number | null;
}

function RevealActions({ estimate }: Props) {
  const [editing, setEditing] = useState(false);
  const [finalEstimate, setFinalEstimate] = useState(estimate);
  const { isOwner } = EstimationSession.useContainer();
  const { finishEstimation } = Connection.useContainer();

  if (!isOwner) {
    return null;
  }

  const handleClickFinish = () => {
    finishEstimation(finalEstimate);
  };

  const handleClickChange = (value: number | null) => () => {
    setFinalEstimate(value);
  };

  return (
    <ActionArea>
      {editing ? (
        <div
          className={`grid-cols-${ESTIMATION_VALUES.length} grid grid-flow-row gap-2`}
        >
          {ESTIMATION_VALUES.map((value) => (
            <EstimationButton
              key={value || '?'}
              value={value}
              onClick={handleClickChange(value)}
              active={finalEstimate === value}
            />
          ))}
        </div>
      ) : (
        <EstimationButton active className="w-full" value={finalEstimate} />
      )}
      <div className="flex justify-center mt-2">
        <Button
          small
          type="secondary"
          title="Edit estimate"
          className="mr-2"
          onClick={() => setEditing(true)}
        >
          <Icon name="pencil" size="sm" />
        </Button>
        <Button
          small
          type="success"
          title="Finish estimation"
          onClick={handleClickFinish}
        >
          <Icon name="checkmark" size="sm" />
        </Button>
      </div>
    </ActionArea>
  );
}

export default RevealActions;
