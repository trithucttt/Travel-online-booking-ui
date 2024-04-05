function validateTourData(newTour, listDestination) {
    let errors = {};
    if (!newTour.titleTour.trim()) {
        errors.titleTour = 'Title is required';
    }
    if (listDestination.length < 0) {
        errors.destinationId = 'Destination is required';
    }
    if (!newTour.description.trim()) {
        errors.description = 'Description is required';
    }
    if (!newTour.price.trim() || newTour.price < 0) {
        errors.price = 'Price is required and cannot be less than 0';
    }
    if (!newTour.image || typeof newTour.image.length <= 0) {
        errors.image = 'Please select a image.';
    }
    if (newTour.image?.size > 5 * 1024 * 1024) {
        errors.image = 'File size should not exceed 5MB.';
    }
    return errors;
}
export default validateTourData;
