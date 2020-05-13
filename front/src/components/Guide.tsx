import React from 'react';
import classNames from '../utils/classNames';
import Icon from './Icon';

interface Props {
  hasTasks?: boolean;
}

function Guide({ hasTasks }: Props) {
  return (
    <>
      <div
        className={classNames(
          'flex items-center mt-2',
          hasTasks ? 'text-gray-300' : 'text-gray-700'
        )}
      >
        <Icon name={hasTasks ? 'checkmark' : 'arrow-left'} className="mr-2" />
        <span>Add some tasks, then select one to estimate</span>
      </div>
      {hasTasks && (
        <div className="flex items-center mt-6 text-gray-700">
          <Icon name="arrow-left" className="mr-2" />
          <span>Select one to estimate</span>
        </div>
      )}
    </>
  );
}

export default Guide;
