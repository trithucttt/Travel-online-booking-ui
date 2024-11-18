import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import apiService from '../../../../Components/ApiService';
import swal from 'sweetalert';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';

const CreatePostUser = ({ onClose }) => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const userId = localStorage.getItem('userId') || null;
    const handleChangeImages = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setImagePreviewUrls((prevUrls) => [...prevUrls, ...imagePreviews]);
        setImages(selectedFiles);
    };

    const handleRemoveImage = (index) => {
        setImagePreviewUrls((prevImages) => prevImages.filter((_, i) => i !== index));
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        // Thực hiện logic để gửi bài viết lên backend ở đây
        console.log({ content, images, userId });
        const formData = new FormData();
        setIsLoading(true);
        try {
            const createPostNonSale = {
                content: content,
                userId: userId,
            };
            formData.append('data', JSON.stringify(createPostNonSale));
            if (images) {
                images.forEach((image) => formData.append('images', image));
            }

            const data = await apiService.request('post', 'user/new/post', formData);
            if (data.responseCode === '200') {
                swal('Thành công', data.message, 'success');
            } else {
                swal('Cảnh  báo', data.message, 'warning');
            }
        } catch (error) {
            swal('Lỗi', 'Có lỗi xảy ra' + error, 'error');
        } finally {
            setIsLoading(false);
            onClose(); // Đóng popup sau khi hoàn tất
        }
    };

    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-lg space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Thêm bài viết mới</h2>

                {/* Content Input */}
                <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                    placeholder="Viết nội dung bài viết..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

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
                    <div className="grid grid-cols-3 gap-4 mt-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
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

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Đăng bài
                    </button>
                </div>
            </div>
            <LoadingPopup isLoading={isLoading} />
        </div>
    );
};

export default CreatePostUser;
