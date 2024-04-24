import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { routeKey } from '../../../Components/pathName';
import apiService from '../../../Components/ApiService';
import swal from 'sweetalert';

function Payment() {
    const navigate = useNavigate();
    function parseQueryString(url) {
        // Nếu không có URL được cung cấp, sử dụng URL hiện tại của trình duyệt
        const queryString = url ? new URL(url).search : window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const result = {};

        // Danh sách các trường cần trích xuất từ query string
        const fields = [
            'vnp_Amount',
            'vnp_BankCode',
            'vnp_BankTranNo',
            'vnp_CardType',
            'vnp_OrderInfo',
            'vnp_PayDate',
            'vnp_ResponseCode',
            'vnp_TmnCode',
            'vnp_TransactionNo',
            'vnp_TransactionStatus',
            'vnp_TxnRef',
            'vnp_SecureHash',
        ];

        // Lặp qua danh sách trường và thêm giá trị vào đối tượng kết quả
        fields.forEach((field) => {
            const value = urlParams.get(field);
            // Kiểm tra nếu giá trị không null và không rỗng
            if (value !== null && value !== undefined && value !== '') {
                result[field] = value;
            }
        });

        return result;
    }

    // Sử dụng hàm để lấy các giá trị từ query string và xử lý
    const queryParams = parseQueryString();
    console.log(queryParams);

    const [checkPayment, setCheckPayment] = useState(false);
    useEffect(() => {
        const queryParams = parseQueryString();
        if (
            queryParams.vnp_ResponseCode === '24' ||
            queryParams.vnp_TransactionStatus === '02' ||
            queryParams.vnp_TransactionNo === '0'
        ) {
            alert('Đã hủy thanh toán');
            navigate(routeKey.cart);
        } else {
            setCheckPayment(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const token = localStorage.getItem('token');

    const listCartItemsString = localStorage.getItem('listCartItems');

    const handleSavePayment = async () => {
        const requestData = parseQueryString();
        console.log(requestData);
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const res = await apiService.request('post', 'cart/payment/process', requestData, headers);
        console.log(res);
        if (res.resCode === '200') {
            swal('Success', res.message, 'success');
            const listCartItems = listCartItemsString.split(',').map(Number);
            const orderRequest = {
                cartItemId: listCartItems,
                totalPrice: res.totalPrice,
                bankCode: res.bankTranNo,
                bankDate: res.payDay,
            };

            console.log('ORDER REQUEST', orderRequest);
            const response = await apiService.request('post', 'cart/payment/save', orderRequest, headers);

            console.log(response);
            swal('Failed', response.message, 'error');
            if (response.responseCode === '200') {
                swal('Success', response.message, 'success');
                localStorage.removeItem('listCartItems');
                navigate(routeKey.cart);
            }
        } else {
            swal('Failed', 'Payment Failed', 'error');
        }
    };
    return (
        <div className="h-screen w-screen bg-gray-50 flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
                {checkPayment && (
                    <div className="w-full lg:w-1/2 mx-8">
                        <div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
                            {' '}
                            Process <TailSpin color="red" radius={'8px'} />
                        </div>
                        <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
                            {' '}
                            Please Confirm Your Payment
                        </p>

                        <button
                            onClick={handleSavePayment}
                            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
                        >
                            confirm
                        </button>
                    </div>
                )}
                <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
                    <img
                        src="https://i.pinimg.com/564x/e6/8c/24/e68c24a887072e6acd15ed9ce57e0bf0.jpg"
                        className=""
                        alt="Page not found"
                    />
                </div>
            </div>
        </div>
    );
}
export default Payment;
