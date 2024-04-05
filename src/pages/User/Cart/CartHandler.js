import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function CartHandler({ initialTotalPrice, initialCheckAllCart, initialCart }) {
    const [cartItems, setCartItems] = useState(initialCart);
    const [checkAllCart, setCheckAllCart] = useState(initialCheckAllCart);
    const [totalPrice, setToltalPrice] = useState(initialTotalPrice);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            return item.checked ? acc + item.priceTour * item.quantity : acc;
        }, 0);
        setToltalPrice(total);
    }, [cartItems, checkAllCart]);
    const handleCheckItems = (cartId) => {
        // alert(cartId);
        const newCart = cartItems.map((item) => {
            if (item.id === cartId) {
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
    const handleCheckOut = () => {
        if (totalPrice !== 0) {
        } else {
            toast.warning('Payment cannot be made if the item is not available');
        }
    };
    const handleChangeMethodPayment = (value) => {
        alert(value);
    };
    return {
        cartItems,
        checkAllCart,
        totalPrice,
        handleChangeMethodPayment,
        handleCheckAllCart,
        handleCheckItems,
        handleCheckOut,
    };
}
export default CartHandler;
