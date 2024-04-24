const Validation = (changePass) => {
    const errors = {};
    // biểu thức chính quy
    // (?=.*[a-z]): Đảm bảo có ít nhất một chữ cái thường.
    // (?=.*[A-Z]): Đảm bảo có ít nhất một chữ cái hoa.
    // (?=.*\d): Đảm bảo có ít nhất một chữ số.
    // (?=.*[@$!%*?&]): Đảm bảo có ít nhất một ký tự đặc biệt từ tập các ký tự đặc biệt cho trước.
    // [A-Za-z\d@$!%*?&]{6,}: Mật khẩu phải có ít nhất 6 ký tự từ các nhóm được cho phép này.

    if (changePass.oldPass.trim() === '') {
        errors.oldPass = 'Old Password cannot be empty';
    }
    //  else if (changePass.oldPass.length < 6) {
    //     errors.oldPass = 'Old Password must be at least 6 characters long';
    // } else {
    //     // Biểu thức chính quy kiểm tra chữ hoa, chữ thường, số và ký tự đặc biệt
    //     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    //     if (!passwordPattern.test(changePass.oldPass)) {
    //         errors.oldPass =
    //             'Old password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    //     }
    // }

    if (changePass.newPass.trim() === '') {
        errors.newPass = 'New Password cannot be empty';
    } else if (changePass.newPass.length < 6) {
        errors.newPass = 'New Password must be at least 6 characters long';
    } else {
        // Biểu thức chính quy kiểm tra chữ hoa, chữ thường, số và ký tự đặc biệt
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordPattern.test(changePass.newPass)) {
            errors.newPass =
                'New Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
        if (changePass.newPass === changePass.oldPass) {
            errors.newPass = 'New password must not be the same as the old password';
        }
    }
    if (changePass.confirmPass.trim() === '') {
        errors.confirmPass = 'Confirm Password cannot be empty';
    } else if (changePass.confirmPass !== changePass.newPass) {
        errors.confirmPass = 'Confirm Password does not match';
    }

    return errors;
};
export default Validation;
