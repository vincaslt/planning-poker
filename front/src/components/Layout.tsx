import React from 'react';
import classNames from '../utils/classNames';

interface Props {
  hasHeader?: boolean;
  container?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Layout({ hasHeader, container, className, children }: Props) {
  return (
    <div
      style={hasHeader ? { paddingTop: '3.5em' } : undefined}
      className={classNames(
        'bg-primary h-screen w-full',
        container && 'container m-auto pt-8 px-4',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Layout;
