import withHeader from '../../../Components/Layout/withHeader';
import styles from './Cart.module.scss';
import CartItem from './CartItem';
import { VND } from '../../../helper';
import { ToastContainer } from 'react-toastify';
import CartHandler from './CartHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

function Cart() {
    const cartData = [
        {
            id: 1,
            productName: 'Tour 1',
            supplier: 'Traveloka',
            day_tour: '3',
            location: 'Viet Nam',
            service_tour: 'all service',
            priceTour: 3333333,
            quantity: 1,
            check_in_date: '28-03-2024',
        },
        {
            id: 2,
            productName: 'Tour 1',
            supplier: 'Traveloka',
            day_tour: '3',
            location: 'Viet Nam',
            service_tour: 'all service',
            priceTour: 3333333,
            quantity: 2,
            check_in_date: '28-03-2024',
        },
        {
            id: 3,
            productName: 'Tour 1',
            supplier: 'Traveloka',
            day_tour: '3',
            location: 'Viet Nam',
            service_tour: 'all service',
            priceTour: 3333333,
            quantity: 3,
            check_in_date: '28-03-2024',
        },
        {
            id: 4,
            productName: 'Tour 1',
            supplier: 'Traveloka',
            day_tour: '3',
            location: 'Viet Nam',
            service_tour: 'all service',
            priceTour: 3333333,
            quantity: 4,
            check_in_date: '28-03-2024',
        },
    ];
    const {
        cartItems,
        checkAllCart,
        totalPrice,
        handleChangeMethodPayment,
        handleCheckAllCart,
        handleCheckItems,
        handleCheckOut,
    } = CartHandler({ initialTotalPrice: 0, initialCheckAllCart: false, initialCart: cartData });
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
                                    key={cart.id}
                                    cart={cart}
                                    index={index}
                                    onCheck={() => handleCheckItems(cart.id)}
                                    checked={cart.checked}
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
