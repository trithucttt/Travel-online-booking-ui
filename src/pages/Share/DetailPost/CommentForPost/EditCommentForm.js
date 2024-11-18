import React, { useState } from 'react';

function EditCommentForm({ comment, onSave, onCancel }) {
    const [content, setContent] = useState(comment.content);
    const [images, setImages] = useState(comment.imageComment || []);
    // const [editImages, setEditImages] = useState([]);
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newImages = selectedFiles.map((file) => ({
            imageUrl: URL.createObjectURL(file),
            file,
        }));
        setImages([...images, ...newImages]);
        // setEditImages(selectedFiles);
        console.log(selectedFiles);
    };

    const handleDeleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        // setEditImages(editImages.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const newImages = [];
        const updateImages = [];

        images.forEach((img) => {
            if (img.file) {
                // Ảnh mới được tải lên
                newImages.push({ file: img.file, name: img.file.name });
            } else {
                // Ảnh cũ có thể cần cập nhật
                updateImages.push({ imageUrl: img.imageUrl });
            }
        });

        onSave(content, { newImages, updateImages });
        onCancel();
    };

    return (
        <div className="mb-2">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
            />
            <div className="flex flex-wrap gap-2 mt-2">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image.imageUrl} alt="comment" className="w-20 h-20 object-cover rounded" />
                        <button
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mt-2" />
            <div className="flex justify-end mt-2 space-x-2">
                <button onClick={handleSave} className="px-4 py-1 text-white bg-blue-500 rounded">
                    Lưu
                </button>
                <button onClick={onCancel} className="px-4 py-1 text-gray-600 border rounded">
                    Hủy
                </button>
            </div>
        </div>
    );
}

export default EditCommentForm;
