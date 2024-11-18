import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import InputField from '../../../Business/Add/Tour/EditTour/InputField';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
import apiService from '../../../../Components/ApiService';

const EditPostForRoleUser = ({ postId, onClose }) => {
    const [post, setPost] = useState({});

    const [imagePostUrl, setImagePostUrl] = useState([]); // Ảnh từ server (URL)
    const [newImages, setNewImages] = useState([]); // Ảnh mới thêm
    const [isLoading, setIsloading] = useState(false);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await apiService.request('get', `post/detail/${postId}`);
                setImagePostUrl(data.imagePostEdit);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();
        // console.log('Fetch Image from server', imagePostUrl);
    }, [postId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages([...newImages, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(tourId);
        const imageIds = imagePostUrl.map((image) => image.id);
        setIsloading(true);

        const editPostRequest = {};

        const formData = new FormData();
        formData.append('editPostRequest', JSON.stringify(editPostRequest));

        // Gửi các tệp ảnh mới dưới dạng MultipartFile
        newImages.forEach((file) => {
            formData.append('editImages', file);
        });
        console.log(
            'Image after change',
            imagePostUrl.map((image) => image.id),
        );
        console.log('destination change and added', editPostRequest);
        try {
            // const data = await apiService.request('put', 'business/tour/edit', formData);
            // swal('Thành công', data.message, 'success');
            onClose();
        } catch (error) {
            swal('Lỗi bất định', 'Không thể lưu thay đổi', 'error');
        } finally {
            setIsloading(false);
        }
    };

    const handleRemoveImage = (imageId, isNew = false) => {
        if (isNew) {
            setNewImages(newImages.filter((img) => img !== imageId));
        } else {
            setImagePostUrl(imagePostUrl.filter((img) => img.id !== imageId));
        }
    };

    return (
        <div className="fixed inset-0 flex z-40 items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl w-full mx-auto relative max-h-[90vh] overflow-y-auto">
                <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
                    <FontAwesomeIcon icon={faX} size="lg" />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Chỉnh sửa chuyến đi</h2>
                <InputField label="Tiêu đề" name="titleTour" value={post.title} onChange={handleInputChange} />

                <div className="space-y-2">
                    <label className="block text-gray-700 font-semibold">Ảnh bài đăng</label>
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
                {imagePostUrl.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {imagePostUrl.map((image) => (
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

export default EditPostForRoleUser;
