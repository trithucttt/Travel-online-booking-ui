import withHeader from '../../../Components/Layout/withHeader';
import styles from './Cart.module.scss';
import CartItem from './CartItem';
import { VND } from '../../../helper';
import { ToastContainer } from 'react-toastify';
// import CartHandler from './CartHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import apiService from '../../../Components/ApiService';
import { jwtDecode } from 'jwt-decode';
import { LoadingPopup } from '../../../Components/Loading/LoadingPopup';
function Cart() {
    // const {
    //     cartItems,
    //     checkAllCart,
    //     totalPrice,
    //     handleChangeMethodPayment,
    //     handleCheckAllCart,
    //     handleCheckItems,
    //     handleCheckOut,
    // } = CartHandler({ initialTotalPrice: 0, initialCheckAllCart: false, initialCart: cartData });
    const [cartItems, setCartItems] = useState([]);
    const [checkAllCart, setCheckAllCart] = useState(false);
    const [totalPrice, setToltalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const token = localStorage.getItem('token') || null;
    const [isLoading, setIsLoading] = useState(false);
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            return item.checked ? acc + item.listTourInCart.price * item.quantity : acc;
        }, 0);
        setToltalPrice(total);
    }, [cartItems, checkAllCart]);

    const fetchCartInfo = async () => {
        const res = await apiService.request('get', 'cart/info', null, headers);
        if (res.responseCode === '200') {
            setCartItems(res.data);
            console.log(res.data);
        } else {
            swal('Ops!!', 'Không có chuyến đi nào trong giỏ hàng!!!', 'warning');
        }
    };
    useEffect(() => {
        fetchCartInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleCheckItems = (cartId) => {
        // alert(cartId);
        const newCart = cartItems.map((item) => {
            if (item.cartItemId === cartId) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setCartItems(newCart);
        console.log(cartItems);
    };
    const handleCheckAllCart = () => {
        setCheckAllCart(!checkAllCart);
        const newCart = cartItems.map((item) => ({ ...item, checked: !checkAllCart }));
        setCartItems(newCart);
    };
    const handleCheckOut = async () => {
        const token = localStorage.getItem('token') || null;
        const parsToken = jwtDecode(token);
        if (totalPrice !== 0) {
            const checkedCartIds = cartItems.filter((item) => item.checked).map((item) => item.cartItemId);
            console.log('Checked out itemsID:', checkedCartIds);
            const data = await apiService.request('get', 'cart/payment/createUrl', null, null, {
                totalPrice: totalPrice,
                username: parsToken.sub,
            });
            if (data.responseCode === '200') {
                console.log(data.data);
                localStorage.setItem('listCartItems', checkedCartIds);
                const urlPayment = data.data;
                window.location.href = urlPayment;
            }
        } else {
            swal('Lỗi!!', 'Không có chuyến đi nào được chọn để thanh toán', 'warning');
        }
    };
    // const handleChangeMethodPayment = (value) => {
    //     alert(value);
    // };

    const handleDelete = async (id) => {
        const confirmed = await swal({
            title: 'Bạn có chắc muốn xóa?',
            text: 'Khi xóa, Bạn sẽ không thể phục hồi lại!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        });

        if (confirmed) {
            setIsLoading(true);
            try {
                const data = await apiService.request('delete', `cart/delete/${id}`);
                if (data.responseCode === '200') {
                    swal('Thành công', data.message, 'success');
                    fetchCartInfo();
                } else {
                    swal('Cảnh báo!!', data.message, 'warning');
                }
            } catch (error) {
                swal('Lỗi!!', 'Chi tiết lỗi' + error, 'error');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDecrement = async (id) => {
        // alert(id);
        setIsLoading(true);
        try {
            const data = await apiService.request('put', `cart/decrease/${id}`);
            if (data.responseCode === '200') {
                swal('Thành công', data.message, 'success');
                fetchCartInfo();
            } else {
                swal('Cảnh báo!!', data.message, 'warning');
            }
        } catch (error) {
            swal('Lỗi!!', 'Chi tiết lỗi' + error, 'error');
        } finally {
            setIsLoading(false);
        }
    };
    const handleIncrement = async (id) => {
        setIsLoading(true);
        try {
            const data = await apiService.request('put', `cart/increase/${id}`);
            if (data.responseCode === '200') {
                swal('Thành công', data.message, 'success');
                fetchCartInfo();
            } else {
                swal('Cảnh báo!!', data.message, 'warning');
            }
        } catch (error) {
            swal('Có lỗi xảy ra!!', 'Chi tiết lỗi' + error, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={styles.containerCart}>
                <div className={styles.ownerCart}>
                    {/* <img
                        className={styles.imageUser}
                        alt=""
                        src="https://i.pinimg.com/564x/da/55/9b/da559be15478670b6f92ab7e489a1e50.jpg"
                    />
                    <div className={styles.ownerName}>Nguyễn Trí Thức</div> */}

                    {/* Phần chọn phương thức thanh toán */}
                    <div className={`${styles.paymentSection} mt-20 pl-10`}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Chọn phương thức thanh toán:</h3>
                        <div className={`${styles.paymentOptions} flex flex-col items-center`}>
                            <label
                                className={`${styles.paymentOption} ${paymentMethod === 'vnPay' ? 'bg-cyan-600' : ''}`}
                                onClick={() => setPaymentMethod('vnPay')}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="vnPay"
                                    checked={paymentMethod === 'vnPay'}
                                    onChange={() => setPaymentMethod('vnPay')}
                                    className="hidden"
                                />
                                <span>VNPay</span>
                            </label>
                            <label
                                className={`${styles.paymentOption} ${
                                    paymentMethod === 'zaloPay' ? 'bg-cyan-600' : ''
                                }`}
                                onClick={() => setPaymentMethod('zaloPay')}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="zaloPay"
                                    checked={paymentMethod === 'zaloPay'}
                                    onChange={() => setPaymentMethod('zaloPay')}
                                    className="hidden"
                                />
                                <span>ZaloPay</span>
                            </label>
                            <label
                                className={`${styles.paymentOption} ${paymentMethod === 'paypal' ? 'bg-cyan-600' : ''}`}
                                onClick={() => setPaymentMethod('paypal')}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={() => setPaymentMethod('paypal')}
                                    className="hidden"
                                />
                                <span>PayPal</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.infoCart}>
                    <div className={styles.checkOutItem}>
                        <div className={`${styles.paymentGroup} ${styles.groupCheckAll}`}>
                            <div onClick={handleCheckAllCart}>
                                {!checkAllCart && <FontAwesomeIcon icon={faSquare} className={styles.checkAllCart} />}
                                {checkAllCart && (
                                    <FontAwesomeIcon icon={faSquareCheck} className={styles.checkAllCart} />
                                )}
                            </div>
                            ({cartItems.filter((item) => item.checked).length} số lượng đã chọn )
                        </div>
                        <div className={`${styles.paymentGroup} ${styles.totalPrice}`}>
                            Tổng tiền: {VND.format(totalPrice)}
                        </div>
                        {/* <div className={`${styles.paymentGroup} ${styles.paymentMethod}`}>
                            <select onChange={(e) => handleChangeMethodPayment(e.target.value)}>
                                <option value="" className={styles.optionPayment}>
                                    Select a Payment Method
                                </option>
                                <option value="a">VNPAY</option>
                                <option value="b">PAYPAL</option>
                                <option value="c">ZALO PAY</option>
                                <option value="d">MOMO</option>
                            </select>
                        </div> */}
                        <div className={`${styles.paymentGroup}`}>
                            <button className={styles.btnCheckOut} onClick={handleCheckOut}>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                    <div className={styles.CartItem}>
                        {cartItems &&
                            cartItems.map((cart, index) => (
                                <CartItem
                                    key={cart.cartItemId}
                                    cart={cart}
                                    index={index}
                                    onCheck={() => handleCheckItems(cart.cartItemId)}
                                    checked={cart.checked}
                                    onDecrease={() => handleDecrement(cart.cartItemId)}
                                    onIncrease={() => handleIncrement(cart.cartItemId)}
                                    onDelete={() => handleDelete(cart.cartItemId)}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
            <LoadingPopup isLoading={isLoading} />
        </>
    );
}

export default withHeader(Cart);
