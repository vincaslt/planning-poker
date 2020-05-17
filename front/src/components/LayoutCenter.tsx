import React from 'react';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
  hasHeader?: boolean;
}

function LayoutCenter({ children, hasHeader }: Props) {
  return (
    <div
      className="flex flex-col h-screen"
      style={hasHeader ? { paddingTop: '3.5em' } : undefined}
    >
      <div className="flex flex-col flex-grow items-center justify-center p-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default LayoutCenter;
