import React from 'react';
import "./formInput.css"

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className='creditForm'>
      <label> {label} </label>
      {inputProps.type === "select" ? (
        <select {...inputProps} onChange={onChange}>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...inputProps} onChange={onChange} />
      )}
      <span className="error-message"> {errorMessage} </span>
    </div>
  );
};

export default FormInput;