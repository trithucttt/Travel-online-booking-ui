import React, { useState } from 'react';

const DestinationSelect = ({ destinations, selectedDestinations, onChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        onChange((prevState) => ({
            ...prevState,
            destinationIds: selectedOptions,
        }));
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleAddDestination = () => {
        // Add logic for adding a new destination here
        alert('Add new destination functionality.');
    };

    return (
        <div className="space-y-2">
            <label className="block text-gray-700">Destinations</label>
            <button
                type="button"
                className="bg-gray-200 px-4 py-2 rounded-md text-sm text-black hover:bg-gray-300"
                onClick={toggleDropdown}
            >
                Select Destinations
            </button>
            {isDropdownOpen && (
                <select
                    multiple
                    value={selectedDestinations}
                    onChange={handleSelectChange}
                    className="w-full border p-2 rounded-md mt-2"
                >
                    {destinations.map((destination) => (
                        <option key={destination.id} value={destination.id}>
                            {destination.name}
                        </option>
                    ))}
                </select>
            )}

            <button
                type="button"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddDestination}
            >
                Add Destination
            </button>
        </div>
    );
};

export default DestinationSelect;
