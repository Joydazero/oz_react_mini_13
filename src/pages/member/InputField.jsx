import React, { useEffect, useState } from 'react'

export default function InputField({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    errorMessage = "",
    reset = false           
    })

    { 
        const [touched, setTouched] = useState(false);
        const showError = touched && required && !value;
          useEffect(() => {
            if (reset) setTouched(false);
        }, [reset]);


    return(
        <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 dark:text-gray-200">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={() => setTouched(true)}
                placeholder={placeholder}
                required={required}
                className={`dark:bg-[#2b2a2a] dark:text-[#fff] border dark:border-[#373737] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${showError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
            />
             {showError && (
                <span className="text-sm text-red-500">
                {errorMessage || `${label}을(를) 입력해주세요.`}
                </span>
            )}
        </div>
    )
}

