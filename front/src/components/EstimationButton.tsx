import React from 'react';
import classNames from '../utils/classNames';

interface Props {
  value: number | null;
  active: boolean;
  onClick?: (value: number | null) => void;
  className?: string;
}

function EstimationButton({ value, active, onClick, className }: Props) {
  return (
    <button
      type="button"
      className={classNames(
        'relative p-8 border rounded text-4xl font-semibold transition-colors duration-100 focus:outline-none',
        active
          ? 'bg-blue-200 border-blue-400 text-blue-800'
          : 'bg-white border-gray-400 text-gray-600 hover:border-blue-400 focus:border-blue-400',
        !active && onClick
          ? 'hover:shadow focus:shadow cursor-pointer'
          : 'cursor-default',
        className
      )}
      onClick={() => !active && onClick?.(value)}
    >
      {value ?? '?'}
    </button>
  );
}

export default EstimationButton;
