import React from "react";

const InputField = ({ type, label, name, value, onChange, onBlur, error }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputField;
