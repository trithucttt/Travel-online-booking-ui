import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Search } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RatingPopup from './RatingItems';
import Post from '../ListPost';
import apiService from '../../../Components/ApiService';
import CreatePostUser from './PostForRoleUser';
import Swal from 'sweetalert2';
import withHeader from '../../../Components/Layout/withHeader';
import PaginationItem from './Pagination/index';
import SidebarFilter from './SidebarFilter';

const options = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 50, label: '50' },
];

// const getEndDay = () => {
//     const today = new Date();
//     const endDate = new Date(today.setMonth(today.getMonth() + 2));
//     const localEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000);
//     return localEndDate.toISOString().slice(0, 10);
// };

function SearchPage() {
    const [itemsPerPage, setItemsPerPage] = useState(options[0]);
    const [totalPage, setTotalPage] = useState('');
    const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('query') || '';

    const [posts, setPosts] = useState([]);

    const closePopup = () => {
        setIsOpenCreatePost(false);
    };

    const [ratingModalIsOpen, setRatingModalIsOpen] = useState(false);

    const closeRatingModal = () => {
        setRatingModalIsOpen(false);
    };

    const handleRate = (newRating) => {
        console.log('New Rating:', newRating);
        closeRatingModal();
    };

    const handlePrePage = () => {
        setCurrentPage(currentPage - 1);
    };
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleItemsPerPageChange = (value) => {
        const selectedOption = options.find((opt) => opt.value === value);
        setItemsPerPage(selectedOption);
    };

    const searchAndPagination = async (searchInfo, size, currentPage) => {
        try {
            const { title, price, discount, quantity, city, startDate } = searchInfo;
            // console.log(searchInfo);
            const filters = {};
            if (price) {
                const [priceStart, priceEnd] = price.split('-');
                filters.priceStart = priceStart;
                filters.priceEnd = priceEnd;
            }
            if (discount) {
                const [discountStart, discountEnd] = discount.split('-');
                filters.discountStart = discountStart / 100;
                filters.discountEnd = discountEnd / 100;
            }
            if (quantity) {
                const [quantityStart, quantityEnd] = quantity.split('-');
                filters.quantityStart = quantityStart;
                filters.quantityEnd = quantityEnd;
            }

            // Tạo một object chứa các tham số ban đầu
            const params = {
                title: title,
                startTime: startDate,
                quantityStart: filters.quantityStart,
                quantityEnd: filters.quantityEnd,
                priceStart: filters.priceStart,
                priceEnd: filters.priceEnd,
                discountStart: filters.discountStart,
                discountEnd: filters.discountEnd,
                cityId: city,
                regionName: '',
                size: size,
                currentPage: currentPage,
            };

            // Lọc các tham số có giá trị null hoặc undefined
            const filteredParams = Object.fromEntries(
                Object.entries(params).filter(([_, v]) => v !== null && v !== undefined && v !== ''),
            );

            const data = await apiService.request('get', 'post/filter', null, {}, filteredParams);

            console.log(filteredParams);
            setPosts(data.data);
            setTotalPage(data.pagination.totalPage);
            if (data.data.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Không tìm thấy bài viết nào!',
                    text: 'Vui lòng thử lại với bộ lọc khác',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const manualSearch = async (searchPost, size, currentPage) => {
        try {
            const data = await apiService.request(
                'get',
                'post/search',
                null,
                {},
                {
                    title: searchPost || '',
                    size: size,
                    currentPage: currentPage,
                },
            );
            setPosts(data.data);
            setTotalPage(data.pagination.totalPage);
            if (data.data.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Không tìm thấy bài viết nào!',
                    text: 'Vui lòng thử lại với bộ lọc khác',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        searchAndPagination(initialQuery, itemsPerPage.value, currentPage);
        // manualSearch(initialQuery, itemsPerPage.value, currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialQuery, itemsPerPage, currentPage]);

    return (
        <div className="flex min-h-screen">
            {/* Phần lọc dữ liệu */}
            <SidebarFilter
                // manualSearch={manualSearch}
                onSearchAndPagination={searchAndPagination}
                onCreatePost={() => setIsOpenCreatePost(true)}
            />

            {/* Nội dung chính */}
            <div className="flex-grow">
                <div className="flex flex-col min-h-screen">
                    {/* Kiểm tra nếu posts có dữ liệu thì hiển thị, ngược lại hiển thị không tìm thấy */}
                    {posts && posts.length > 0 ? (
                        <Post posts={posts} />
                    ) : (
                        <div className="flex flex-col items-center mt-8">
                            <p className="text-gray-500">Không tìm thấy bài viết nào.</p>
                            <i className="text-4xl text-gray-300 mt-4">
                                <KeyboardDoubleArrowLeft /> <KeyboardDoubleArrowRight />
                            </i>
                        </div>
                    )}

                    {/* Pagination section */}
                    <PaginationItem
                        currentPage={currentPage}
                        totalPage={totalPage}
                        itemsPerPage={itemsPerPage}
                        onPrevious={handlePrePage}
                        onNext={handleNextPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />

                    <RatingPopup isOpen={ratingModalIsOpen} onClose={closeRatingModal} onRate={handleRate} />

                    {isOpenCreatePost && <CreatePostUser onClose={closePopup} />}
                </div>
            </div>
        </div>
    );
}

export default withHeader(SearchPage);
