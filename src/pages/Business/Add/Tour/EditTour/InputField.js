import React from 'react';

const InputField = ({ label, name, type = 'text', value, onChange }) => {
    return (
        <div className="space-y-2">
            <label className="block text-gray-700">{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} className="w-full border p-2 rounded-md" />
        </div>
    );
};

export default InputField;
