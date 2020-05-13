import React from 'react';

interface Props {
  children: React.ReactNode;
}

function Sidebar({ children }: Props) {
  return (
    <div className="border-r border-gray-300 p-4 overflow-auto w-full max-w-xs xl:max-w-sm">
      {children}
    </div>
  );
}

export default Sidebar;
