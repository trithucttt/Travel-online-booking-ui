const Validation = ({ username, password }) => {
    const errors = {};

    // Validate username
    if (username.trim() === '') {
        errors.username = 'Username cannot be empty';
    }

    // Validate password
    if (password.trim() === '') {
        errors.password = 'Password cannot be empty';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
};
export default Validation;
