import React from 'react';

interface Props {
  children: React.ReactNode;
}

function ScoresArea({ children }: Props) {
  return (
    <div className="flex flex-grow flex-col">
      <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4 max-w-6xl">
        {children}
      </div>
    </div>
  );
}

export default ScoresArea;
