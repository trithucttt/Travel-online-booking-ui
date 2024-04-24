import styles from './TourCart.module.scss';
import { useEffect, useState } from 'react';
import TourCard from './TourCard';
import apiService from '../../../../Components/ApiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Tour({ ownerId, ownerTour }) {
    // console.log(ownerTour);
    const [searchValue, setSearchValue] = useState('');
    // console.log('tour get userId', ownerId);
    const [tours, setTours] = useState();
    const fetchTour = async () => {
        const data = await apiService.request('get', `tour/${ownerId}`);
        setTours(data);
    };

    useEffect(() => {
        fetchTour();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className={styles.search}>
                <input
                    className={styles.searchItem}
                    value={searchValue}
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className={styles.tourContainer}>
                {tours && tours.map((tour, index) => <TourCard tour={tour} index={index} key={index} />)}
            </div>
        </>
    );
}

export default Tour;
/**
 *  const tours = [
        {
            image: 'faImage',
            name: 'Discover Mountains',
            dayTour: 3,
            startDay: '2024-01-12',
            endDay: '2024-01-15',
            description: 'Exploring high mountains',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.8,
            totalReview: 120,
            quantity: 15,
            price: 300,
        },
        {
            image: 'faImage',
            name: 'Beach Paradise',
            dayTour: 5,
            startDay: '2024-02-20',
            endDay: '2024-02-25',
            description: 'Relax on sunny beaches',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.7,
            totalReview: 200,
            quantity: 20,
            price: 500,
        },
        {
            image: 'faImage',
            name: 'Historical Europe',
            dayTour: 7,
            startDay: '2024-03-05',
            endDay: '2024-03-12',
            description: 'A journey through history',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.6,
            totalReview: 150,
            quantity: 10,
            price: 700,
        },
        {
            image: 'faImage',
            name: 'African Safari',
            dayTour: 10,
            startDay: '2024-04-10',
            endDay: '2024-04-20',
            description: 'Adventure in the wild',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.9,
            totalReview: 180,
            quantity: 8,
            price: 1000,
        },
        {
            image: 'faImage',
            name: 'The Great Outback',
            dayTour: 6,
            startDay: '2024-05-15',
            endDay: '2024-05-21',
            description: 'Outback adventure',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.5,
            totalReview: 160,
            quantity: 12,
            price: 600,
        },
        {
            image: 'faImage',
            name: 'Asian Culture',
            dayTour: 4,
            startDay: '2024-06-08',
            endDay: '2024-06-12',
            description: 'Experience the orient',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.3,
            totalReview: 110,
            quantity: 20,
            price: 400,
        },
        {
            image: 'faImage',
            name: 'Amazon Expedition',
            dayTour: 8,
            startDay: '2024-07-22',
            endDay: '2024-07-30',
            description: 'Journey through the rainforest',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.7,
            totalReview: 90,
            quantity: 6,
            price: 800,
        },
        {
            image: 'faImage',
            name: 'Arctic Adventure',
            dayTour: 9,
            startDay: '2024-08-18',
            endDay: '2024-08-27',
            description: 'Explore the Arctic',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.9,
            totalReview: 75,
            quantity: 5,
            price: 900,
        },
        {
            image: 'faImage',
            name: 'Mediterranean Cruise',
            dayTour: 12,
            startDay: '2024-09-01',
            endDay: '2024-09-13',
            description: 'Cruise the Mediterranean sea',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.4,
            totalReview: 140,
            quantity: 18,
            price: 1200,
        },
        {
            image: 'faImage',
            name: 'New Zealand Adventure',
            dayTour: 7,
            startDay: '2024-10-05',
            endDay: '2024-10-12',
            description: 'Discover the land of Kiwis',
            destination: [
                {
                    id: 1,
                    destination: 'Himalayas',
                },
                {
                    id: 2,
                    destination: 'Maldives',
                },
                {
                    id: 3,
                    destination: 'Europe',
                },
                {
                    id: 4,
                    destination: 'Australia',
                },
            ],
            avgRating: 4.6,
            totalReview: 130,
            quantity: 10,
            price: 700,
        },
    ];
 */
