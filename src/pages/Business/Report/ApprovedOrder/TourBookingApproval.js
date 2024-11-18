import React, { useState, useEffect } from 'react';
import apiService from '../../../../Components/ApiService';
import swal from 'sweetalert';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
const TourBookingApproval = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const managerId = localStorage.getItem('userId') || 1;
    // Fetch dữ liệu từ server dựa trên managerId
    const fetchBookings = async () => {
        try {
            const data = await apiService.request('get', `manager/${managerId}/bookings`);
            setBookings(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBookings();
    }, []);

    // Hàm duyệt đơn
    const approveBooking = async (bookingId) => {
        setLoading(true);
        try {
            await apiService.request('post', `bookings/${bookingId}/approve`);
            // setBookings((prev) =>
            //     prev.map((booking) => (booking.bookingId === bookingId ? { ...booking, status: 'CONFIRM' } : booking)),
            // );
            fetchBookings();
            swal('Thành công', 'Duyệt đơn thành công', 'success');
        } catch (err) {
            swal('Lỗi', 'Có lỗi khi duyệt đơn', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Hàm từ chối đơn
    const rejectBooking = async (bookingId) => {
        setLoading(true);
        try {
            await apiService.request('post', `bookings/${bookingId}/reject`);
            // setBookings((prev) =>
            //     prev.map((booking) => (booking.bookingId === bookingId ? { ...booking, status: 'REJECT' } : booking)),
            // );
            fetchBookings();
            swal('Thành công', 'Đã từ chối đơn này', 'success');
        } catch (err) {
            swal('Lỗi', 'Có lỗi khi duyệt đơn', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Danh sách đơn đặt chuyến đi</h2>
            <div className="grid grid-cols-1 gap-4">
                {bookings.length === 0 ? (
                    <p>Không có đơn đặt cho chuyến đi nào</p>
                ) : (
                    bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="border p-4 rounded-lg shadow-lg flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-bold">{booking.tourTitle}</h3>
                                <p>
                                    <span className="font-semibold">Khách hàng:</span> {booking.customerName}
                                </p>
                                <p>
                                    <span className="font-semibold">Số lượng:</span> {booking.quantity}
                                </p>
                                <p>
                                    <span className="font-semibold">Giá:</span> {booking.price} VND
                                </p>
                                <p>
                                    <span className="font-semibold">Trạng thái:</span> {booking.status}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {booking.status === 'PROCESS' && (
                                    <>
                                        <button
                                            onClick={() => approveBooking(booking.bookingId)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Duyệt
                                        </button>
                                        <button
                                            onClick={() => rejectBooking(booking.bookingId)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            Từ chối
                                        </button>
                                    </>
                                )}
                                {booking.status !== 'PROCESS' && (
                                    <span className="text-gray-500 italic">
                                        {booking.status === 'CONFIRM' ? 'Đã duyệt' : 'Đã từ chối'}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <LoadingPopup isLoading={loading} />
        </div>
    );
};

export default TourBookingApproval;
