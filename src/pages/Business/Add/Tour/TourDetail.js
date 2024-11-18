import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { routeKey } from '../../../../Components/pathName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import apiService from '../../../../Components/ApiService';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';

const TourDetail = ({ isOpen, onRequestClose, tour }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [imageIndexSelected, setImageIndexSelected] = useState(0);
    if (!isOpen) return null;
    const getRole = localStorage.getItem('role') || null;
    const getToken = localStorage.getItem('token') || null;

    // Check if button should be disabled based on role or login status
    const isAddToCartDisabled = getRole === 'BUSINESS' || null;

    // Handle changes in quantity input;

    // Function to handle Add to Cart button click
    const handleAddToCart = async () => {
        if (getToken === null) {
            const confirm = await Swal.fire({
                icon: 'warning',
                title: 'Đăng nhập yêu cầu',
                text: 'Vui lòng đăng nhập để thêm vào giỏ hàng!',
                confirmButtonText: 'OK',
                confirmButtonColor: 'green',
                cancelButtonText: 'Hủy',
                showCancelButton: true,
                cancelButtonColor: 'red',
            });

            // Navigate only if OK is clicked
            if (confirm.isConfirmed) {
                navigate(routeKey.login);
            }
        } else {
            // Logic to add to cart with selected quantity (if logged in)
            const cartItem = { tourId: tour.tour_id, quantity };
            console.log('Added to cart:', cartItem);
            setIsLoading(true);
            // Call API to add to cart here if needed
            try {
                const headers = {
                    Authorization: `Bearer ${getToken}`,
                };
                const data = await apiService.request('post', 'cart/add', cartItem, headers);
                if (data.responseCode === '200') {
                    swal('Thành công', 'Đã thêm chuyến đi vào giỏ hàng của bạn', 'success');
                } else {
                    swal('Lỗi', 'Có lỗi xảy ra khi thêm chuyến đi vào giỏ hàng' + data.message, 'error');
                }
            } catch (error) {
                swal('Lỗi', 'Lỗi từ máy chủ' + error, 'error');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 flex z-100 items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl w-full mx-auto relative max-h-dvh overflow-y-auto">
                <h1 className="text-5xl font-bold text-center text-blue-600 mb-4">{tour?.titleTour}</h1>
                <p className="text-lg text-center text-gray-600 mb-4">Công ty: {tour?.companyTour}</p>

                {/* Main Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={tour?.imageTour[imageIndexSelected]}
                        alt={tour?.titleTour}
                        className="w-full h-96 object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                    />
                </div>

                {/* Image List */}
                <h2 className="text-3xl font-semibold text-blue-500 mb-2 text-center">Hình ảnh khác</h2>
                <div className="flex overflow-x-auto mb-4">
                    {tour?.imageTour.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            onClick={() => setImageIndexSelected(index)}
                            alt={`Tour Images ${index + 1}`}
                            className="w-32 h-32 object-cover rounded-lg shadow-lg mr-2 transition-transform duration-300 transform hover:scale-105"
                        />
                    ))}
                </div>

                {/* Tour Description */}
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold text-blue-500 mb-2">Mô tả</h2>
                    <p className="text-gray-700">{tour?.description}</p>
                </div>

                {/* Price and Timing */}
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold text-blue-500 mb-2">Giá</h2>
                    <p className="text-lg text-gray-800">Giá: {tour?.price.toLocaleString()} VND</p>
                    <p className="text-lg text-red-600">
                        Giảm giá {tour.discount * 100}% còn: {(tour?.price * (1 - tour?.discount)).toLocaleString()} VND
                    </p>
                    <p className="text-gray-600">
                        Thời gian: {new Date(tour?.startTime).toLocaleDateString()} -{' '}
                        {new Date(tour?.endTime).toLocaleDateString()}
                    </p>
                </div>

                {/* Rating */}
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold text-blue-500 mb-2">Đánh giá</h2>
                    <div className="flex items-center mb-4">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-8 w-8 ${
                                    index < Math.round(tour?.ratingDto) ? 'text-yellow-500' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.5 3 2-6.5L0 7.5l6.5-.5L10 1l3.5 6 6.5.5-4.5 4.5 2 6.5z" />
                            </svg>
                        ))}
                        <span className="ml-2 text-gray-600">
                            ({tour?.ratingDto ? tour?.ratingDto : 'Chưa có đánh giá'})
                        </span>
                    </div>
                </div>

                {/* Destinations List */}
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold text-blue-500 mb-2">Điểm đến</h2>
                    <ul className="grid grid-cols-2 gap-4">
                        {tour?.destiationDtoList.map((destination) => (
                            <li key={destination.desId} className="mb-4 bg-gray-50 p-4 rounded-lg shadow-md">
                                <h3 className="font-semibold text-lg mb-2">{destination.desName}</h3>
                                <img
                                    src={`http://localhost:8086/api/destination/${destination.desId}/image`}
                                    alt={destination.desName}
                                    className="w-full h-32 object-cover rounded-lg mb-2"
                                />
                                <p className="text-gray-700 mb-1">{destination.desAddress}</p>
                                <p className="text-gray-600">
                                    {' '}
                                    {destination.description.length > 300
                                        ? `${destination.description.substring(0, 300)}...`
                                        : destination.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Số lượng</label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setQuantity(quantity - 1)}
                            className="px-3 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                            disabled={quantity <= 1}
                        >
                            <FontAwesomeIcon icon={faMinus} size={'xs'} />
                        </button>
                        <p className="w-16 text-center text-black border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium">
                            {quantity}
                        </p>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                            disabled={quantity >= tour?.quantityTour}
                        >
                            <FontAwesomeIcon icon={faPlus} size={'xs'} />
                        </button>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-6">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAddToCartDisabled}
                        className={`w-full flex items-center justify-center gap-2 py-3 text-xl font-bold rounded-lg transition ${
                            isAddToCartDisabled
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                        title={isAddToCartDisabled ? 'Không thể thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} size={'xs'} />
                        Thêm vào giỏ hàng
                    </button>
                </div>

                {/* Close Modal Button */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onRequestClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Đóng
                    </button>
                </div>
            </div>
            <LoadingPopup isLoading={isLoading} />
        </div>
    );
};

export default TourDetail;
