import React from 'react';
import classNames from '../utils/classNames';

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'type'
  > {
  buttonType?: 'submit' | 'reset' | 'button';
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'custom';
  padding?: string;
  small?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      disabled,
      onClick,
      buttonType = 'button',
      type = 'primary',
      small,
      padding = small ? 'py-2 px-4' : 'py-2 px-5',
      ...rest
    }: Props,
    ref
  ) => {
    return (
      // eslint-disable-next-line react/button-has-type
      <button
        {...rest}
        ref={ref}
        type={buttonType}
        onClick={disabled ? undefined : onClick}
        className={classNames(
          className,
          padding,
          small && 'text-sm leading-none',
          type === 'danger' &&
            'bg-red-300 hover:bg-red-400 focus:bg-red-400 text-red-800 hover:text-red-900 focus:text-red-900',
          type === 'success' &&
            'bg-green-300 hover:bg-green-400 focus:bg-green-400 text-green-800 hover:text-green-900 focus:text-green-900',
          type === 'secondary' &&
            'bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 text-gray-700 hover:text-gray-800 focus:text-gray-800',
          type === 'primary' &&
            'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white hover:text-blue-100 focus:text-blue-100',
          'focus:outline-none font-semibold rounded transition-colors duration-100 ease-in'
        )}
      />
    );
  }
);

export default Button;
