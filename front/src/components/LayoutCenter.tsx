import React from 'react';

interface Props {
  children: React.ReactNode;
  hasHeader?: boolean;
}

function LayoutCenter({ children, hasHeader }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-4"
      style={hasHeader ? { paddingTop: '3.5em' } : undefined}
    >
      {children}
    </div>
  );
}

export default LayoutCenter;
