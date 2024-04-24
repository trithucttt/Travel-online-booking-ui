import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTag, faStar } from '@fortawesome/free-solid-svg-icons';
import { VND } from '../../../helper/index';
import styles from './Post.module.scss';
function PostItem({ item, postIndex, formatDateTime, handleDetail, handleImageClick, handleRenderOwnerPost }) {
    return (
        <div>
            <div className={styles.framePost} key={item.postId}>
                <div className={styles.postHeader}>
                    <div className={styles.imageOwnerPost}>
                        <img
                            className={styles.imageUser}
                            src={item.avatarUser}
                            // src="https://i.pinimg.com/564x/a3/c5/94/a3c5941991524fc63d5d1657f696cbf0.jpg"
                            alt="userAvatar"
                        />
                    </div>
                    <div className={styles.NameOwnerPost} onClick={() => handleRenderOwnerPost(item.ownerPostId)}>
                        <h4>{item.fullNameUser}</h4>
                        <p>{formatDateTime(item.start_time)}</p>
                    </div>
                </div>
                <div className={styles.postBody}>
                    <div className={styles.postImage}>
                        {/* hiển thị tất cả ảnh khi nhấn vào showAll */}
                        {/* {showAllImages
                                ? item.imagePost.map((image, i) => (
                                      <img
                                          key={i}
                                          src={image}
                                          alt="post-Images"
                                          className={styles.itemImage}
                                          onClick={() => setBoxIndex(i)}
                                      />
                                  )) 
                                :  */}
                        {/* chỉ hiển thị all ảnh với popup ko hiển thị trên post  */}
                        {item.imagePost.slice(0, 3).map((image, imageIndex) => (
                            <img
                                key={imageIndex}
                                src={`http://localhost:8086/api/post/${image}/image`}
                                alt="post-Images"
                                className={styles.itemImage}
                                onClick={() => handleImageClick(postIndex, imageIndex)}
                            />
                        ))}
                        {item.imagePost.length > 3 && (
                            <div className={styles.showAllButton} onClick={() => handleImageClick(postIndex, 3)}>
                                +{item.imagePost.length - 3}
                            </div>
                        )}
                        {/* kết hợp hiển thị all ảnh  */}
                        {/* {item.imagePost.length > 2 && !showAllImages && (
                                <div className={styles.showAllButton} onClick={() => handleImageClick(2)}>
                                    +{item.imagePost.length - 2}
                                </div>
                            )} */}
                    </div>
                    <div className={styles.postInfo} onClick={() => handleDetail(item.postId)}>
                        <div className={styles.baseInfo}>
                            <h2 className={styles.titlePost}>{item.title}</h2>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        className={styles.rating}
                                        key={star}
                                        // onClick={() => handleRatingChange(star)}
                                        style={{
                                            cursor: 'pointer',
                                            color: star <= item.rate ? 'gold' : 'gray',
                                        }}
                                    >
                                        {/* &#9733; */}
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                ))}
                            </div>
                            <div className={styles.tagDiscount}>
                                <FontAwesomeIcon icon={faTag} />
                                {0.25 * 100 + '%'} SALE END OF {format(new Date(), 'dd MMM, yyyy')}
                            </div>
                            <p className={styles.addressInfo}>
                                <FontAwesomeIcon icon={faLocationDot} />
                                VIET NAM
                            </p>
                        </div>
                        <div className={styles.destinationPost}>
                            <p>Include tour: </p>
                            <ul>
                                {item.tourDtoList.map((des, index) => (
                                    <li key={index}>{des.titleTour}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.tagDiscount}>
                            <FontAwesomeIcon icon={faTag} />
                            {0.25 * 100 + '%'} SALE END OF {format(new Date(), 'dd MMM, yyyy')}
                        </div>
                    </div>
                    <div className={styles.postRating} onClick={() => handleDetail(item.id)}>
                        <div className={styles.baseRating}>
                            <div>
                                <div>Excellent</div>
                                <div>450 reviews</div>
                            </div>
                            {/* <div>{item.ratingAvg}</div> */}
                        </div>
                        <div className={styles.discount}>
                            {item.discount && item.discount !== 0 && (
                                <div className={styles.labelDiscount}>{2.5 * 100}% OFF TODAY</div>
                            )}
                            <p className={styles.currentPrice}>{VND.format(item.price)}</p>
                            <p className={styles.priceDiscoun}>{VND.format(item.price - (item.price * 25) / 100)}</p>
                            <p className={styles.serviceDiscount}>+ FEE CANCELLATION</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PostItem;
