import React, { useState } from 'react';

function EditProfileModal({ user, onClose, onSave }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);

    const handleSave = () => {
        onSave({ firstName, lastName, email, address });
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <div className="mb-4">
                    <label className="block mb-2">Họ: </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Tên: </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Địa chỉ</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex space-x-4">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Lưu
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProfileModal;
