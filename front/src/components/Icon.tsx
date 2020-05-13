import React from 'react';
import classNames from '../utils/classNames';

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  name: string;
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  className?: string;
}

function Icon({ name, size = 'base', className, ...rest }: Props) {
  return (
    <span
      aria-label={name}
      {...rest}
      className={classNames(`text-${size}`, `icon-${name}`, className)}
    />
  );
}

export default Icon;
