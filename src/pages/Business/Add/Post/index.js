import styles from './AddPost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import apiService from '../../../../Components/ApiService';
import validatePostData from './validatePostData';
import swal from 'sweetalert';
function AddPost() {
    const getToDay = () => {
        const today = new Date();
        const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, 16);
    };
    const getEndDay = () => {
        const today = new Date();
        const endDate = new Date(today.setMonth(today.getMonth() + 2));
        const localEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000);
        return localEndDate.toISOString().slice(0, 16);
    };
    const [listTour, setListTour] = useState([]);
    const [tour, setTour] = useState([]);
    const token = localStorage.getItem('token') || null;
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const [, setListTourError] = useState(false);
    const [newPost, setNewPost] = useState({
        titlePost: '',
        startDay: getToDay(),
        endDay: getEndDay(),
        tourId: '',
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const data = await apiService.request('get', 'business/tours', null, headers);
                // console.log(data);
                setTour(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTour();
    }, []);

    const handleValuePostChange = (e, fieldName) => {
        const { value } = e.target;
        // console.log(`Updating ${fieldName} to ${value}`);
        setNewPost((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
        // console.log(newPost);
    };

    const handleAddTour = () => {
        const selectTour = tour.find((t) => t.id === Number.parseInt(newPost.tourId));
        // console.log(selectTour);
        if (selectTour) {
            // kiem tra ton tai
            const isTourExist = listTour.some((tourItem) => tourItem.id === selectTour.id);
            if (!isTourExist) {
                const newListTour = {
                    id: selectTour.id,
                    title: selectTour.title,
                    quantity: 0,
                    discount: 0.0,
                    dayTour: 0,
                };
                // console.log('newListTour', newListTour);
                setListTour((pre) => [...pre, newListTour]);
                // console.log('listTour', listTour);
            } else {
                alert('Tour is ready exist');
            }
        }

        // setNewPost((pre) => ({
        //     ...pre,
        //     tourId: listTour,
        // }));
    };

    const handleTourDetail = (index, fieldName, value) => {
        const updateTour = listTour.map((tour, i) => {
            if (i === index) {
                return { ...tour, [fieldName]: value };
            }
            return tour;
        });
        setListTour(updateTour);
    };

    const handleRemoveTour = (tourId) => {
        setListTour((pre) => pre.filter((tour) => tour.id !== tourId));
    };
    const handleSavePost = async () => {
        const validateErrors = validatePostData(newPost, listTour);
        console.log(validateErrors);
        setListTourError(true);
        if (Object.keys(validateErrors).length === 0) {
            // console.log('No validation newPost', newPost);
            // console.log('No validation listTour', listTour);

            const tourData = listTour?.map((tourItem) => ({
                tourId: tourItem.id,
                quantity: parseInt(tourItem.quantity),
                discount: parseFloat(tourItem.discount),
                dayTour: parseInt(tourItem.dayTour),
            }));
            const addPostRequest = {
                titlePost: newPost.titlePost,
                startTimePost: newPost.startDay,
                endTimePost: newPost.endDay,
                addPostTourRequests: tourData,
            };
            console.table('No validation addPostRequest', addPostRequest);
            const data = await apiService.request('post', 'business/post/save', addPostRequest, headers);
            if (data.responseCode === '200') {
                swal('Success', data.message, 'success');
                setNewPost({
                    titlePost: '',
                    startTimePost: getToDay(),
                    endTimePost: getEndDay(),
                    tourId: '',
                });
                setListTour('');
            } else {
                swal('Failed', data.message, 'error');
            }
        } else {
            setErrors(validateErrors);
        }
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.formGroupTitle}>
                    <label className={styles.labelTitle}>Title Post:</label>
                    <input
                        type="text"
                        value={newPost.titlePost}
                        className={`${styles.inputInfo} ${styles.inputTitle}`}
                        placeholder="Enter title post"
                        name="titlePost"
                        onChange={(e) => handleValuePostChange(e, 'titlePost')}
                    />
                </div>
                {errors.titlePost && <div className={styles.error}>{errors.titlePost}</div>}
                <div className={styles.formGroupDate}>
                    <div className={styles.startDay}>
                        <label className={styles.labelStartDay}>Start Time Post:</label>
                        <input
                            type="datetime-local"
                            value={newPost.startDay}
                            className={`${styles.inputInfo} ${styles.inputStartDay}`}
                            onChange={(e) => handleValuePostChange(e, 'startDay')}
                            name="startDay"
                        />
                    </div>
                    {errors.startDay && <div className={styles.error}>{errors.startDay}</div>}
                    <div className={styles.endDay}>
                        <label className={styles.labelStartDay}>End Time Post:</label>
                        <input
                            type="datetime-local"
                            value={newPost.endDay}
                            className={`${styles.inputInfo} ${styles.inputEndDay}`}
                            onChange={(e) => handleValuePostChange(e, 'endDay')}
                        />
                    </div>
                    {errors.endDay && <div className={styles.error}>{errors.endDay}</div>}
                </div>
                <div className={styles.formGroupTour}>
                    <div>
                        <label className={styles.labelSelectTour}>Chose Tour: </label>
                        <select
                            className={styles.selectTour}
                            value={newPost.tourId}
                            onChange={(e) => handleValuePostChange(e, 'tourId')}
                        >
                            <option value="" className={styles.optionTour}>
                                Select tour
                            </option>
                            {tour.map((item, index) => (
                                <option key={index} value={item.id} className={styles.optionTour}>
                                    {item.title}
                                </option>
                            ))}
                        </select>
                        {errors.tourId && <div className={styles.error}>{errors.tourId}</div>}
                    </div>
                    <button className={styles.btnAddTour} onClick={handleAddTour}>
                        Add tour
                    </button>
                    {listTour.length > 0 && (
                        <div className={styles.groupInfoTourAdd}>
                            <h3>Tour:</h3>
                            <ul>
                                {listTour.map((t, index) => (
                                    <li key={index}>
                                        <div className={styles.inFoRoom}>
                                            <p className={styles.tourNameAdd}>Tour Name: {t.title}</p>
                                            <FontAwesomeIcon
                                                className={styles.iconDeleteTour}
                                                onClick={() => handleRemoveTour(t.id)}
                                                icon={faX}
                                            />
                                        </div>
                                        <div className={styles.detailTour}>
                                            <div className={styles.groupDetailTour}>
                                                <div className={styles.infoDetail}>
                                                    <label>Quantity: </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Quantity"
                                                        name="quantity"
                                                        value={t.quantity}
                                                        onChange={(e) =>
                                                            handleTourDetail(index, 'quantity', e.target.value)
                                                        }
                                                    />
                                                </div>
                                                {errors[`tour_${index}_quantity`] &&
                                                    errors[`tour_${index}_quantity`] && (
                                                        <div className={styles.error}>
                                                            {errors[`tour_${index}_quantity`]}
                                                        </div>
                                                    )}
                                            </div>
                                            <div className={styles.groupDetailTour}>
                                                <div className={styles.infoDetail}>
                                                    <label>Discount: </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Discount"
                                                        name="discount"
                                                        value={t.discount}
                                                        onChange={(e) =>
                                                            handleTourDetail(index, 'discount', e.target.value)
                                                        }
                                                    />
                                                </div>
                                                {errors[`tour_${index}_discount`] && (
                                                    <div className={styles.error}>
                                                        {errors[`tour_${index}_discount`]}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.groupDetailTour}>
                                                <div className={styles.infoDetail}>
                                                    <label>Day Tour: </label>
                                                    <input
                                                        type="number"
                                                        name="dayTour"
                                                        placeholder="Day Tour"
                                                        value={t.dayTour}
                                                        onChange={(e) =>
                                                            handleTourDetail(index, 'dayTour', e.target.value)
                                                        }
                                                    />
                                                </div>
                                                {errors[`tour_${index}_dayTour`] && (
                                                    <div className={styles.error}>
                                                        {errors[`tour_${index}_dayTour`]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={styles.groupButton}>
                    <button onClick={handleSavePost} className={styles.btnSave}>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}

export default AddPost;
