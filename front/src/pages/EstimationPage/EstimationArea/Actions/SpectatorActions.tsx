import React from 'react';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import Connection from '../../../../state/connection';
import ActionArea from '../../../../components/ActionArea';
import EstimationSession from '../../../../state/estimationSession';

function SpectatorActions() {
  const { isOwner } = EstimationSession.useContainer();
  const { revealEstimates, cancelEstimation } = Connection.useContainer();

  if (!isOwner) {
    return null;
  }

  return (
    <ActionArea>
      <div className="flex justify-center">
        <Button
          small
          type="danger"
          title="Cancel estimation"
          className="mr-2"
          onClick={cancelEstimation}
        >
          <Icon name="cross" size="sm" />
        </Button>
        <Button small type="success" onClick={revealEstimates}>
          <Icon name="loop2" size="sm" />
        </Button>
      </div>
    </ActionArea>
  );
}

export default SpectatorActions;
