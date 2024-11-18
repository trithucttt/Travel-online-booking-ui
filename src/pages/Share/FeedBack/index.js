import React, { useState } from 'react';
import InputField from './InputField ';

function Feedback() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        title: '',
        feedback: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /*************** Xử lý gửi phản hồi ở đây********************************/
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Phản hồi đã được gửi thành công!');
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Phản hồi người dùng</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Tên người dùng"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập tên người dùng"
                    required
                />
                <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    required
                />
                <InputField
                    label="Tiêu đề phản hồi"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề"
                    required
                />
                <InputField
                    label="Nội dung phản hồi"
                    id="feedback"
                    name="feedback"
                    type="textarea"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Nhập nội dung phản hồi"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Gửi phản hồi
                </button>
            </form>
        </div>
    );
}

export default Feedback;
