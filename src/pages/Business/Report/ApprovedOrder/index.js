import React, { useState, useEffect } from 'react';
import { ChartBarIcon, UsersIcon, ClipboardCheckIcon, BanIcon } from '@heroicons/react/solid';
import CountUp from 'react-countup';
import TourBookingApproval from './TourBookingApproval'; // Component duyệt đơn
import apiService from '../../../../Components/ApiService';
import TourStatistics from '../TourStatistics';

function OrderApproval() {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [completedTours, setCompletedTours] = useState(0); // Số tour hoàn thành
    const [canceledTours, setCanceledTours] = useState(0); // Số tour hủy
    const [showApproval, setShowApproval] = useState(false); // State điều khiển phần duyệt đơn
    const [pendingBookingsCount, setPendingBookingsCount] = useState(0); // Số lượng đơn chưa duyệt

    const businessId = localStorage.getItem('userId') || 1;

    // Gọi API để lấy dữ liệu từ backend
    useEffect(() => {
        const fetchTourStats = async () => {
            try {
                const revenueResponse = await apiService.request(
                    'get',
                    `bookings/total-revenue-tours?businessId=${businessId}`,
                );
                const customersResponse = await apiService.request(
                    'get',
                    `bookings/unique-customers?businessId=${businessId}`,
                );
                const completedToursResponse = await apiService.request(
                    'get',
                    `bookings/completed-tours?businessId=${businessId}`,
                );
                const canceledToursResponse = await apiService.request(
                    'get',
                    `bookings/canceled-tours?businessId=${businessId}`,
                );

                setTotalRevenue(revenueResponse); // Tổng doanh thu
                setTotalCustomers(customersResponse); // Tổng khách hàng
                setCompletedTours(completedToursResponse); // Tour hoàn thành
                setCanceledTours(canceledToursResponse); // Tour hủy
            } catch (error) {
                console.error('Failed to fetch tour stats:', error);
            }
        };

        const fetchPendingBookingsCount = async () => {
            try {
                const pendingResponse = await apiService.request('get', `manager/${businessId}/bookings`);
                setPendingBookingsCount(pendingResponse.filter((booking) => booking.status === 'PROCESS').length);
            } catch (error) {
                console.error('Failed to fetch pending bookings count:', error);
            }
        };

        fetchTourStats();
        fetchPendingBookingsCount();
    }, [businessId]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Quản lý doanh nghiệp</h1>

                {/* Thống kê tổng quát */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {/* Tổng Doanh Thu */}
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg text-white flex items-center justify-between transition transform hover:scale-105">
                        <div>
                            <h2 className="text-xl font-semibold">Tổng doanh thu</h2>
                            <p className="text-4xl font-bold mt-2">
                                <CountUp end={totalRevenue} duration={2} separator="," /> VND
                            </p>
                        </div>
                        <ChartBarIcon className="w-12 h-12 text-white opacity-75" />
                    </div>

                    {/* Tổng Khách Hàng */}
                    <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-lg shadow-lg text-white flex items-center justify-between transition transform hover:scale-105">
                        <div>
                            <h2 className="text-xl font-semibold">Tổng số khách hàng</h2>
                            <p className="text-4xl font-bold mt-2">
                                <CountUp end={totalCustomers} duration={2} />
                            </p>
                        </div>
                        <UsersIcon className="w-12 h-12 text-white opacity-75" />
                    </div>

                    {/* Tour Hoàn Thành */}
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white flex items-center justify-between transition transform hover:scale-105">
                        <div>
                            <h2 className="text-xl font-semibold">Đơn đã duyệt</h2>
                            <p className="text-4xl font-bold mt-2">
                                <CountUp end={completedTours} duration={2} />
                            </p>
                        </div>
                        <ClipboardCheckIcon className="w-12 h-12 text-white opacity-75" />
                    </div>

                    {/* Tour Bị Hủy */}
                    <div className="bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-lg shadow-lg text-white flex items-center justify-between transition transform hover:scale-105">
                        <div>
                            <h2 className="text-xl font-semibold">Đơn đã hủy</h2>
                            <p className="text-4xl font-bold mt-2">
                                <CountUp end={canceledTours} duration={2} />
                            </p>
                        </div>
                        <BanIcon className="w-12 h-12 text-white opacity-75" />
                    </div>
                </div>

                {/* Nút mở phần duyệt đơn */}
                <div className="mb-8">
                    <button
                        onClick={() => setShowApproval(!showApproval)} // Toggle phần duyệt đơn
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
                    >
                        {showApproval
                            ? 'Đóng Phần Duyệt Đơn'
                            : `Mở Phần Duyệt Đơn (${pendingBookingsCount} chưa duyệt) `}
                    </button>
                </div>

                {/* Hiển thị phần duyệt đơn */}
                {showApproval && (
                    <div className="mb-8">
                        <TourBookingApproval /> {/* Gọi component duyệt đơn */}
                    </div>
                )}

                {/* Thống kê chi tiết các chuyến đi */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Thống kê chuyến tham quan</h2>
                    <TourStatistics businessId={businessId} />
                </div>
            </div>
        </div>
    );
}

export default OrderApproval;
