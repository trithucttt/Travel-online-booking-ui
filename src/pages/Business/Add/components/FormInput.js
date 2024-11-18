function FormInput({ label, type = 'text', value, onChange, placeholder, error }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
            <input
                type={type}
                value={value}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
    );
}

export default FormInput;
