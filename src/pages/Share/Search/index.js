import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import apiService from '../../../Components/ApiService';

const getToDay = () => {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
};
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [startDate, setStartDate] = useState(getToDay());
    const [cityId, setCityId] = useState();
    const [city, setCity] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCity = async () => {
            try {
                const data = await apiService.request('get', 'business/city');
                // console.log(data);
                setCity(data.map((city) => ({ value: city.id, label: city.full_name })));
            } catch (error) {
                console.log(error);
            }
        };
        fetchCity();
    }, []);

    const fetchSuggestions = async (query) => {
        if (query) {
            try {
                const data = await apiService.request('get', `autocomplete?input=${query}`);
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
        navigate(`/search?query=${searchValue}`);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        fetchSuggestions(value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchValue(suggestion);
        setSuggestions([]);
    };

    const handleSelectCity = async (data) => {
        // console.log('City Id', data);
        const cityIdSelect = data.value;
        setCityId(cityIdSelect);
    };
    return (
        <div className="p-4 bg-white shadow-md rounded-md relative">
            <div className="mb-4">
                <div className="flex items-center mt-2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchValue}
                        onChange={handleInputChange}
                        className="flex-grow p-2 border border-gray-300 rounded-l-md outline-none"
                    />
                    <div
                        className="p-2 bg-blue-500 text-white rounded-r-md cursor-pointer hover:bg-blue-600"
                        onClick={handleSearch}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>

                {/* Hiển thị gợi ý */}
                {suggestions.length > 0 && (
                    <ul className="absolute z-50 bg-white border border-gray-300 w-full mt-1 max-h-48 overflow-y-auto rounded-md shadow-lg">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Ngày bắt đầu</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mt-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Chọn khu vực</label>
                    <Select
                        className="w-full mt-2"
                        value={city.find((option) => option.value === cityId)}
                        onChange={handleSelectCity}
                        options={city}
                        placeholder="Select City"
                    />
                </div>
            </div>
        </div>
    );
}

export default Search;
