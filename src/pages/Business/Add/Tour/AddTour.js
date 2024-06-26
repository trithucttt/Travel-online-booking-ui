import styles from './AddTour.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import apiService from '../../../../Components/ApiService';
import validateTourData from './vadilationTour';
import swal from 'sweetalert';
function Add() {
    const [listDestination, setListDestination] = useState([]);
    const [destination, setDestination] = useState([]);
    const [errors, setErrors] = useState({});
    const [listDesErrors, setLisDesError] = useState(false);
    const [inputKey] = useState(Date.now());
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [newTour, setNewTour] = useState({
        image: '',
        titleTour: '',
        description: '',
        destinationId: '',
        price: '',
    });

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const data = await apiService.request('get', 'business/destination', null, headers);
                // console.log(data);
                setDestination(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDestination();
    }, []);

    const handleValueToursChange = (e, fieldName) => {
        const { value } = e.target;
        // console.log(`Updating ${fieldName} to ${value}`);
        setNewTour((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
        // console.log(newTour);
    };
    const handleAddDestination = () => {
        const selectDestination = destination.find((t) => t.id === Number.parseInt(newTour.destinationId));
        // console.log(selectDestination);
        if (selectDestination) {
            // kiem tra ton tai
            const isTourExist = listDestination.some((destination) => destination.id === selectDestination.id);
            if (!isTourExist) {
                const newListDestination = {
                    id: selectDestination.id,
                    name: selectDestination.name,
                };
                setListDestination((pre) => [...pre, newListDestination]);
            } else {
                alert('Tour is ready exist');
            }
        }
        // setNewTour((prevTour) => {
        //     const updatedDestinationIds = Array.from(new Set([...prevTour.destinationId, ...listDestination]));
        //     return {
        //         ...prevTour,
        //         destinationId: updatedDestinationIds,
        //     };
        // });
        // console.log(listDestination);
        // console.log(newTour);
    };
    const handleRemoveTour = (destinationId) => {
        // console.log(listTour);
        // alert(destinationId);
        setListDestination((pre) => pre.filter((tour) => tour.id !== destinationId));
    };

    const handleSaveTour = async () => {
        const validateErrors = validateTourData(newTour, listDestination);
        console.log(validateErrors);
        setLisDesError(true);
        if (Object.keys(validateErrors).length === 0) {
            console.log('No validation Error', newTour);
            const formData = new FormData();
            formData.append('titleTour', newTour.titleTour);
            formData.append('price', newTour.price);
            formData.append('description', newTour.description);
            formData.append('image', newTour.image);

            if (listDestination && listDestination.length > 0) {
                const filterDestinationId =
                    listDestination &&
                    listDestination?.filter((item) => typeof item === 'object' && item.id).map((item) => item.id);
                filterDestinationId.forEach((id) => {
                    formData.append('destinationId', id);
                });
            }
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const data = await apiService.request('post', 'business/tour/save', formData, headers);
            if (data.responseCode === '200') {
                // swal('OK!', 'Your comment has been Edited!', 'success');
                swal('OK!', 'Create New Tour Successfully', 'success');
                console.log(data.message);
                setNewTour({
                    image: '',
                    price: '',
                    titleTour: '',
                    destinationId: '',
                    description: '',
                });
                setImagePreviewUrl('');
                setListDestination('');
            } else {
                swal('Error!', 'Create New Tour Failed', 'error');
                console.log(data.message);
            }
        } else {
            setErrors(validateErrors);
        }
    };

    const handleChangeImage = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setNewTour((pre) => ({
            ...pre,
            image: selectedFile,
        }));
        setImagePreviewUrl(URL.createObjectURL(selectedFile));
    };
    return (
        <div className={styles.container}>
            <div className={styles.formGroupTitle}>
                <label className={styles.labelTitle}>Title Tour:</label>
                <input
                    type="text"
                    value={newTour.titleTour}
                    className={`${styles.inputInfo} ${styles.inputTitle}`}
                    placeholder="Enter title Tour"
                    name="titleTour"
                    onChange={(e) => handleValueToursChange(e, 'titleTour')}
                />
            </div>
            {errors.titleTour && <div className={styles.error}>{errors.titleTour}</div>}
            <div className={styles.formGroupDate}>
                <div className={styles.startDay}>
                    <label className={styles.labelStartDay}>Description:</label>
                    <textarea
                        className={`${styles.inputInfo} ${styles.inputStartDay}`}
                        value={newTour.description}
                        placeholder="Enter description Tour"
                        onChange={(e) => handleValueToursChange(e, 'description')}
                    />
                </div>
                {errors.description && <div className={styles.error}>{errors.description}</div>}
                <div className={styles.endDay}>
                    <label className={styles.labelStartDay}>Price:</label>
                    <input
                        type="number"
                        value={newTour.price}
                        name="price"
                        placeholder="Enter price Tour"
                        className={`${styles.inputInfo} ${styles.inputEndDay}`}
                        onChange={(e) => handleValueToursChange(e, 'price')}
                    />
                </div>
                {errors.price && <div className={styles.error}>{errors.price}</div>}
                {imagePreviewUrl && (
                    <div className={styles.formGroupDate}>
                        {/* anh duoc chon hien thi ơ day */}
                        <div>
                            {imagePreviewUrl && (
                                <img className={styles.imageUpload} src={imagePreviewUrl} alt="Preview" />
                            )}
                        </div>
                    </div>
                )}
                <div className={styles.endDay}>
                    <label className={styles.labelStartDay}>Image:</label>
                    <input
                        type="file"
                        key={inputKey}
                        className={`${styles.inputInfo} ${styles.inputEndDay}`}
                        onChange={handleChangeImage}
                    />
                    {/* <button onClick={handleReset}>Reset</button> */}
                </div>
                {errors.image && <div className={styles.error}>{errors.image}</div>}
            </div>
            <div className={styles.formGroupTour}>
                <div>
                    <label className={styles.labelselectDestination}>Chose Destination: </label>
                    <select
                        className={styles.selectDestination}
                        value={newTour.destinationId}
                        onChange={(e) => handleValueToursChange(e, 'destinationId')}
                    >
                        <option value="" className={styles.optionTour}>
                            Select Destination
                        </option>
                        {destination.map((item, index) => (
                            <option key={index} value={item.id} className={styles.optionTour}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {listDestination.length <= 0 && listDesErrors && (
                        <div className={styles.error}>Destination is required</div>
                    )}
                </div>

                <button className={styles.btnAddTour} onClick={handleAddDestination}>
                    Add Destination
                </button>
                {listDestination.length > 0 && (
                    <div className={styles.groupInfoTourAdd}>
                        <h3>Tour:</h3>
                        <ul>
                            {listDestination.map((t, index) => (
                                <li key={index} className={styles.inFoRoom}>
                                    <p className={styles.tourNameAdd}>Destination Name: {t.name}</p>
                                    <FontAwesomeIcon
                                        className={styles.iconDeleteTour}
                                        onClick={() => handleRemoveTour(t.id)}
                                        icon={faX}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {/* <div className={styles.formGroupDiscount}>
                <label className={styles.labelDiscount}>Discount Post:</label>
                <div className={styles.controlDiscount}>
                    <FontAwesomeIcon
                        className={styles.iconMinus}
                        icon={faMinus}
                        onClick={() => handleQuantityChange(false)}
                    />
                    <input value={quantity} type="number" className={styles.inputDiscount} readOnly />
                    <FontAwesomeIcon
                        icon={faPlus}
                        className={styles.iconPlus}
                        onClick={() => handleQuantityChange(true)}
                    />
                </div>
            </div> */}
            <div className={styles.groupButton}>
                <button onClick={handleSaveTour} className={styles.btnSave}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default Add;
