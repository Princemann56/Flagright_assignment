import React from 'react';

const InputField = ({ id, label, type, value, onChange, placeholder }) => (
    <div className="mb-3">
        {label && (
            <label htmlFor={id} className="form-label">
                {label}
            </label>
        )}
        <input
            id={id}
            type={type}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default InputField;
