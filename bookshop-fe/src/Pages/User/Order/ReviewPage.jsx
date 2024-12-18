import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderItemsByOrderId, getAllReviews, createReview, markItemAsReviewed } from '../../../api'; // Import API để đánh dấu sản phẩm đã được đánh giá
import './ReviewPage.css';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';

const ReviewPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const UserId = localStorage.getItem('userId');
    const [orderItems, setOrderItems] = useState([]);
    // const [reviews, setReviews] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const orderItemsData = await getOrderItemsByOrderId(orderId);
                setOrderItems(orderItemsData);
                console.log(orderItemsData);
            } catch (error) {
                console.error('Failed to fetch order items:', error);
            }
        };

        // const fetchReviews = async () => {
        //     try {
        //         const reviewsData = await getAllReviews();
        //         setReviews(reviewsData);
        //     } catch (error) {
        //         console.error('Failed to fetch reviews:', error);
        //     }
        // };

        fetchOrderItems();
        // fetchReviews();
    }, [orderId]);

    const handleReviewSubmit = async () => {
        try {
            const reviewDTO = {
                productId: selectedItem.productId,
                userId: UserId, 
                rating,
                comment,
            };
            await createReview(reviewDTO);
            // Đánh dấu item đã được đánh giá
            await markItemAsReviewed(selectedItem.id);
            alert('Đánh giá thành công!');
            setShowPopup(false);
            setRating(0);
            setComment('');

            // Cập nhật lại danh sách sản phẩm và đánh giá sau khi đánh giá thành công
            setOrderItems(orderItems.map(item => 
                item.id === selectedItem.id ? { ...item, hasReview: 1 } : item
            ));
            // setReviews([...reviews, reviewDTO]);
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Đánh giá thất bại, vui lòng thử lại.');
        }
    };

    const handleOpenPopup = (product) => {
        setSelectedItem(product);
        setShowPopup(true);
    };

    // const hasReviewed = (productId) => {
    //     return reviews.some(review => review.productId === productId);
    // };

    return (
        <div>
            <Header />
            <div className="review-page">
                <h2>Đánh giá sản phẩm</h2>
                {orderItems.length === 0 ? (
                    <p>Không có sản phẩm nào để đánh giá.</p>
                ) : (
                    <div className="order-items">
                        {orderItems.map((item) => (
                            <div key={item.id} className="order-item">
                            <Link to={`/product/${item.productId}`}>
                                <img src={item.image} alt={item.productName} className="product-image" />
                            </Link>
                                <div className="product-info">
                                    <h3>{item.productName}</h3>
                                    <p>Giá: {formatter.format(item.price)}</p>
                                    {/* {item.hasReview || hasReviewed(item.productId) ? ( */}
                                    {(item.hasReview ==1)? (
                                        <button disabled className="disabled-button">Đã đánh giá</button>
                                    ) : (
                                        <button onClick={() => handleOpenPopup(item)}>Đánh giá</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Đánh giá sản phẩm: {selectedItem.productName}</h3>
                        <div className="rating">
                            <p>Chọn số sao:</p>
                            {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`star ${index < rating ? 'selected' : ''}`}
                                    onClick={() => setRating(index + 1)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            placeholder="Viết bình luận..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="popup-buttons">
                            <button onClick={handleReviewSubmit}>Gửi đánh giá</button>
                            <button onClick={() => setShowPopup(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
            <Footer />
        </div>
    );
};

export default ReviewPage;
