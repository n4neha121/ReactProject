import React, { FC, ChangeEvent } from "react";

interface InputProps {
    type?: string;  // Input type (text, email, password, etc.)
    placeholder?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string; // For custom styling
}

const Input: FC<InputProps> = ({
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    disabled = false,
    className = "",
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={className} 
        />
    );
};

export default Input;
