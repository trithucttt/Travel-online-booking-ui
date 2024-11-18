// validate.js
function validatePostData(newPost, listTour) {
    function checkInteger(value) {
        const regex = /^\d+$/;
        return regex.test(value);
    }
    let errors = {};

    if (!newPost.titlePost.trim()) {
        errors.titlePost = 'Title is required';
    }

    if (typeof newPost.tourId === 'string' && !newPost.tourId.trim()) {
        errors.tourId = 'Tour is required';
    }

    // listTour.forEach((tour, index) => {
    //     let tourErrors = {};

    //     if (!tour.quantity) {
    //         errors[`tour_${index}_quantity`] = 'Quantity is required.';
    //     } else if (!checkInteger(tour.quantity)) {
    //         errors[`tour_${index}_quantity`] = 'Quantity must be an integer';
    //     } else if (tour.quantity < 10 || tour.quantity > 20) {
    //         errors[`tour_${index}_quantity`] = 'Quantity must be an integer between 10 and 20.';
    //     }

    //     if (!tour.discount) {
    //         errors[`tour_${index}_discount`] = 'Discount is required.';
    //         // }
    //         // else if (!Number.isInteger(tour.discount)) {
    //         //     errors[`tour_${index}_discount`] = 'Discount must be an integer and not null.';
    //     } else if (tour.discount >= 100 || tour.discount <= 0) {
    //         errors[`tour_${index}_discount`] = 'Discount must be integer and between 0 and 99';
    //     }

    //     if (!tour.dayTour) {
    //         errors[`tour_${index}_dayTour`] = 'Day Tour is required.';
    //     } else if (!checkInteger(tour.dayTour)) {
    //         errors[`tour_${index}_dayTour`] = 'Day Tour must be an integer';
    //     } else if (tour.dayTour > 5 || tour.dayTour <= 1) {
    //         errors[`tour_${index}_dayTour`] = 'Day Tour must be integer and between 1 and 5';
    //     }

    //     if (Object.keys(tourErrors).length > 0) {
    //         errors[`tour-${index}`] = tourErrors;
    //     }
    // });
    const getToDay = () => {
        const today = new Date();

        const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, 10);
    };

    const today = getToDay();
    const startDay = new Date(newPost.startDay);
    const endDay = new Date(newPost.endDay);

    const todayDate = new Date(today);
    todayDate.setHours(0, 0, 0, 0);

    if (startDay < todayDate) {
        errors.startDay = 'Start time cannot be in the past';
    }

    const minEndDate = startDay;
    minEndDate.setMonth(minEndDate.getMonth() + 2);
    minEndDate.setHours(0, 0, 0, 0);

    if (endDay < minEndDate) {
        errors.endDay = 'End time must be at least 30 days after start day';
    }

    return errors;
}

export default validatePostData;
