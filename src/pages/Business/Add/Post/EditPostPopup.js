import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import swal from 'sweetalert';
import apiService from '../../../../Components/ApiService';

function EditPostPopup({ isOpen, closeModal, postId, handleSave, titlePost }) {
    const [title, setTitle] = useState(titlePost || '');
    const [selectedTours, setSelectedTours] = useState([]);
    const [tour, setTour] = useState([]);
    const [errors, setErrors] = useState({ title: '', tours: '' }); // Thêm state cho lỗi
    const token = localStorage.getItem('token') || null;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const fetchTourByPost = async () => {
        try {
            const data = await apiService.request('get', `business/post/getTour/${postId}`);
            setSelectedTours(data);
        } catch (error) {
            swal('Lỗi', 'Có lỗi khi lấy danh sách chuyến đi của bài đăng', 'error');
        }
    };

    const fetchTour = async () => {
        try {
            const data = await apiService.request('get', 'business/tours', null, headers);
            setTour(data);
        } catch (error) {
            swal('Lỗi', 'Có lỗi khi lấy danh sách chuyến đi', 'error');
        }
    };

    // Hàm thêm tour
    const handleTourSelect = (e) => {
        const tourId = e.target.value;
        // Kiểm tra xem tour đã tồn tại trong selectedTours
        if (!selectedTours.find((t) => t.tour_id === parseInt(tourId))) {
            const selectedTour = tour.find((t) => t.tour_id === parseInt(tourId));
            setSelectedTours([...selectedTours, { tour_id: selectedTour.tour_id, titleTour: selectedTour.titleTour }]);
        } else {
            swal('Cảnh báo', 'Chuyến đi này đã được thêm rồi', 'warning');
        }
    };

    // Hàm xoá tour khỏi danh sách bài đăng
    const handleRemoveTour = (tourId) => {
        setSelectedTours(selectedTours.filter((tour) => tour.tour_id !== tourId));
    };

    // Hàm kiểm tra lỗi
    const validateForm = () => {
        let formErrors = { title: '', tours: '' };
        let isValid = true;

        // Kiểm tra lỗi tiêu đề
        if (!title.trim()) {
            formErrors.title = 'Tiêu đề không được để trống';
            isValid = false;
        }

        // Kiểm tra lỗi chuyến đi
        if (selectedTours.length === 0) {
            formErrors.tours = 'Vui lòng chọn ít nhất một chuyến đi';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleUpdate = () => {
        if (!validateForm()) return; // Nếu có lỗi, không lưu

        const updatedPost = {
            postId,
            title,
            tours: selectedTours.map((tour) => tour.tour_id) || null,
        };
        handleSave(updatedPost);
        closeModal();
    };

    useEffect(() => {
        fetchTourByPost();
        fetchTour();
    }, []);

    return (
        <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Lớp phủ mờ nền */}
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>

            {/* Nội dung popup */}
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full relative z-10">
                <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">Chỉnh sửa bài viết</Dialog.Title>

                {/* Chỉnh sửa tiêu đề */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tiêu đề mới"
                    />
                    {/* Hiển thị lỗi nếu có */}
                    {errors.title && <p className="text-red-500 text-sm italic mt-1">{errors.title}</p>}
                </div>

                {/* Chọn thêm tour từ danh sách */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Chọn thêm tour</h3>
                    <select
                        onChange={handleTourSelect}
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn tour</option>
                        {tour?.map((tourItem) => (
                            <option key={tourItem.tour_id} value={tourItem.tour_id}>
                                {tourItem.titleTour}
                            </option>
                        ))}
                    </select>
                    {/* Hiển thị lỗi nếu có */}
                    {errors.tours && <p className="text-red-500 text-sm italic mt-1">{errors.tours}</p>}
                </div>

                {/* Hiển thị danh sách tour đã có */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Danh sách tour đã chọn</h3>
                    <div className="max-h-40 overflow-y-auto">
                        {selectedTours.map((tour) => (
                            <div key={tour.tour_id} className="flex items-center justify-between mb-2">
                                <label>{tour.titleTour}</label>
                                <button
                                    onClick={() => handleRemoveTour(tour.tour_id)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nút lưu và hủy */}
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={closeModal}
                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </Dialog>
    );
}

export default EditPostPopup;
