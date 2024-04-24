function validateDestinationData(newDestination) {
    let errors = {};
    if (!newDestination.destinationName.trim()) {
        errors.destinationName = 'Destination Name is required';
    }
    if (!newDestination.description.trim()) {
        errors.description = 'Description Name is required';
    }
    if (typeof newDestination.wardId === 'string' && !newDestination.wardId.trim()) {
        errors.wardId = 'Ward is required';
    }
    if (!newDestination.address.trim()) {
        errors.address = 'Address is required';
    }
    if (!newDestination.image || typeof newDestination.image.length <= 0) {
        errors.image = 'Please select a image.';
    }
    if (newDestination.image?.size > 5 * 1024 * 1024) {
        errors.image = 'File size should not exceed 5MB.';
    }
    return errors;
}
export default validateDestinationData;
