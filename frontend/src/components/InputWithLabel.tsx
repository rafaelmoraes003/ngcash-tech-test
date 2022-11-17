import React from 'react';
import PropTypes from 'prop-types';

interface InputWithLabelProps {
  id: string,
  type: string,
  labelText: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
}

function InputWithLabel({
  id, type, labelText, setState,
}: InputWithLabelProps) {
  return (
    <label htmlFor={id}>
      {labelText}
      <input
        id={id}
        type={type}
        onChange={(e) => setState(e.target.value)}
      />
    </label>
  );
}

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

export default InputWithLabel;
