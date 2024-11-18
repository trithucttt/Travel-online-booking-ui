// AdminDashboard.jsx
import React from 'react';

const AdminDashboard = ({ onLogout }) => {
    // Dữ liệu người dùng chi tiết hơn
    const users = [
        { id: 1, username: 'nguyenvana', email: 'nguyenvana@gmail.com', phone: '0987654321' },
        { id: 2, username: 'tranthib', email: 'tranthib@gmail.com', phone: '0976543210' },
        { id: 3, username: 'phamvand', email: 'phamvand@yahoo.com', phone: '0965432109' },
        { id: 4, username: 'lethic', email: 'lethic@hotmail.com', phone: '0954321098' },
        { id: 5, username: 'dangminhe', email: 'dangminhe@outlook.com', phone: '0943210987' },
        { id: 6, username: 'hoangf', email: 'hoangf@example.com', phone: '0932109876' },
        { id: 7, username: 'phamg', email: 'phamg@example.com', phone: '0921098765' },
        { id: 8, username: 'vot', email: 'vot@example.com', phone: '0910987654' },
        { id: 9, username: 'nguyenh', email: 'nguyenh@example.com', phone: '0909876543' },
        { id: 10, username: 'doant', email: 'doant@example.com', phone: '0898765432' },
    ];

    const totalRevenue = 12000; // Tổng doanh thu mẫu

    return (
        <div className="p-10 bg-black min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Đăng xuất
                </button>
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Thống Kê Doanh Thu</h2>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <p className="text-2xl font-bold">Tổng Doanh Thu: ${totalRevenue}</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Danh Sách Người Dùng</h2>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left py-2">ID</th>
                                <th className="text-left py-2">Username</th>
                                <th className="text-left py-2">Email</th>
                                <th className="text-left py-2">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2">{user.id}</td>
                                    <td className="py-2">{user.username}</td>
                                    <td className="py-2">{user.email}</td>
                                    <td className="py-2">{user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
