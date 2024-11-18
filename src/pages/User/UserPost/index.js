import { faComment, faShare, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

function Posts() {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [selectPostIndex, setSelectPostIndex] = useState(0);
    const posts = [
        {
            id: 1,
            avatar: 'https://i.pinimg.com/564x/a5/e2/55/a5e255b0fe8d64fd9178b912069c13c4.jpg',
            username: 'John Doe',
            timestamp: '2 hours ago',
            content: 'Enjoying a great time at the beach!',
            images: [
                'https://i.pinimg.com/564x/a5/e2/55/a5e255b0fe8d64fd9178b912069c13c4.jpg',
                'https://i.pinimg.com/236x/50/ed/05/50ed050fd3a26bd86a4ccc0e39b22b0f.jpg',
                'https://i.pinimg.com/236x/91/80/f8/9180f88dd658b31d3991117673d5e63e.jpg',
                'https://i.pinimg.com/236x/95/2f/39/952f39a9655287db1545cb4cddf57994.jpg',
                'https://i.pinimg.com/236x/56/8f/1c/568f1c77729876201e38ae6e5faf3a98.jpg',
            ],
            comments: 12,
            likes: 34,
            shares: 5,
            ratings: 4.5,
        },
        {
            id: 2,
            avatar: 'https://i.pinimg.com/564x/a5/e2/55/a5e255b0fe8d64fd9178b912069c13c4.jpg',
            username: 'John Doe',
            timestamp: '2 hours ago',
            content: 'Enjoying a great time at the beach!',
            images: [
                'https://i.pinimg.com/564x/a5/e2/55/a5e255b0fe8d64fd9178b912069c13c4.jpg',
                'https://i.pinimg.com/236x/d3/7b/87/d37b87a689889eec1be049d2a1805b96.jpg',
            ],
            comments: 12,
            likes: 34,
            shares: 5,
            ratings: 4.5,
        },
        {
            id: 3,
            avatar: 'https://i.pinimg.com/564x/a5/e2/55/a5e255b0fe8d64fd9178b912069c13c4.jpg',
            username: 'John Doe',
            timestamp: '2 hours ago',
            content: 'Enjoying a great time at the beach!',
            images: ['https://i.pinimg.com/236x/7f/50/e8/7f50e8460c35b8c85000b43603212ddd.jpg'],
            comments: 12,
            likes: 34,
            shares: 5,
            ratings: 4.5,
        },
        // Các bài viết khác...
    ];

    const openLightbox = (index, postIndex) => {
        setPhotoIndex(index);
        setSelectPostIndex(postIndex);
        setIsOpen(true);
    };

    return (
        <div className="space-y-6">
            {posts.map((post, postIndex) => (
                <div key={post.id} className="p-6 bg-white border rounded-xl shadow-lg">
                    {/* Header của bài viết */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <img src={post.avatar} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h3 className="font-semibold text-gray-900">{post.username}</h3>
                                <span className="text-sm text-gray-500">{post.timestamp}</span>
                            </div>
                        </div>
                        <div className="relative">
                            <button className="text-gray-500 hover:text-gray-700">&#x22EE;</button>
                        </div>
                    </div>
                    {/* Nội dung bài viết */}
                    <div className="mt-4">
                        <p className="text-gray-800">{post.content}</p>
                    </div>
                    {/* Hình ảnh bài viết */}
                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                        {post.images.slice(0, 3).map((image, i) => (
                            <img
                                key={i}
                                src={image}
                                alt={`Postimage ${i + 1}`}
                                className="w-full h-48 object-cover cursor-pointer transition-transform transform hover:scale-105"
                                onClick={() => openLightbox(i, postIndex)}
                            />
                        ))}
                        {post.images.length > 4 && (
                            <div
                                className="w-full h-48 bg-gray-300 flex justify-center items-center cursor-pointer"
                                onClick={() => openLightbox(3, postIndex)}
                            >
                                <span className="text-2xl font-bold text-white">+{post.images.length - 3}</span>
                            </div>
                        )}
                    </div>
                    {/* Phần tương tác */}
                    <div className="mt-4 border-t pt-2">
                        <div className="flex justify-between text-gray-600 text-sm">
                            <div className="flex space-x-4">
                                <button className="flex items-center space-x-1 hover:text-blue-500">
                                    <FontAwesomeIcon icon={faComment} />
                                    <span>{post.comments} Comments</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-blue-500">
                                    <FontAwesomeIcon icon={faShare} />
                                    <span>{post.shares} Shares</span>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <span className="font-bold">{post.ratings.toFixed(1)}</span>{' '}
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Lightbox hiển thị ảnh theo thứ tự */}
            {isOpen && (
                <Lightbox
                    mainSrc={posts[selectPostIndex].images[photoIndex]}
                    nextSrc={posts[selectPostIndex].images[(photoIndex + 1) % posts[selectPostIndex].images.length]}
                    prevSrc={
                        posts[selectPostIndex].images[
                            (photoIndex + posts[0].images.length - 1) % posts[selectPostIndex].images.length
                        ]
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex(
                            (photoIndex + posts[selectPostIndex].images.length - 1) %
                                posts[selectPostIndex].images.length,
                        )
                    }
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % posts[selectPostIndex].images.length)}
                />
            )}
        </div>
    );
}

export default Posts;
