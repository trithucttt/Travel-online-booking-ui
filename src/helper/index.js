// Tạo một đối tượng định dạng số với tiêu chuẩn quốc tế
export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency', // Xác định kiểu định dạng là tiền tệ
    currency: 'VND', // Xác định loại tiền tệ là VND (Vietnamese đồng)
});
// là một phần của react bootstrap
