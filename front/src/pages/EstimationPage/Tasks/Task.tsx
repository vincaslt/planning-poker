import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import classNames from '../../../utils/classNames';
import Icon from '../../../components/Icon';
import Button from '../../../components/Button';

const TaskContainer = styled.div`
  & > button {
    visibility: hidden;
  }
  & > span:last-child {
    display: flex;
  }

  &:focus-within > button,
  &:hover > button {
    visibility: visible;
  }

  &:focus-within > span:last-child,
  &:hover > span:last-child {
    display: none;
  }
`;

interface Props {
  name?: string;
  editable?: boolean;
  status?: 'active' | 'selected';
  estimate?: number | null;
  onClick?: () => void;
  onChange?: (value: string) => void;
}

function Task({
  status,
  name = '',
  editable = true,
  estimate,
  onClick,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(name);
  const [editing, setEditing] = useState(!name);

  useEffect(() => {
    if (editing) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [editing]);

  useEffect(() => {
    setInputValue(name);
  }, [name, editing]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editing) {
      (e.target as HTMLDivElement).blur();
      onClick?.();
    }
  };

  return (
    <TaskContainer
      role="button"
      tabIndex={0}
      onClick={handleClick}
      className={classNames(
        'focus:outline-none p-2 rounded font-semibold w-full text-left transition-colors duration-100 ease-in flex justify-between mb-1',
        status === 'active' && 'bg-blue-200 text-blue-800',
        status === 'selected' && 'bg-gray-300 text-gray-900',
        !status && 'text-gray-700 hover:bg-gray-100 focus-within:bg-gray-100'
      )}
    >
      {editing ? (
        <>
          <input
            placeholder="Task Name"
            ref={inputRef}
            onKeyPress={(e) => e.key === 'Enter' && inputRef.current?.blur()}
            onBlur={() => {
              onChange?.(inputValue);
              setEditing(false);
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="w-full bg-transparent"
          />
        </>
      ) : (
        <span className="truncate">{name}</span>
      )}

      {estimate !== undefined ? (
        <div
          className={classNames(
            'flex items-center justify-center px-2 ml-2 text-sm rounded transition-colors duration-100 ease-in',
            status === 'selected'
              ? 'bg-gray-300 text-gray-900'
              : 'bg-gray-100 text-gray-700'
          )}
        >
          {estimate || '?'}
        </div>
      ) : (
        <>
          {editable && (
            <Button
              small
              type={status === 'selected' ? 'secondary' : 'custom'}
              className={classNames(
                'ml-2 bg-transparent',
                status === 'active'
                  ? 'hover:bg-blue-300 focus:bg-blue-300 hover:text-blue-900 focus:text-blue-900'
                  : 'hover:bg-gray-200 focus:bg-gray-200 hover:text-gray-800 focus:text-gray-800'
              )}
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
              padding="p-1"
            >
              <Icon name="pencil" />
            </Button>
          )}
          {status === 'active' && (
            <span className="items-center text-xs text-blue-800">
              Estimating
            </span>
          )}
        </>
      )}
    </TaskContainer>
  );
}

export default Task;
