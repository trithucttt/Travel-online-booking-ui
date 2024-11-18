import React from 'react';

function OrderHistory() {
    const orders = [
        {
            id: 1,
            orderNumber: 'TOUR123456',
            tourName: 'Discover Ha Long Bay',
            orderDate: '2024-10-01',
            departureDate: '2024-12-15',
            returnDate: '2024-12-20',
            status: 'Confirmed',
            participants: 2,
            totalAmount: 1200,
            destination: 'Ha Long Bay, Vietnam',
        },
        {
            id: 2,
            orderNumber: 'TOUR789012',
            tourName: 'Explore Sapa Highlands',
            orderDate: '2024-11-10',
            departureDate: '2025-01-05',
            returnDate: '2025-01-10',
            status: 'Pending Payment',
            participants: 4,
            totalAmount: 1800,
            destination: 'Sapa, Vietnam',
        },
    ];

    return (
        <div className="space-y-6 p-4">
            {orders.map((order) => (
                <div key={order.id} className="p-6 border rounded-lg shadow-lg bg-white">
                    <h2 className="text-2xl font-bold mb-2">Order #{order.orderNumber}</h2>
                    <p className="text-gray-600">Chuyến đi: {order.tourName}</p>
                    <p className="text-gray-600">Ngày đặt: {order.orderDate}</p>
                    <p className="text-gray-600">Ngày khởi hành: {order.departureDate}</p>
                    <p className="text-gray-600">Ngày trở về: {order.returnDate}</p>
                    <p className="font-semibold mt-2">
                        Trạng thái:{' '}
                        <span className={order.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}>
                            {order.status}
                        </span>
                    </p>

                    <div className="mt-4 font-semibold text-gray-800">
                        Người tham gia: <span className="text-black">{order.participants} người</span>
                    </div>

                    <div className="mt-4 font-semibold text-gray-800">
                        Tổng giá: <span className="text-black">${order.totalAmount}</span>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-xl font-semibold mb-2">Điểm đến:</h3>
                        <p className="text-gray-600">{order.destination}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderHistory;
