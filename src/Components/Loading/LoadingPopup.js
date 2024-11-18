export const LoadingPopup = ({ isLoading }) => {
    if (!isLoading) return null; // Nếu không phải trạng thái loading thì không hiển thị gì
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="flex flex-col items-center">
                <svg
                    className="animate-spin h-12 w-12 text-white mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                </svg>
                <span className="text-white text-lg">Đang xử lý...</span>
            </div>
        </div>
    );
};
