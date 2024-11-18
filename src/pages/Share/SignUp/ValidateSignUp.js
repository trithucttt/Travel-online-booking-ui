function validateFields(fields) {
    const errors = {};

    // Validate lastName
    if (!fields.lastName.trim()) {
        errors.lastName = 'Last name is required.';
    }

    // Validate firstName
    if (!fields.firstName.trim()) {
        errors.firstName = 'First name is required.';
    }

    // Validate username
    if (!fields.username.trim()) {
        errors.username = 'Username is required.';
    } else if (fields.username.length < 4) {
        errors.username = 'Username must be at least 4 characters long.';
    }

    // Validate email using a simple email regex
    if (!fields.email) {
        errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
        errors.email = 'Email address is invalid.';
    }

    // Validate password using a regex for complexity
    if (!fields.password) {
        errors.password = 'Password is required.';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(fields.password)) {
        errors.password =
            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    // Validate confirmPass
    if (!fields.confirmPass) {
        errors.confirmPass = 'Confirming password is required.';
    } else if (fields.password !== fields.confirmPass) {
        errors.confirmPass = 'Passwords do not match.';
    }

    // Validate role
    if (!fields.role) {
        errors.role = 'Role selection is required.';
    }

    return errors;
}

export default validateFields;
