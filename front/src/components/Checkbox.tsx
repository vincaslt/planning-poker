import React from 'react';
import styled from 'styled-components';
import classNames from '../utils/classNames';
import useCounter from '../utils/useCounter';

const RealCheckbox = styled.input`
  &:focus + div,
  &:active + div {
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    border-color: #90cdf4;
  }
`;

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange'
  > {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

function Checkbox({ className, label, checked, onChange }: Props) {
  const id = useCounter('checkbox');

  return (
    <label
      htmlFor={id}
      className={classNames(className, 'custom-label flex cursor-pointer')}
    >
      <RealCheckbox
        id={id}
        type="checkbox"
        className="h-0 w-0"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        role="checkbox"
        aria-checked={checked}
        className="bg-white border border-gray-300 focus:outline-none w-6 h-6 flex justify-center items-center mr-2 rounded pointer-events-none"
      >
        <svg
          className={classNames(
            'w-full border-2 border-white rounded text-blue-400 pointer-events-none',
            !checked && 'hidden'
          )}
          viewBox="0 0 172 172"
        >
          <g
            fill="none"
            strokeWidth="none"
            strokeMiterlimit="10"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: 'normal' }}
          >
            <path d="M0 172V0h172v172z" />
            <path
              d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}
export default Checkbox;
