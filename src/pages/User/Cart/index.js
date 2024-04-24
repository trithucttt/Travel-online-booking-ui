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
    const token = localStorage.getItem('token') || null;
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
            swal('Ops!!', res.message, 'warning');
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
            swal('Ops!!', 'Payment cannot be made if the item is not available', 'warning');
        }
    };
    const handleChangeMethodPayment = (value) => {
        alert(value);
    };

    const handleDelete = async (id) => {
        const data = await apiService.request('delete', `cart/delete/${id}`);
        if (data.responseCode === '200') {
            swal('Success', data.message, 'success');
            fetchCartInfo();
        } else {
            swal('Ops!!', data.message, 'warning');
        }
    };

    const handleDecrement = async (id) => {
        // alert(id);
        const data = await apiService.request('put', `cart/decrease/${id}`);
        if (data.responseCode === '200') {
            swal('Success', data.message, 'success');
            fetchCartInfo();
        } else {
            swal('Ops!!', data.message, 'warning');
        }
    };
    const handleIncrement = async (id) => {
        const data = await apiService.request('put', `cart/increase/${id}`);
        if (data.responseCode === '200') {
            swal('Success', data.message, 'success');
            fetchCartInfo();
        } else {
            swal('Ops!!', data.message, 'warning');
        }
    };

    return (
        <>
            <div className={styles.containerCart}>
                <div className={styles.ownerCart}>
                    <img
                        className={styles.imageUser}
                        alt=""
                        src="https://i.pinimg.com/564x/da/55/9b/da559be15478670b6f92ab7e489a1e50.jpg"
                        // src={`http://localhost:8086/api/cart/upload/imageCart/${cart.id}`}
                    />
                    <div className={styles.ownerName}>Owner User</div>
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
                            ({cartItems.filter((item) => item.checked).length} items checked )
                        </div>
                        <div className={`${styles.paymentGroup} ${styles.totalPrice}`}>
                            Total Price: {VND.format(totalPrice)}
                        </div>
                        <div className={`${styles.paymentGroup} ${styles.paymentMethod}`}>
                            <select onChange={(e) => handleChangeMethodPayment(e.target.value)}>
                                <option value="" className={styles.optionPayment}>
                                    Select a Payment Method
                                </option>
                                <option value="a">VNPAY</option>
                                <option value="b">PAYPAL</option>
                                <option value="c">ZALO PAY</option>
                                <option value="d">MOMO</option>
                            </select>
                        </div>
                        <div className={`${styles.paymentGroup}`}>
                            <button className={styles.btnCheckOut} onClick={handleCheckOut}>
                                CheckOut
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
        </>
    );
}

export default withHeader(Cart);
