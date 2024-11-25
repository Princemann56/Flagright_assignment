import React from 'react';
import InputField from '../Common/InputField';
import Button from '../Common/Button';

const AuthForm = ({ handleSubmit, fields, buttonText }) => (
    <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center text-primary mb-4">{buttonText}</h2>
        {fields.map((field, index) => (
            field.type === 'select' ? (
                <div key={index} className="mb-3">
                    <label htmlFor={field.id} className="form-label">{field.label}</label>
                    <select
                        id={field.id}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="form-select"
                    >
                        <option value="" disabled style={{ color: '#6c757d' }}>Select Your Role</option> 
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <InputField
                    key={index}
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={field.placeholder}
                />
            )
        ))}
        <Button className="btn btn-primary w-100 mb-3" onClick={handleSubmit}>
            {buttonText}
        </Button>
    </div>
);

export default AuthForm;
