import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBack = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 relative">
            <button
                onClick={handleBack}
                className={`fixed ${
                    isScrolled ? 'bottom-4 right-4' : 'top-4 left-4'
                } bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300`}
            >
                ← Quay lại
            </button>

            <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Chính Sách Quyền Riêng Tư</h1>
            <p className="mb-4 text-gray-700">
                Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử
                dụng, và bảo vệ thông tin cá nhân của bạn khi sử dụng trang web của chúng tôi.
            </p>

            <h2 className="text-2xl font-bold mb-2 text-blue-500">Thông Tin Chúng Tôi Thu Thập</h2>
            <p className="mb-4 text-gray-700">
                Chúng tôi có thể thu thập các loại thông tin sau đây từ bạn:
                <ul className="list-disc list-inside">
                    <li>Thông tin liên lạc như tên, địa chỉ email, số điện thoại.</li>
                    <li>Thông tin tài khoản người dùng như tên đăng nhập, mật khẩu.</li>
                    <li>Dữ liệu sử dụng trang web, bao gồm thông tin về hoạt động duyệt web của bạn.</li>
                </ul>
            </p>

            <h2 className="text-2xl font-bold mb-2 text-blue-500">Cách Chúng Tôi Sử Dụng Thông Tin</h2>
            <p className="mb-4 text-gray-700">
                Thông tin thu thập được có thể được sử dụng cho các mục đích sau:
                <ul className="list-disc list-inside">
                    <li>Cải thiện trải nghiệm người dùng và cung cấp dịch vụ tốt hơn.</li>
                    <li>Gửi thông báo quan trọng liên quan đến tài khoản hoặc dịch vụ của chúng tôi.</li>
                    <li>Phân tích dữ liệu để hiểu rõ hơn về cách khách hàng sử dụng trang web.</li>
                </ul>
            </p>

            <h2 className="text-2xl font-bold mb-2 text-blue-500">Chia Sẻ Thông Tin</h2>
            <p className="mb-4 text-gray-700">
                Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba ngoại trừ khi cần thiết để cung cấp
                dịch vụ hoặc khi được yêu cầu bởi pháp luật.
            </p>

            <h2 className="text-2xl font-bold mb-2 text-blue-500">Bảo Mật</h2>
            <p className="mb-4 text-gray-700">
                Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi mất mát, lạm
                dụng, truy cập trái phép, tiết lộ, thay đổi và phá hủy.
            </p>

            <h2 className="text-2xl font-bold mb-2 text-blue-500">Quyền của Người Dùng</h2>
            <p className="mb-4 text-gray-700">
                Bạn có quyền truy cập, chỉnh sửa, hoặc yêu cầu xóa thông tin cá nhân của mình. Nếu bạn muốn thực hiện
                bất kỳ quyền nào trong số này, vui lòng liên hệ với chúng tôi qua thông tin dưới đây.
            </p>

            <h2 className="text-2xl font-bold mb-2 text-blue-500">Liên Hệ</h2>
            <p className="mb-4 text-gray-700">
                Nếu bạn có bất kỳ câu hỏi nào về chính sách quyền riêng tư này, vui lòng liên hệ với chúng tôi qua email
                tại:{' '}
                <a href="mailto:support@waketravel.com" className="text-blue-600 hover:underline">
                    support@waketravel.com
                </a>
                .
            </p>
        </div>
    );
}

export default PrivacyPolicy;
