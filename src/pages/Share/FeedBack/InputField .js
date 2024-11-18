// components/InputField.js
import React from 'react';

const InputField = ({ label, id, name, type = 'text', value, onChange, placeholder, required = false }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={placeholder}
                    rows="4"
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={placeholder}
                    required={required}
                />
            )}
        </div>
    );
};

export default InputField;
