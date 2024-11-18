import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import InputField from './InputField';
import apiService from '../../../../../Components/ApiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LoadingPopup } from '../../../../../Components/Loading/LoadingPopup';

const EditTourForm = ({ tourId, onClose }) => {
    const [listDestination, setListDestination] = useState([]);
    const [tour, setTour] = useState({
        titleTour: '',
        companyTour: '',
        description: '',
        price: 0,
        discount: 0,
        startTime: '',
        endTime: '',
        quantityTour: 0,
        imageTour: [],
        destinationIds: [],
    });
    const [destinations, setDestinations] = useState([]);
    const [imageTourUrl, setImageTourUrl] = useState([]); // Ảnh từ server (URL)
    const [newImages, setNewImages] = useState([]); // Ảnh mới thêm
    const [isLoading, setIsloading] = useState(false);
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const data = await apiService.request('get', `business/tour/${tourId}`);
                const destinationIds = data.destiationDtoList.map((dest) => dest.desId);
                setTour({ ...data, destinationIds });
                setListDestination(
                    data.destiationDtoList.map((dest) => ({
                        id: dest.desId,
                        name: dest.desName,
                    })),
                );
                setImageTourUrl(data.imageTour);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchDestinations = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };
                const data = await apiService.request('get', 'business/destination', null, headers);
                setDestinations(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTour();
        fetchDestinations();
        // console.log('Fetch Image from server', imageTourUrl);
    }, [tourId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTour({ ...tour, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages([...newImages, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(tourId);
        const imageIds = imageTourUrl.map((image) => image.id);
        const formattedStartTime = new Date(tour.startTime).toISOString();
        const formattedEndTime = new Date(tour.endTime).toISOString();
        setIsloading(true);

        const editTourRequest = {
            tourId: tourId,
            editTitle: tour.titleTour,
            editDescription: tour.description,
            editPrice: Number.parseInt(tour.price),
            editDestination: tour.destinationIds.map((des) => Number.parseInt(des)),
            editQuantity: Number.parseInt(tour.quantityTour),
            editDiscount: Number.parseFloat(tour.discount),
            editStartTime: formattedStartTime,
            editEndTime: formattedEndTime,
            updateImageIds: imageIds,
        };

        const formData = new FormData();
        formData.append('editTourRequest', JSON.stringify(editTourRequest));

        // Gửi các tệp ảnh mới dưới dạng MultipartFile
        newImages.forEach((file) => {
            formData.append('editImages', file);
        });
        console.log(
            'Image after change',
            imageTourUrl.map((image) => image.id),
        );
        console.log('destination change and added', tour.destinationIds);
        console.log('destination change and added', editTourRequest);
        try {
            const data = await apiService.request('put', 'business/tour/edit', formData);
            swal('Thành công', data.message, 'success');
            onClose();
        } catch (error) {
            // console.error('Error updating tour:', error);
            swal('Lỗi bất định', 'Không thể lưu thay đổi', 'error');
        } finally {
            setIsloading(false);
        }
    };

    const handleRemoveImage = (imageId, isNew = false) => {
        if (isNew) {
            setNewImages(newImages.filter((img) => img !== imageId)); // Xóa ảnh mới
        } else {
            setImageTourUrl(imageTourUrl.filter((img) => img.id !== imageId)); // Xóa ảnh từ server
        }
    };

    const handleValueToursChange = (e, fieldName) => {
        const { value } = e.target;
        const selectedDestination = Number.parseInt(value); // Lấy giá trị của điểm đến đã chọn
        const isTourExist = tour.destinationIds.some((destination) => destination === selectedDestination); // Kiểm tra điểm đến đã tồn tại chưa

        // Nếu fieldName là 'destinationIds' và điểm đến chưa tồn tại
        if (fieldName === 'destinationIds' && !isTourExist) {
            setTour((prevValues) => ({
                ...prevValues,
                destinationIds: [...prevValues.destinationIds, selectedDestination], // Thêm điểm đến vào danh sách
            }));
        } else if (isTourExist) {
            swal('Cảnh báo', 'Điểm đến đã được thêm trước đó!', 'warning'); // Hiển thị cảnh báo nếu điểm đến đã tồn tại
        }
    };

    const handleAddDestination = () => {
        const selectDestination = destinations.find(
            (t) => t.id === Number.parseInt(tour.destinationIds[tour.destinationIds.length - 1]),
        );

        if (selectDestination) {
            const isTourExist = listDestination.some((destination) => destination.id === selectDestination.id);
            if (!isTourExist) {
                const newListDestination = {
                    id: selectDestination.id,
                    name: selectDestination.name,
                };
                setListDestination((prev) => [...prev, newListDestination]);
            } else {
                swal('Cảnh báo', 'Điểm đến đã được thêm trước đó!', 'warning');
            }
        }
    };

    const handleRemoveDestination = (destinationId) => {
        setListDestination((prev) => prev.filter((dest) => dest.id !== destinationId));
        setTour((prev) => ({
            ...prev,
            destinationIds: prev.destinationIds.filter((id) => id !== destinationId), // Cập nhật destinationIds
        }));
    };

    return (
        <div className="fixed inset-0 flex z-100 items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl w-full mx-auto relative max-h-[90vh] overflow-y-auto">
                <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
                    <FontAwesomeIcon icon={faX} size="lg" />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Chỉnh sửa chuyến đi</h2>
                <InputField label="Tiêu đề" name="titleTour" value={tour.titleTour} onChange={handleInputChange} />
                <div className="space-y-2">
                    <label className="block text-gray-700">Mô tả:</label>
                    <textarea
                        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="description"
                        value={tour.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700 font-semibold">Ảnh tour</label>
                    <div className="flex items-center border-2 border-dashed border-blue-400 rounded-md p-4 cursor-pointer">
                        <input
                            type="file"
                            name="imageTour"
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                            id="image-upload"
                        />
                        <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-full"
                        >
                            <FontAwesomeIcon icon={faPlus} size="2x" className="text-blue-500 mb-2" />
                            <span className="text-gray-600">Kéo thả hoặc nhấn để thêm ảnh</span>
                        </label>
                    </div>
                </div>
                {imageTourUrl.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {imageTourUrl.map((image) => (
                            <div key={image.id} className="relative border rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={image.imageUrl}
                                    alt={`Tour ${image.id}`}
                                    className="w-full h-32 object-cover rounded-t-lg"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                                    onClick={() => handleRemoveImage(image.id)} // Gọi hàm với image.id
                                >
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {/* // Hiển thị ảnh mới được thêm */}
                {newImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {newImages.map((img, index) => (
                            <div key={index} className="relative border rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`New Tour ${index}`}
                                    className="w-full h-32 object-cover rounded-t-lg"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                                    onClick={() => handleRemoveImage(img, true)} // Gọi hàm với hình ảnh mới
                                >
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <InputField label="Giá" type="number" name="price" value={tour.price} onChange={handleInputChange} />
                <InputField
                    label="Giảm giá"
                    type="number"
                    name="discount"
                    value={tour.discount}
                    onChange={handleInputChange}
                />
                <div className="flex space-x-4">
                    <InputField
                        label="Thời gian bắt đầu"
                        type="datetime-local"
                        name="startTime"
                        value={tour.startTime}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Thời gian kết thúc"
                        type="datetime-local"
                        name="endTime"
                        value={tour.endTime}
                        onChange={handleInputChange}
                    />
                </div>
                <InputField
                    label="Số lượng"
                    type="number"
                    name="quantityTour"
                    value={tour.quantityTour}
                    onChange={handleInputChange}
                />
                <div className="mb-4 col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Điểm đến:</label>
                    <div className="flex gap-2">
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => handleValueToursChange(e, 'destinationIds')}
                        >
                            <option value="">Chọn điểm đến</option>
                            {destinations.map((des) => (
                                <option key={des.id} value={des.id}>
                                    {des.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleAddDestination}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Thêm
                        </button>
                    </div>
                    {/* {listDesErrors && listDestination.length === 0 && (
                            <div className="text-red-500 text-xs mt-2">Vui lòng thêm ít nhất 1 điểm đến</div>
                        )} */}
                    <ul className="mt-4">
                        {listDestination.map((des) => (
                            <li key={des.id} className="flex items-center justify-between">
                                {des.name}
                                <button onClick={() => handleRemoveDestination(des.id)} className="text-red-500">
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300"
                >
                    Lưu
                </button>
            </div>
            <LoadingPopup isLoading={isLoading} />
        </div>
    );
};

export default EditTourForm;
