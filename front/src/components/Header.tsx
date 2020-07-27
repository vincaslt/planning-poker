import React from 'react';
import Icon from './Icon';
import Title from './Title';
import classNames from '../utils/classNames';
import Logo from './Logo';

interface Props {
  title?: string;
  spectators?: string[];
  basic?: boolean;
}

function Header({ title, spectators, basic = false }: Props) {
  return (
    <div
      className={classNames(
        'fixed top-0 left-0 right-0 w-full flex justify-between',
        basic ? 'p-4' : 'px-4 py-3 border-b border-gray-300'
      )}
    >
      <span className="flex items-center">
        <Logo className={classNames(!title ? 'w-12' : 'w-8 mr-4')} />
        {title && <Title>{title}</Title>}
      </span>
      {spectators && spectators.length > 0 && (
        <span
          title={
            spectators.length === 1
              ? `Spectator: ${spectators[0]}`
              : ['Spectators:', ...spectators].join('\n')
          }
          className="flex items-center text-gray-700 text-sm"
        >
          <Icon name="eye" className="mr-2" />
          {spectators.length === 1 ? spectators[0] : spectators.length}
        </span>
      )}
    </div>
  );
}

export default Header;
