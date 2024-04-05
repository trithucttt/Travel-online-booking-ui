const validateInfo = (info) => {
    const errors = {};

    // Validate first name
    if (!info.firstName.trim()) {
        errors.firstName = 'First name cannot be empty';
    }

    // Validate last name
    if (!info.lastName.trim()) {
        errors.lastName = 'Last name cannot be empty';
    }

    // Validate email
    if (!info.email.trim()) {
        errors.email = 'Email cannot be empty';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
        errors.email = 'Invalid email address';
    }

    // Validate address
    if (!info.address.trim()) {
        errors.address = 'Address cannot be empty';
    }

    return errors;
};

export default validateInfo;
