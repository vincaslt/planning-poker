import React from 'react';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import Connection from '../../../../state/connection';
import EstimationButton from '../../../../components/EstimationButton';
import ActionArea from '../../../../components/ActionArea';
import { ESTIMATION_VALUES } from '../../../../constants';
import EstimationSession from '../../../../state/estimationSession';

interface Props {
  selected?: number | null;
  onSelect: (value: number | null) => void;
}

function EstimationActions({ onSelect, selected }: Props) {
  const { isOwner } = EstimationSession.useContainer();
  const { revealEstimates, cancelEstimation } = Connection.useContainer();

  const handleClick = (value: number | null) => () => {
    onSelect(value);
  };

  return (
    <ActionArea>
      <div className="grid-cols-7 grid grid-flow-row gap-2">
        {ESTIMATION_VALUES.map((value) => (
          <EstimationButton
            key={value || '?'}
            value={value}
            onClick={handleClick(value)}
            active={selected === value}
          />
        ))}
      </div>
      {isOwner && (
        <div className="flex justify-center mt-2">
          <Button
            small
            type="danger"
            title="Cancel estimation"
            className="mr-2"
            onClick={cancelEstimation}
          >
            <Icon name="cross" size="sm" />
          </Button>
          <Button
            small
            type="success"
            title="Reveal estimates"
            onClick={revealEstimates}
          >
            <Icon name="loop2" size="sm" />
          </Button>
        </div>
      )}
    </ActionArea>
  );
}

export default EstimationActions;
