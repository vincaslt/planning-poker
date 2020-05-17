import React from 'react';

function Footer() {
  return (
    <div className="p-4 flex justify-center">
      Made by
      <a
        href="https://vincas.dev"
        className="ml-2 border-b border-dashed border-gray-700 hover:border-solid"
        rel="noopener noreferrer"
        target="_blank"
      >
        Vincas Stonys
      </a>
    </div>
  );
}

export default Footer;
