import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import apiService from '../../../../Components/ApiService';

import EditTourForm from './EditTour';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
import TourDetail from './TourDetail';

const Tour = ({ ownerId, checkUser }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    // const [tours, setTours] = useState(toursJson);
    const [isEditing, setIsEditing] = useState(false);
    const [tourIdSelect, setTourIdSelect] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [tours, setTours] = useState([]);
    const [openTourIndexLightBox, setOpenTourIndexLightBox] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTourId, setSelectedTourId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    const fetchTour = async () => {
        const data = await apiService.request('get', `tour/${ownerId}`);
        setTours(data);
        console.log('get tour data', data);
    };

    useEffect(() => {
        fetchTour();
    }, []);

    const handleEditClick = (tourId) => {
        setSelectedTourId(tourId);
        setIsModalOpen(true);
        setDropdownOpen(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTourId(null);
    };
    const openLightbox = (imageIndex, tourId) => {
        setCurrentImageIndex(imageIndex);
        setOpenTourIndexLightBox(tourId);
        setLightboxOpen(true);
    };

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    const handleDeleteTour = async (tourId) => {
        // alert(tourId);
        const confirmed = await swal({
            title: 'Bạn có chắc muốn xóa?',
            text: 'Khi xóa, Bạn sẽ không thể phục hồi lại!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        });

        if (confirmed) {
            try {
                const response = await apiService.request('put', `business/tour/delete/${tourId}`);

                if (response.responseCode === '200') {
                    // Xóa thành công, cập nhật danh sách tour
                    swal('Thành công!', 'Chuyến đi đã được xóa.', 'success');
                    fetchTour();
                } else {
                    // Xóa thất bại
                    swal('Lỗi!', response.message, 'error');
                }
            } catch (error) {
                // Xử lý lỗi khi gọi API
                console.error('Failed to delete tour:', error);
                swal('Error!', 'Xóa chuyến đi thất bại.', 'error');
            }
        }
    };

    const handleSearchTour = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, [800]);
    };

    const openModalDetail = (tour) => {
        setSelectedTour(tour);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
        setSelectedTour(null);
    };
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center my-4">
                <input
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
                    value={searchValue}
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                    onClick={handleSearchTour}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {tours.map((tour, tourIndex) => (
                <div
                    // onClick={() => openModalDetail(tour)}
                    key={tour.tour_id}
                    className="flex bg-gradient-to-r from-blue-400 to-green-400 rounded-lg shadow-lg p-4 m-4 hover:shadow-xl transition-shadow duration-300 text-gray-900 relative"
                >
                    <img
                        src={tour.companyAvatar}
                        alt={tour.companyTour}
                        className="w-16 h-16 rounded-full border-2 border-white mr-4"
                    />
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold" onClick={() => openModalDetail(tour)}>
                            {tour.titleTour}
                        </h2>
                        <p className="text-gray-700">Công ty: {tour.companyTour}</p>
                        <div className="flex items-center my-1">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    className={`w-5 h-5 ${
                                        index < Math.round(tour.ratingDto) ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 .587l3.668 7.431 8.168 1.185-5.898 5.73 1.391 8.116L12 18.896l-7.329 3.855 1.391-8.116-5.898-5.73 8.168-1.185z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-gray-600">({tour.ratingDto || 0})</span> {/* Updated key */}
                        </div>
                        <p className="text-lg font-semibold">
                            {(tour.price * (1 - tour.discount)).toLocaleString()} VND{' '}
                            <span className="line-through text-gray-400">{tour.price.toLocaleString()} VND</span>{' '}
                        </p>
                        <p className="text-gray-700">
                            Thời gian: {new Date(tour.startTime).toLocaleDateString()} -{' '}
                            {new Date(tour.endTime).toLocaleDateString()} {/* Updated keys */}
                        </p>
                        <div className="flex mt-2">
                            {tour.imageTour.slice(0, 4).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`TourImage ${index + 1}`}
                                    className="w-24 h-24 rounded-lg border-2 border-gray-300 mr-2 cursor-pointer"
                                    onClick={() => {
                                        setCurrentImageIndex(index);
                                        setOpenTourIndexLightBox(tourIndex);
                                        setLightboxOpen(true);
                                    }}
                                />
                            ))}
                            {tour.imageTour.length > 4 && (
                                <div
                                    className="w-24 h-24 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer"
                                    onClick={() => {
                                        setCurrentImageIndex(4);
                                        setOpenTourIndexLightBox(tourIndex);
                                        setLightboxOpen(true);
                                    }}
                                >
                                    <span className="text-gray-600 text-2xl">+</span>
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700 mt-2">
                            Điểm đến:{' '}
                            {tour.destiationDtoList
                                .slice(0, 4)
                                .map((dest) => dest.desName)
                                .join(', ')}{' '}
                            {/* Updated key */}
                            {tour.destiationDtoList.length > 4 && (
                                <span className="text-blue-500 cursor-pointer" onClick={() => openModalDetail(tour)}>
                                    {' '}
                                    ...Xem thêm
                                </span>
                            )}
                        </p>
                    </div>
                    {/* Nút ba chấm cho menu dropdown */}
                    {checkUser && (
                        <div className="absolute top-4 right-4">
                            <button className="focus:outline-none" onClick={() => toggleDropdown(tour.tour_id)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-gray-900"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M8 16h8M8 8h8" />
                                </svg>
                            </button>
                            {/* Dropdown */}
                            {dropdownOpen === tour.tour_id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        onClick={() => handleEditClick(tour.tour_id)} // Updated key
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        onClick={() => handleDeleteTour(tour.tour_id)} // Updated key
                                    >
                                        Xóa
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}

            {lightboxOpen && (
                <Lightbox
                    mainSrc={tours[openTourIndexLightBox]?.imageTour[currentImageIndex]} // Updated key
                    nextSrc={
                        tours[openTourIndexLightBox]?.imageTour[
                            (currentImageIndex + 1) % tours[openTourIndexLightBox]?.imageTour.length
                        ]
                    }
                    prevSrc={
                        tours[openTourIndexLightBox]?.imageTour[
                            (currentImageIndex + tours[openTourIndexLightBox]?.imageTour.length - 1) %
                                tours[openTourIndexLightBox]?.imageTour.length
                        ]
                    }
                    onCloseRequest={() => setLightboxOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentImageIndex(
                            (currentImageIndex + tours[openTourIndexLightBox]?.imageTour.length - 1) %
                                tours[openTourIndexLightBox]?.imageTour.length,
                        )
                    }
                    onMoveNextRequest={() =>
                        setCurrentImageIndex((currentImageIndex + 1) % tours[openTourIndexLightBox]?.imageTour.length)
                    }
                />
            )}

            {isModalOpen && <EditTourForm tourId={selectedTourId} onClose={closeModal} />}
            <LoadingPopup isLoading={loading} />
            <TourDetail onRequestClose={closeModalDetail} isOpen={isModalDetailOpen} tour={selectedTour} />
        </div>
    );
};

export default Tour;
