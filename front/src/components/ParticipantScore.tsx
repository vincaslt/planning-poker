import React from 'react';
import classNames from '../utils/classNames';

interface Props {
  name: string;
  ready?: boolean;
  revealed?: boolean;
  score?: number | null;
}

function ParticipantScore({
  name,
  score,
  ready = false,
  revealed = false,
}: Props) {
  const unrevealedClasses = ready
    ? 'border-blue-300 text-blue-500'
    : 'border-gray-300 text-gray-500';

  return (
    <div
      className={classNames(
        'p-4 text-center border rounded font-semibold transition-colors duration-100',
        revealed
          ? 'bg-blue-100 border-blue-300 text-blue-700'
          : unrevealedClasses
      )}
    >
      <h3 className="text-lg">{name}</h3>
      <div className="text-5xl p-8">{score ?? '?'}</div>
    </div>
  );
}

export default ParticipantScore;
