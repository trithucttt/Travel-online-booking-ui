import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { routeKey } from '../../../Components/pathName';

function HelpPage() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    // Theo dõi sự kiện scroll
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

            <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Trợ Giúp</h1>

            <h2 className="text-2xl font-bold mb-4 text-blue-500">Câu Hỏi Thường Gặp (FAQ)</h2>
            <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-700">1. Làm thế nào để tạo một tài khoản?</h3>
                <p className="text-gray-700 mb-4">
                    Để tạo tài khoản, bạn cần truy cập vào trang{' '}
                    <Link to={routeKey.signup} className="text-blue-600 hover:underline">
                        đăng ký
                    </Link>{' '}
                    và điền vào các thông tin cần thiết như tên, địa chỉ email và mật khẩu.
                </p>

                <h3 className="font-bold text-lg text-gray-700">2. Tôi quên mật khẩu. Làm thế nào để khôi phục?</h3>
                <p className="text-gray-700 mb-4">
                    Nếu bạn quên mật khẩu, hãy truy cập vào trang{' '}
                    <Link to={routeKey.login} className="text-blue-600 hover:underline">
                        đăng nhập
                    </Link>{' '}
                    và nhấp vào "Quên mật khẩu" để nhận hướng dẫn khôi phục qua email.
                </p>

                <h3 className="font-bold text-lg text-gray-700">3. Làm thế nào để liên hệ với bộ phận hỗ trợ?</h3>
                <p className="text-gray-700">
                    Bạn có thể liên hệ với chúng tôi qua email tại{' '}
                    <a href="mailto:support@waketravel.com" className="text-blue-600 hover:underline">
                        support@waketravel.com
                    </a>{' '}
                    hoặc qua số điện thoại (+84) 382410739.
                </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-blue-500">Liên Hệ Hỗ Trợ</h2>
            <p className="text-gray-700 mb-6">
                Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua các phương thức liên hệ dưới đây. Chúng tôi
                luôn sẵn sàng giúp đỡ bạn.
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@waketravel.com" className="text-blue-600 hover:underline">
                    support@waketravel.com
                </a>
            </p>
            <p className="text-gray-700">
                <strong>Điện thoại:</strong> (+84) 382410739
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-blue-500">Hướng Dẫn Sử Dụng</h2>
            <p className="text-gray-700">
                Bạn có thể tìm thêm các hướng dẫn sử dụng chi tiết tại trang Hướng Dẫn của chúng tôi hoặc xem các video
                hướng dẫn trên kênh YouTube của chúng tôi để biết thêm chi tiết.
            </p>
        </div>
    );
}

export default HelpPage;
