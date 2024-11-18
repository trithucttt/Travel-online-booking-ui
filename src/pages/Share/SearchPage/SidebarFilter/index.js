import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import apiService from '../../../../Components/ApiService';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';

const priceOptions = [
    { value: '0-500000', label: 'Dưới 500,000 VND' },
    { value: '500000-1000000', label: '500,000 - 1,000,000 VND' },
    { value: '1000000-5000000', label: '1,000,000 - 5,000,000 VND' },
    { value: '5000000 - 99999999', label: 'Trên 5,000,000 VND' },
];

const discountOptions = [
    { value: '0-10', label: '0% - 10%' },
    { value: '10-20', label: '10% - 20%' },
    { value: '20-50', label: '20% - 50%' },
    { value: '50 - 90', label: '50% hoặc hơn' },
];

const quantityOptions = [
    { value: '1-10', label: '1 - 10' },
    { value: '10-20', label: '10 - 20' },
    { value: '20-50', label: '20 - 50' },
    { value: '50- 1000', label: '50 hoặc hơn' },
];

const getToDay = () => {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16);
};

const SidebarFilter = ({ onCreatePost, onSearchAndPagination }) => {
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(null);
    const [rating, setRating] = useState([0, 5]);
    const [cityId, setCityId] = useState();
    const [city, setCity] = useState([]);
    const [startDate, setStartDate] = useState(getToDay());
    const [searchPost, setSearchPost] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchWithFilter, setSearchWithFilter] = useState(false);
    // Fetch danh sách thành phố
    const fetchCity = async () => {
        try {
            const data = await apiService.request('get', 'business/city');
            setCity(data.map((city) => ({ value: city.id, label: city.full_name })));
        } catch (error) {
            console.log('Lỗi khi lấy thành phố:', error);
        }
    };

    useEffect(() => {
        fetchCity();
    }, []);

    // Hàm apply bộ lọc
    const handleApplyFilters = useCallback(() => {
        const filters = {
            title: searchPost,
            price: selectedPrice && selectedPrice.value,
            discount: selectedDiscount && selectedDiscount.value,
            quantity: selectedQuantity && selectedQuantity.value,
            rating,
            city: cityId,
            startDate,
        };
        // onApplyFilters(filters);
        onSearchAndPagination(filters);
        setSearchWithFilter(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPrice, selectedDiscount, selectedQuantity, cityId, startDate]);

    // Tìm kiếm tự động - sử dụng debounce để tối ưu hiệu suất
    const fetchSuggestions = useCallback(
        debounce(async (query) => {
            if (query) {
                try {
                    const data = await apiService.request('get', `autocomplete?input=${query}`);
                    setSuggestions(data);
                } catch (error) {
                    console.error('Lỗi khi tìm kiếm tự động:', error);
                }
            } else {
                setSuggestions([]);
            }
        }, 500), // debounce 500ms
        [],
    );

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchPost(value);
        fetchSuggestions(value);
    };

    // const handleSearchPost = () => {
    //     manualSearch(searchPost);
    // };

    const handleSuggestionClick = (suggestion) => {
        setSearchPost(suggestion);
        setSuggestions([]);
        // if (searchWithFilter === false) {
        //     handleSearchPost(suggestion);
        // }
    };

    return (
        <div className="w-64 p-4 bg-gray-100 border-r border-gray-300 rounded-lg shadow-lg">
            <button
                className="w-full mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={onCreatePost}
            >
                Tạo bài viết mới
            </button>

            <h2 className="text-lg font-semibold mb-4">Lọc</h2>

            {/* Tìm kiếm */}
            <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2">Tìm kiếm thủ công</label>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchPost}
                    onChange={handleSearchInputChange}
                    className="p-2 border border-gray-400 rounded w-full"
                />
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

            {/* Lọc theo ngày bắt đầu */}
            <div className="mb-4">
                <label className="block text-gray-700">Ngày bắt đầu</label>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mt-2"
                />
            </div>

            {/* Lọc theo Khu vực */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Khu vực</label>
                <Select
                    value={city.find((option) => option.value === cityId)}
                    onChange={(e) => setCityId(e.value)}
                    options={city}
                    placeholder="Chọn khu vực"
                />
            </div>

            {/* Lọc theo Giá */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Giá chuyến đi</label>
                <Select
                    options={priceOptions}
                    value={selectedPrice}
                    onChange={(option) => setSelectedPrice(option)}
                    placeholder="Chọn khoảng giá"
                />
            </div>

            {/* Lọc theo Mức giảm giá */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Giảm giá</label>
                <Select
                    options={discountOptions}
                    value={selectedDiscount}
                    onChange={(option) => setSelectedDiscount(option)}
                    placeholder="Chọn mức giảm giá"
                />
            </div>

            {/* Lọc theo Số lượng */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Số lượng chuyến đi</label>
                <Select
                    options={quantityOptions}
                    value={selectedQuantity}
                    onChange={(option) => setSelectedQuantity(option)}
                    placeholder="Chọn số lượng"
                />
            </div>

            {/* Lọc theo Đánh giá */}
            {/* <div className="mb-4">
                <label className="block text-gray-700 mb-2">Đánh giá</label>
                <Slider
                    range
                    min={0}
                    max={5}
                    step={0.5}
                    value={rating}
                    onChange={(value) => setRating(value)}
                    marks={{
                        0: '0',
                        1: '1',
                        2: '2',
                        3: '3',
                        4: '4',
                        5: '5',
                    }}
                    trackStyle={[{ backgroundColor: '#4CAF50' }]}
                />
            </div> */}

            {/* Áp dụng bộ lọc */}
            <button
                onClick={handleApplyFilters}
                className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
            >
                Áp dụng bộ lọc
            </button>
        </div>
    );
};

export default SidebarFilter;
