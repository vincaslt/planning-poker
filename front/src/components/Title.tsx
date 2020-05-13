import React from 'react';
import classNames from '../utils/classNames';

function Title({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  return (
    <h1
      {...rest}
      className={classNames(className, 'text-2xl leading-none font-semibold')}
    >
      {children}
    </h1>
  );
}

export default Title;
