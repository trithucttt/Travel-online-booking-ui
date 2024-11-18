import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import apiService from '../../../../Components/ApiService';
import validatePostData from './validatePostData';
import swal from 'sweetalert';

function AddPost() {
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
    const [newPost, setNewPost] = useState({
        titlePost: '',
        endDay: getEndDay(),
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const data = await apiService.request('get', 'business/tours', null, headers);
                setTour(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTour();
    }, []);

    const handleValuePostChange = (e, fieldName) => {
        const { value } = e.target;
        setNewPost((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const handleAddTour = () => {
        const selectTour = tour.find((t) => t.id === Number.parseInt(newPost.tourId));
        if (selectTour) {
            const isTourExist = listTour.some((tourItem) => tourItem.id === selectTour.id);
            if (!isTourExist) {
                const newListTour = {
                    id: selectTour.id,
                    title: selectTour.title,
                };
                const updatedListTour = [...listTour, newListTour];

                setListTour(updatedListTour);
                const tourIds = listTour.map((tourItem) => tourItem.id);
                setNewPost((prevValues) => ({
                    ...prevValues,
                    tourId: tourIds,
                }));
            } else {
                swal('Tour already exists', '', 'warning');
            }
        }
    };

    const handleRemoveTour = (tourId) => {
        const updatedListTour = listTour.filter((tour) => tour.id !== tourId);
        setListTour(updatedListTour);
        setNewPost((prevValues) => ({
            ...prevValues,
            tourId: updatedListTour,
        }));
    };

    const handleSavePost = async () => {
        try {
            const validateErrors = validatePostData(newPost, listTour);
            setErrors(validateErrors);
            if (Object.keys(validateErrors).length === 0) {
                const tourIds = listTour.map((tourItem) => tourItem.id);
                const addPostRequest = {
                    ...newPost,
                    tourId: tourIds,
                };
                const data = await apiService.request('post', 'business/post/save', addPostRequest, headers);
                if (data.responseCode === '200') {
                    swal('Success', data.message, 'success');
                    setNewPost({
                        titlePost: '',
                        endDay: getEndDay(),
                        tourId: '',
                    });
                    setListTour([]);
                } else {
                    swal('Failed', data.message, 'error');
                }
            }
            // const tourIds = listTour.map((tourItem) => tourItem.id);

            // const updatedPost = {
            //     ...newPost,
            //     tourId: tourIds,
            // };
            // console.log(updatedPost);
        } catch (error) {
            swal('Lỗi!!', 'Máy chủ không phản hồi', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title Post:</label>
                <input
                    type="text"
                    value={newPost.titlePost}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter title post"
                    onChange={(e) => handleValuePostChange(e, 'titlePost')}
                />
                {errors.titlePost && <div className="text-red-500">{errors.titlePost}</div>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">End Time Post:</label>
                <input
                    type="datetime-local"
                    value={newPost.endDay}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => handleValuePostChange(e, 'endDay')}
                />
                {errors.endDay && <div className="text-red-500">{errors.endDay}</div>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Choose Tour:</label>
                <div className="flex">
                    <select
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={newPost.tourId}
                        onChange={(e) => handleValuePostChange(e, 'tourId')}
                    >
                        <option value="">Select tour</option>
                        {tour.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <button
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={handleAddTour}
                    >
                        Add Tour
                    </button>
                </div>
                {errors.tourId && <div className="text-red-500">{errors.tourId}</div>}
            </div>

            {listTour.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Selected Tours:</h3>
                    <ul className="space-y-2">
                        {listTour.map((t, index) => (
                            <li key={index} className="flex justify-between items-center p-2 border rounded-lg">
                                <span>{t.title}</span>
                                <FontAwesomeIcon
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => handleRemoveTour(t.id)}
                                    icon={faX}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="text-right">
                <button
                    onClick={handleSavePost}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default AddPost;
