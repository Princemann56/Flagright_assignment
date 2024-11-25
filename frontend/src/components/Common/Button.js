import React from 'react';

const Button = ({ onClick, children, className, disabled }) => (
    <button onClick={onClick} className={`btn ${className}`} disabled={disabled}>
        {children}
    </button>
);

export default Button;
