// QuantityHandler.jsx
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const DetailTourHandler = ({ initialQuantity, maxQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const totalPriceRef = useRef(null);

    const handleMinusQuantity = () => {
        if (quantity < 2) {
            toast.warning('Quantity cannot be less than 1');
        } else {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusQuantity = () => {
        if (quantity > maxQuantity - 1) {
            toast.warning(`Quantity cannot be more than ${maxQuantity}`);
        } else {
            setQuantity(quantity + 1);
        }
    };
    const addToCart = () => {
        const totalPrice = totalPriceRef.current.innerText;
        console.log('Total Price: ', totalPrice);
    };
    return {
        quantity,
        handleMinusQuantity,
        handlePlusQuantity,
        addToCart,
        totalPriceRef,
    };
};

export default DetailTourHandler;
