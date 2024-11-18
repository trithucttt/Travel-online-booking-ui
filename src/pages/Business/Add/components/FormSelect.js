function FormSelect({ label, options, value, onChange, error }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
            <select className="border rounded w-full py-2 px-3 text-gray-700" value={value} onChange={onChange}>
                <option value="">Select {label}</option>
                {options.map((item, index) => (
                    <option key={index} value={item.desId}>
                        {item.desName}
                    </option>
                ))}
            </select>
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
    );
}

export default FormSelect;
