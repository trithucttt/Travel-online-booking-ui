import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
import TourDetail from '../../../Business/Add/Tour/TourDetail';
import { Tooltip } from 'react-tooltip';

const Tour = ({ tours }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const [tours, setTours] = useState(toursJson);

    const [openTourIndexLightBox, setOpenTourIndexLightBox] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTourId, setSelectedTourId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTourId(null);
    };
    const openLightbox = (imageIndex, tourId) => {
        setCurrentImageIndex(imageIndex);
        setOpenTourIndexLightBox(tourId);
        setLightboxOpen(true);
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
            {tours?.map((tour, tourIndex) => (
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
                        <h2
                            className="text-2xl font-bold cursor-pointer"
                            data-tooltip-id="title-click-details"
                            data-tooltip-place="top"
                            data-tooltip-content="Click to see details "
                            onClick={() => openModalDetail(tour)}
                        >
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
                            {/* Updated logic */}
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
                                        setOpenTourIndexLightBox(tourIndex); // Updated key
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

            <LoadingPopup isLoading={loading} />
            <TourDetail onRequestClose={closeModalDetail} isOpen={isModalDetailOpen} tour={selectedTour} />
            <Tooltip id="title-click-details" />
        </div>
    );
};

export default Tour;
