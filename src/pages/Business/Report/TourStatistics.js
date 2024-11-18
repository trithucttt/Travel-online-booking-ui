// TourStatistics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TourStatistics = ({ businessId }) => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu tour
        axios
            .get(`http://localhost:8086/api/bookings/total-booked-tours?businessId=${businessId}`)
            .then((response) => {
                setTours(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the tours!', error);
            });
        // eslint-disable-next-line
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Thống kê chuyến tham quan</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b border-gray-200 text-left text-gray-700 font-semibold">ID</th>
                        <th className="px-4 py-2 border-b border-gray-200 text-left text-gray-700 font-semibold">
                            Tiêu đề
                        </th>
                        <th className="px-4 py-2 border-b border-gray-200 text-right text-gray-700 font-semibold">
                            Giá (VND)
                        </th>
                        <th className="px-4 py-2 border-b border-gray-200 text-right text-gray-700 font-semibold">
                            Số lượng
                        </th>
                        <th className="px-4 py-2 border-b border-gray-200 text-right text-gray-700 font-semibold">
                            Đã đặt trước
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour.id} className="hover:bg-gray-100 transition">
                            <td className="px-4 py-2 border-b border-gray-200 text-gray-700">{tour.id}</td>
                            <td className="px-4 py-2 border-b border-gray-200 text-gray-700">{tour.title}</td>
                            <td className="px-4 py-2 border-b border-gray-200 text-right text-gray-700">
                                {tour.price.toLocaleString()}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-200 text-right text-gray-700">
                                {tour.quantity}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-200 text-right text-gray-700">
                                {tour.bookedQuantity}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TourStatistics;
