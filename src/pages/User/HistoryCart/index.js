// OrderHistoryPage.js
import React, { useEffect, useState } from 'react';
import styles from './OrderHistoryPage.module.scss';
import apiService from '../../../Components/ApiService';
import swal from 'sweetalert';

const OrderHistoryPage = () => {
    const [orderData, setOrderData] = useState();
    const token = localStorage.getItem('token') || null;
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        const fetchOrderInfo = async () => {
            const data = await apiService.request('get', 'order/info', null, headers);
            if (data.responseCode === '200') {
                setOrderData(data.data);
                console.table(data.data);
            } else {
                swal('Ops!!!', data.message, 'warning');
            }
        };
        fetchOrderInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.orderHistory}>
            <h1>Order History</h1>
            {orderData &&
                orderData.map((order) => (
                    <div key={order.bookingId} className={styles.order}>
                        <h2>Mã hóa đơn : {order.bookingId}</h2>
                        <p>Mã thanh toán: {order.bankCode}</p>
                        <p>Ngày thanh toán: {new Date(order.bookingDate).toLocaleString()}</p>
                        <p>Tổng thanh toán: {order.totalBooking.toLocaleString()} VND</p>
                        <div className={styles.items}>
                            {order.infoTourItems.map((item) => (
                                <div key={item.itemId} className={styles.item}>
                                    <h3>Tên chuyến đi:{item.itemName}</h3>
                                    <p>Trạng thái: {item.status}</p>
                                    <p>Giá: {item.price.toLocaleString()} VND</p>
                                    <p>Số lượng: {item.quantityItem}</p>
                                    <p>Ngày khởi hành: {new Date(item.startTimeItem).toLocaleString()}</p>
                                    <p>Ngày trở về: {new Date(item.endTimeItem).toLocaleString()}</p>
                                    <p>Giảm giá: {item.discountItem * 100}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default OrderHistoryPage;
