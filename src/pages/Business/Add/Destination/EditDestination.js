import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import swal from 'sweetalert';
import apiService from '../../../../Components/ApiService';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
function EditDestination({ destination, onClose }) {
    const [formData, setFormData] = useState({
        desName: destination.desName,
        desAddress: destination.desAddress,
        description: destination.description,
        wardId: destination?.wardId || null,
    });

    const [image, setImage] = useState(destination.imageUrl || '');
    const [newImage, setNewImage] = useState(null);
    const [cityId, setCityId] = useState(destination?.cityId);
    const [districtId, setDistrictId] = useState(destination?.districtId);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchCityOptions = async () => {
            try {
                const data = await apiService.request('get', 'business/city');
                setCity(data.map((city) => ({ value: city.id, label: city.full_name })));
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCityOptions();
        if (cityId && districtId) {
            fetchDistrictOptions(cityId);
            fetchWardOptions(districtId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchDistrictOptions = async (id) => {
        try {
            const res = await apiService.request(
                'get',
                'business/district',
                null,
                {},
                {
                    id: id,
                },
            );
            setDistrict(res.map((district) => ({ value: district.id, label: district.full_name })));
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const fetchWardOptions = async (id) => {
        try {
            const res = await apiService.request(
                'get',
                'business/ward',
                null,
                {},
                {
                    id: id || '',
                },
            );
            setWardOptions(res.map((ward) => ({ value: ward.id, label: ward.full_name })));
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleSelectCity = async (data) => {
        // console.log('City Id', data);
        const cityIdSelect = data.value;
        setCityId(cityIdSelect);
        fetchDistrictOptions(cityIdSelect);
    };

    const handleSelectDistrict = async (data) => {
        // console.log('District Id', data);
        const districtIdSelect = data.value;
        setDistrictId(districtIdSelect);
        fetchWardOptions(districtIdSelect);
    };

    const handleSelectWard = (data) => {
        // console.log(data);
        const wardIdSelect = data.value;
        setFormData((pre) => ({
            ...pre,
            wardId: wardIdSelect,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        // console.log('Chỉnh sửa thành công:', formData, newImage);
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const updateDesInfo = {
                destinationId: destination?.desId,
                destinationName: formData.desName,
                address: formData.desAddress,
                wardId: formData.wardId,
                description: formData.description,
            };
            const request = new FormData();
            request.append('updateDestination', JSON.stringify(updateDesInfo));
            request.append('image', newImage);
            const data = await apiService.request('post', 'business/destination/edit', request, headers);
            if (data.responseCode === '201') {
                swal('Thành công', data.message, 'success');
            } else {
                swal('Lỗi', data.message, 'error');
            }
        } catch (error) {
            swal('Lỗi', 'Có lỗi xảy ra khi cập nhật điểm đến' + error, 'error');
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-gray-800 p-8 rounded-lg w-2/3">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-200">Chỉnh sửa Điểm Đến</h2>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-500 text-2xl" />
                    </button>
                </div>
                <div>
                    {/* Tên Điểm Đến */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Tên Điểm Đến</label>
                        <input
                            type="text"
                            name="desName"
                            value={formData.desName}
                            onChange={(e) => setFormData({ ...formData, desName: e.target.value })}
                            className="w-full p-3 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Địa Chỉ */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Địa Chỉ</label>
                        <input
                            type="text"
                            name="desAddress"
                            value={formData.desAddress}
                            onChange={(e) => setFormData({ ...formData, desAddress: e.target.value })}
                            className="w-full p-3 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Mô tả</label>
                        <textarea
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 rounded-md bg-gray-700 text-gray-200 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Chọn City */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Thành Phố</label>
                        <Select
                            options={city}
                            value={city.find((option) => option.value === cityId)}
                            onChange={handleSelectCity}
                            className="text-gray-700"
                            placeholder="Chọn thành phố..."
                        />
                    </div>
                    {/* Chọn District */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Quận/Huyện</label>
                        <Select
                            options={district}
                            value={district?.find((option) => option.value === districtId)}
                            onChange={handleSelectDistrict}
                            className="text-gray-700"
                            placeholder="Chọn quận/huyện..."
                            isDisabled={!cityId}
                        />
                    </div>
                    {/* Chọn Ward */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Phường/Xã</label>
                        <Select
                            options={wardOptions}
                            value={wardOptions?.find((option) => option.value === formData.wardId)}
                            onChange={handleSelectWard}
                            className="text-gray-700"
                            placeholder="Chọn phường/xã..."
                            isDisabled={!districtId}
                        />
                    </div>
                    {/* Ảnh */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Ảnh</label>
                        <div className="flex items-center">
                            {image && (
                                <img src={image} alt="Destination" className="w-32 h-32 object-cover mr-4 rounded-md" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
            <LoadingPopup isLoading={loading} />
        </div>
    );
}

export default EditDestination;
