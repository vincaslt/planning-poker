import React from 'react';

interface Props {
  children: React.ReactNode;
}

function ActionArea({ children }: Props) {
  return (
    <div className="sticky bottom-0 flex">
      <div className="shadow-md mb-4 border border-gray-300 bg-gray-100 p-4 rounded m-auto">
        {children}
      </div>
    </div>
  );
}

export default ActionArea;
