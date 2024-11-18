import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import apiService from '../../../../Components/ApiService';
import swal from 'sweetalert';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
import validateTour from './vadilationTour';
import { VND } from '../../../../helper';
function Add() {
    const getToDay = () => {
        const today = new Date();
        const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, 16);
    };
    const [listDestination, setListDestination] = useState([]);
    const [destination, setDestination] = useState([]);
    const [errors, setErrors] = useState({});
    const [listDesErrors, setLisDesError] = useState(false);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newTour, setNewTour] = useState({
        images: [],
        title: '',
        description: '',
        price: 100000,
        discount: 0,
        startTime: getToDay(),
        endTime: getToDay(),
        quantity: 1,
        destinationIds: [],
    });

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const data = await apiService.request('get', 'business/destination', null, headers);
                setDestination(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDestination();
    }, []);

    const handleValueToursChange = (e, fieldName) => {
        const { value } = e.target;

        if (fieldName === 'destinationIds') {
            setNewTour((prevValues) => ({
                ...prevValues,
                destinationIds: [...prevValues.destinationIds, value],
            }));
        } else {
            setNewTour((prevValues) => ({
                ...prevValues,
                [fieldName]: value,
            }));
        }
    };

    const handleAddDestination = () => {
        const selectDestination = destination.find(
            (t) => t.id === Number.parseInt(newTour.destinationIds[newTour.destinationIds.length - 1]),
        );

        if (selectDestination) {
            const isTourExist = listDestination.some((destination) => destination.id === selectDestination.id);
            if (!isTourExist) {
                const newListDestination = {
                    id: selectDestination.id,
                    name: selectDestination.name,
                };
                setListDestination((pre) => [...pre, newListDestination]);
            } else {
                alert('Destination already exists');
            }
        }
    };

    const handleRemoveDestination = (destinationId) => {
        setListDestination((pre) => pre.filter((dest) => dest.id !== destinationId));
    };

    const handleSaveTour = async () => {
        const managerId = localStorage.getItem('userId') || '';
        setLisDesError(true);

        const formData = new FormData();
        const { images, ...tourWithoutImage } = newTour;

        const addTourRequest = {
            ...tourWithoutImage,
            managerId: managerId,
            destinationIds: Array.isArray(newTour.destinationIds)
                ? newTour.destinationIds.map((id) => Number(id))
                : [Number(newTour.destinationIds)],
        };
        formData.append('addTourRequest', JSON.stringify(addTourRequest));
        images.forEach((image) => formData.append('images', image));

        const validateTourData = {
            ...tourWithoutImage,
            managerId: managerId,
            images: images,
            destinationIds: Array.isArray(newTour.destinationIds)
                ? newTour.destinationIds.map((id) => Number(id))
                : [Number(newTour.destinationIds)],
        };
        const validationErrors = validateTour(validateTourData);
        if (validationErrors.length === 0) {
            try {
                setIsLoading(true);
                const data = await apiService.request('post', 'business/tour/save', formData);
                if (data.responseCode === '200') {
                    swal('OK!', 'Thêm mới chuyến đi thành công', 'success');
                    setNewTour({
                        title: '',
                        description: '',
                        price: '',
                        discount: '',
                        startTime: '',
                        endTime: '',
                        quantity: '',
                        destinationIds: [],
                        images: [],
                    });
                    setImagePreviewUrls([]);
                    setListDestination([]);
                } else {
                    swal('Error!', 'Thêm chuyến đi thất bại vui lòng kiểm tra thông tin lại', 'error');
                }
            } catch (error) {
                swal('Lỗi!', 'Lỗi xử lý từ máy chủ', 'error');
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(validationErrors);
        }
    };
    // Image change handler
    const handleChangeImages = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setNewTour((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...selectedFiles],
        }));

        const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setImagePreviewUrls((prevUrls) => [...prevUrls, ...imagePreviews]);
    };

    // Remove an image
    const handleRemoveImage = (index) => {
        const updatedImages = [...newTour.images];
        updatedImages.splice(index, 1);
        setNewTour((prevState) => ({
            ...prevState,
            images: updatedImages,
        }));

        const updatedImagePreviews = [...imagePreviewUrls];
        updatedImagePreviews.splice(index, 1);
        setImagePreviewUrls(updatedImagePreviews);
    };
    return (
        <div className="p-8 max-w-5xl mx-auto bg-slate-400 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-6">
                <div className="mb-4 col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Tiêu đề:</label>
                    <input
                        type="text"
                        value={newTour.title}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter title"
                        onChange={(e) => handleValueToursChange(e, 'title')}
                    />
                    {errors.title && <div className="text-red-300 italic text-lg mt-2 font-bold">{errors.title}</div>}
                </div>

                <div className="mb-4 col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả:</label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newTour.description}
                        placeholder="Enter description"
                        onChange={(e) => handleValueToursChange(e, 'description')}
                    />
                    {errors.description && (
                        <div className="text-red-300 italic text-lg mt-2 font-bold">{errors.description}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Giá:</label>
                    <div className="relative">
                        <input
                            type="number"
                            min={100000}
                            step={1000}
                            value={newTour.price}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-16"
                            placeholder="Enter price"
                            onChange={(e) => handleValueToursChange(e, 'price')}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700">VNĐ</span>
                    </div>
                    {errors.price && <div className="text-red-300 italic text-lg mt-2 font-bold">{errors.price}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Chiếc khấu:</label>
                    <input
                        type="number"
                        min={0}
                        step={0.1}
                        max={100}
                        value={newTour.discount}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter discount"
                        onChange={(e) => handleValueToursChange(e, 'discount')}
                    />
                    {errors.discount && (
                        <div className="text-red-300 italic text-lg mt-2 font-bold">{errors.discount}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Thời gian khởi hành:</label>
                    <input
                        type="datetime-local"
                        value={newTour.startTime}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => handleValueToursChange(e, 'startTime')}
                    />
                    {errors.startTime && (
                        <div className="text-red-300 italic text-lg mt-2 font-bold">{errors.startTime}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Thời gian kết thúc:</label>
                    <input
                        type="datetime-local"
                        value={newTour.endTime}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => handleValueToursChange(e, 'endTime')}
                    />
                    {errors.endTime && (
                        <div className="text-red-300 italic text-lg mt-2 font-bold">{errors.endTime}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Số lượng:</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={newTour.quantity}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter quantity"
                        onChange={(e) => handleValueToursChange(e, 'quantity')}
                    />
                    {errors.quantity && (
                        <div className="text-red-300 italic text-lg mt-2 font-bold">{errors.quantity}</div>
                    )}
                </div>

                <div className="mb-4 col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Điểm đến:</label>
                    <div className="flex gap-2">
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => handleValueToursChange(e, 'destinationIds')}
                        >
                            <option value="">Chọn điểm đến</option>
                            {destination.map((des) => (
                                <option key={des.id} value={des.id}>
                                    {des.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleAddDestination}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add
                        </button>
                    </div>
                    {listDesErrors && listDestination.length === 0 && (
                        <div className="text-red-300 italic text-lg mt-2 font-bold">
                            Vui lòng thêm ít nhất 1 điểm đến
                        </div>
                    )}
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

                <div className="mb-4 col-span-2">
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold">Ảnh cho chuyến đi</label>
                        <div className="flex items-center border-2 border-dashed border-blue-400 rounded-md p-4 cursor-pointer">
                            <input
                                type="file"
                                name="imageTour"
                                onChange={handleChangeImages}
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

                    {/* Image preview section */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {imagePreviewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                                <img src={url} alt="Preview" className="w-80 h-60 rounded-md shadow-md" />

                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-30"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={handleSaveTour}
                    disabled={isLoading}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Lưu
                </button>

                {/* Hiển thị popup loading khi đang tải */}
                <LoadingPopup isLoading={isLoading} />
            </div>
        </div>
    );
}

export default Add;
