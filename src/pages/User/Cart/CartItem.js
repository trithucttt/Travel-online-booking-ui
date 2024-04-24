import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './CartItem.module.scss';
import { faSquare, faSquareCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { VND } from '../../../helper';
function CartItem({ cart, index, onCheck, checked, onDelete, onDecrease, onIncrease }) {
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date).replace(/\./g, '/');
    };
    return (
        <>
            <div key={index} className={styles.cartItem}>
                <div className={styles.groupCheckbox} onClick={onCheck}>
                    {!checked && <FontAwesomeIcon icon={faSquare} />}
                    {checked && <FontAwesomeIcon icon={faSquareCheck} />}
                </div>
                <div className={styles.imageCart}>
                    <img
                        className={styles.imageItems}
                        alt=""
                        src={`http://localhost:8086/api/post/${cart.listTourInCart.tourImageName}/image`}
                        // src={`http://localhost:8086/api/cart/upload/imageCart/${cart.id}`}
                        // src="https://i.pinimg.com/564x/01/16/37/011637a289e407972b469e57d3b069fd.jpg"
                    />
                </div>
                <div className={styles.cartFrame}>
                    <section className={styles.cartSection}>
                        <span className={styles.headerCart}>
                            <h2 className={styles.tourName}>{cart.listTourInCart.tourName}</h2>
                        </span>
                        <div className={styles.bodyCart}>
                            <ul className={styles.contentCart}>
                                <li className={styles.contentCartItem}>
                                    Supplier : {cart.listTourInCart.fullNameSupplier}
                                </li>
                                {/* <li className={styles.contentCartItem}>Địa điểm : {cart.location}</li> */}
                                <li className={styles.contentCartItem}>
                                    Check in date : {formatDateTime(cart.listTourInCart.startTime)}
                                </li>
                                <li className={styles.contentCartItem}>
                                    Check out date : {formatDateTime(cart.listTourInCart.endTime)}
                                </li>
                            </ul>
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className={styles.iconTrash}
                                onClick={() => onDelete(cart.cartItemId)}
                            />
                        </div>
                    </section>
                    <article className={styles.cartFooter}>
                        <span className={styles.groupIcon}>
                            <FontAwesomeIcon
                                icon={faMinus}
                                className={styles.iconMinus}
                                onClick={() => onDecrease(cart.cartItemId)}
                            />
                            <input className={styles.quantityCart} value={cart.quantity} readOnly />
                            <FontAwesomeIcon
                                icon={faPlus}
                                className={styles.iconPlus}
                                onClick={() => onIncrease(cart.cartItemId)}
                            />
                        </span>
                        <span className={styles.cartPrice}>{VND.format(cart.listTourInCart.price)}</span>
                        <span className={styles.totalPrice}>
                            {VND.format(cart.listTourInCart.price * cart.quantity)}₫
                        </span>
                    </article>
                </div>
            </div>
        </>
    );
}
export default CartItem;
//   // const [cartItems, setCartItems] = useState([]);
//   const token = localStorage.getItem('token');
//   const [priceTotal, setPriceTotal] = useState(0);
//   const [checkAll, setCheckAll] = useState(false);
//   const [checkPrice, setCheckPrice] = useState([]);
//   const dispatch = useDispatch();
//   // const cart = useSelector(selectCart);
//   // const navigate = useNavigate();
//   const [checkedItems, setCheckedItems] = useState([]);
//   useEffect(() => {
//       const fetchCart = async () => {
//           //     try {
//           //         const response = await axios.get('http://localhost:8086/api/cart/mycart', {
//           //             headers: {
//           //                 Authorization: `Bearer ${token}`,
//           //             },
//           //         });
//           //         // console.log(token)
//           //         const cartData = response.data;
//           //         setCartItems(cartData);
//           //         console.log(cartData);
//           //         const initialCheckedItems = cartData.map((item) => item.isChecked);
//           //         setCheckPrice(initialCheckedItems);
//           //         const initialTotal = cartData.reduce(
//           //             (sum, item, i) => (initialCheckedItems[i] ? sum + item.priceTour * item.quantity : sum),
//           //             0,
//           //         );
//           //         setPriceTotal(initialTotal);
//           //     } catch (error) {
//           //         // Swal.fire({
//           //         //   icon: "error",
//           //         //   title: "Oops...",
//           //         //   text: "Can not  connect to server",
//           //         //});
//           //         toast.warning('Cart item is null');
//           //     }
//           // };
//           // fetchCart();
//       };
//   }, []);
//   const handleIncrement = async (index) => {
//       // const updateCart = [...cartItems];
//       // const token = localStorage.getItem('token');
//       // const decodetoken = jwtDecode(token);
//       // const usernameToken = decodetoken.sub;
//       // const addItemToId = {
//       //     tourId: updateCart[index].tourId,
//       //     check_in_date: updateCart[index].check_in_date,
//       //     username: usernameToken,
//       //     productName: updateCart[index].productName,
//       //     day_tour: updateCart[index].dayTour,
//       //     priceTour: updateCart[index].price,
//       //     location: updateCart[index].location,
//       //     service_tour: updateCart[index].service_tour,
//       //     quantity: updateCart[index].quantity,
//       //     // address: updateCart[itemId],
//       // };
//       // // console.log(addItemToId);
//       // try {
//       //     const response = await axios.post('http://localhost:8086/api/cart/add', addItemToId);
//       //     updateCart[index].quantity += 1;
//       //     setCartItems(updateCart);
//       //     // alert("AddToCart successfully");
//       //     toast.success('Thêm thành công');
//       // } catch (error) {
//       //     console.error('AddToCart failed:', error);
//       //     alert('AddToCart failed:');
//       // }
//   };
//   const handleDecrement = async (index, cartId, id) => {
//       // const updateCart = [...cartItems];
//       // console.log(id);
//       // console.log(index);
//       // if (updateCart[index].quantity > 1) {
//       //     try {
//       //         const response = await axios.delete(`http://localhost:8086/api/cart/decrement/${id}`, {
//       //             headers: {
//       //                 Authorization: `Bearer ${token}`,
//       //             },
//       //         });
//       //         console.log(response.data);
//       //         toast.success('Giảm thành công');
//       //     } catch (error) {
//       //         console.error(error);
//       //     }
//       // } else {
//       //     handleDelete(cartId, id);
//       // }
//   };

//   const handleDelete = async (yourBookingId, Itemid) => {
//       // try {
//       //     const response = await axios.delete(`http://localhost:8086/api/cart/delete/${yourBookingId}/${Itemid}`, {
//       //         headers: {
//       //             Authorization: `Bearer ${token}`,
//       //         },
//       //     });
//       //     const updateCart = [...cartItems];
//       //     updateCart.splice(Itemid, 1);
//       //     setCartItems(updateCart);
//       //     setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== Itemid));
//       //     console.log(response.data);
//       //     toast.success('Xóa thành công');
//       // } catch (error) {
//       //     // Handle error
//       //     console.error(error);
//       //     //toast.error(error);
//       // }
//   };

//   const handleChangePrice = (index, isCheckAll) => {
//       // setCheckPrice((prevCheckPrice) => {
//       //     let newCheckPrice = [...prevCheckPrice];
//       //     if (isCheckAll) {
//       //         const allChecked = !checkAll;
//       //         //  newCheckPrice.fill(allChecked);sử dụng mảng cố định
//       //         newCheckPrice = prevCheckPrice.map(() => allChecked);
//       //         setCheckAll(allChecked);
//       //         //  dispatch(updateCheckedItems(newCheckPrice));
//       //     } else {
//       //         //    newCheckPrice[index] = !newCheckPrice[index]; sử dụng mảng cố định
//       //         newCheckPrice = prevCheckPrice.map((item, i) => (i === index ? !item : item));
//       //         // Kiểm tra xem tất cả các checkbox đều được chọn, nếu đúng, cập nhật trạng thái "Check All"
//       //         const allChecked = newCheckPrice.every((item) => item);
//       //         setCheckAll(allChecked);
//       //         //   dispatch(updateCheckedItems(newCheckPrice));
//       //         // Nếu tất cả đều đã được chọn và đang thực hiện bỏ chọn "Check All", thì bỏ chọn tất cả
//       //         if (allChecked) {
//       //             //  newCheckPrice.fill(false); sử dụng mảng cố đinh
//       //             newCheckPrice = newCheckPrice.map(() => false);
//       //             setCheckAll(false);
//       //             // dispatch(updateCheckedItems(newCheckPrice));
//       //         }
//       //     }
//       //     // Tính tổng tiền dựa trên trạng thái của checkbox
//       //     setPriceTotal((prevTotal) => {
//       //         const currentTotal = newCheckPrice.reduce((sum, isChecked, i) => {
//       //             if (isChecked) {
//       //                 // Kiểm tra xem mục tương ứng có tồn tại không trước khi truy cập thuộc tính
//       //                 const currentItem = cartItems[i];
//       //                 if (currentItem) {
//       //                     return sum + currentItem.priceTour * currentItem.quantity;
//       //                 }
//       //             }
//       //             return sum;
//       //         }, 0);
//       //         return currentTotal < 0 ? 0 : currentTotal;
//       //     });
//       //     const selectedItems = cartItems.filter((item, i) => newCheckPrice[i]);
//       //     setCheckedItems(selectedItems);
//       //     console.log(selectedItems);
//       //     return newCheckPrice;
//       // });
//   };

//   const handleCheckOut = async () => {
//       // if (priceTotal === 0) {
//       //     Swal.fire({
//       //         icon: 'error',
//       //         title: 'Đơn hàng trống',
//       //         text: 'Chọn tour trước khi thanh toán',
//       //     });
//       // } else {
//       //     const updateCheckedItems = [...checkedItems];
//       //     console.log('type new item check out', updateCheckedItems);
//       //     console.log('type check Item', typeof [...checkedItems]);
//       //     console.log(updateCheckedItems);
//       //     console.log(priceTotal);
//       //     // dispatch(updateItems(checkedItems));
//       //     // dispatch(setTotalPrice(priceTotal));
//       //     // dispatch(setPaymentOption(optionPayment));
//       //     // navigate("/checkout");
//       //     // try {
//       //     //     const urlPayment = paymentService.createPayment(
//       //     //         priceTotal,
//       //     //         'thanh toan hoa don',
//       //     //         'http:/localhost:3000/yourbooking',
//       //     //         '1',
//       //     //     );
//       //     //     window.close();
//       //     //     window.open(urlPayment, '_blank')?.focus();
//       //     //     // Xử lý kết quả thanh toán, có thể chuyển hướng trình duyệt đến trang thanh toán hoặc hiển thị thông báo
//       //     //     // console.log();
//       //     // } catch (error) {
//       //     //     console.error('Process Payment failed', error);
//       //     //     // Hiển thị thông báo lỗi cho người dùng
//       //     //     Swal.fire({
//       //     //         icon: 'error',
//       //     //         title: 'Lỗi thanh toán',
//       //     //         text: 'Quá trình thanh toán thất bại. Vui lòng thử lại sau.',
//       //     //     });
//       //     // }
//       //     // try {
//       //     //     const response = await axios.post('http://localhost:8086/api/cart/payment', updateCheckedItems, {
//       //     //         headers: {
//       //     //             Authorization: `Bearer ${token}`,
//       //     //         },
//       //     //     });
//       //     //     dispatch(updateItems(checkedItems));
//       //     //     dispatch(setTotalPrice(priceTotal));
//       //     //     dispatch(setPaymentOption(optionPayment));
//       //     //     navigate('/checkout');
//       //     //     toast.success(response.data);
//       //     // } catch (error) {
//       //     //     toast.error('Process Payment failed');
//       //     // }
//       // }
//   };
//   const [sdk, setSdk] = useState(false);
//   const [valuePayment, setValuePayment] = useState('');
//   const [VNPaypayment, setVNPayPayment] = useState(false);
//   const [PayPalpayment, setPayPalPayment] = useState(false);
//   const [optionPayment, setOptionPayment] = useState('');

//   const handlevaluePaymentChange = (e) => {
//       setValuePayment(e.target.value);
//       if (e.target.value === 'paypal') {
//           setPayPalPayment(true);
//           setVNPayPayment(false);
//           setOptionPayment('PAYPAL');
//       }
//       if (e.target.value === 'VNPay') {
//           setVNPayPayment(true);
//           setPayPalPayment(false);
//           setOptionPayment('VNPAY');
//       }
//       if (e.target.value === 'ZaloPay' && valuePayment !== ' ') {
//           toast.warning('hệ thống đang bảo trì');
//           setVNPayPayment(false);
//           setPayPalPayment(false);
//       }
//       console.log(optionPayment);
//   };
