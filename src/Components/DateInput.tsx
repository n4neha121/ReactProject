import { FC, ChangeEvent } from "react";
import "../Css/All.css";

interface DateInputProps {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean; // ✅ Corrected type
    className?: string;
}

const DateInput: FC<DateInputProps> = ({
    value,
    onChange,
    required = false,
    disabled = false,
    readOnly = false,
    className = "",
}) => {
    return (
        <div className={`input-wrapper ${className}`}>
            <input
                type="date"
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                className="custom-input"
                autoComplete="off"
            />
        </div>
    );
};

export default DateInput;
