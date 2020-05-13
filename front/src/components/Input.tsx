import React from 'react';
import classNames from '../utils/classNames';

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange'
  > {
  onChange: (value: string) => void;
}

function Input({ className, onChange, ...rest }: Props) {
  return (
    <input
      type="text"
      onChange={(e) => onChange(e.target.value)}
      {...rest}
      className={classNames(
        className,
        'bg-white border border-gray-300 focus:border-blue-300 focus:outline-none focus:shadow-focus rounded py-2 px-4 block w-full'
      )}
    />
  );
}
export default Input;
