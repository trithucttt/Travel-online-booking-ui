const validate = (formData) => {
    let errors = {};

    if (!formData.username.trim()) {
        errors.username = 'Username is required';
    }

    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.conformPass) {
        errors.conformPass = 'Confirm Password is required';
    } else if (formData.conformPass !== formData.password) {
        errors.conformPass = 'Passwords do not match';
    }

    return errors;
};

export default validate;
