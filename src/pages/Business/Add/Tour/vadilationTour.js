function validateTour(validateTourData) {
    let errors = {};

    // Hàm lấy ngày hiện tại
    const getToDay = () => {
        const today = new Date();
        const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, 16);
    };

    const currentDate = getToDay();
    // Validate title
    if (!validateTourData?.title?.trim()) {
        errors.title = 'Tiêu đề là bắt buộc';
    }

    // Validate destinationIds (ít nhất phải chọn một điểm đến)
    if (!validateTourData?.destinationIds || validateTourData?.destinationIds?.length === 0) {
        errors.destinationIds = 'Ít nhất một điểm đến là bắt buộc';
    }

    // Validate description
    if (!validateTourData?.description?.trim()) {
        errors.description = 'Mô tả là bắt buộc';
    }

    // Validate price (không được để trống và không được nhỏ hơn 0)
    if (!validateTourData?.price || validateTourData?.price < 0) {
        errors.price = 'Giá là bắt buộc và không được nhỏ hơn 0';
    }

    // Validate image (phải chọn một ảnh)
    if (!validateTourData?.images || validateTourData?.images?.length === 0) {
        errors.images = 'Vui lòng chọn ít nhất một ảnh';
    }

    // Validate discount (phải là số hợp lệ và không âm)
    if (!validateTourData?.discount && (isNaN(validateTourData?.discount) || validateTourData.discount < 0)) {
        errors.discount = 'Giảm giá phải là một số hợp lệ và không được nhỏ hơn 0';
    }

    // Validate startTime (phải sau ngày hiện tại)
    if (validateTourData?.startTime) {
        const startTime = new Date(validateTourData?.startTime);
        if (startTime <= currentDate) {
            errors.startTime = 'Thời gian bắt đầu phải sau ngày hiện tại';
        }
    }

    // Validate endTime (phải sau thời gian bắt đầu)
    if (validateTourData?.endTime) {
        const startTime = new Date(validateTourData?.startTime);
        const endTime = new Date(validateTourData?.endTime);
        if (endTime <= startTime) {
            errors.endTime = 'Thời gian kết thúc phải sau thời gian bắt đầu';
        }
    }

    // Validate quantity (phải là số nguyên dương)
    if (!validateTourData?.quantity || validateTourData.quantity <= 0 || isNaN(validateTourData.quantity)) {
        errors.quantity = 'Số lượng là bắt buộc và phải là số dương';
    }

    return errors;
}

export default validateTour;
