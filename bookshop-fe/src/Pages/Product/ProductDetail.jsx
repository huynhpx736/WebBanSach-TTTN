import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, fetchProductsByCategory, fetchAllProducts, addProductToCart, fetchUserById, getReviewByProduct } from '../../api';
import Cover from '../../images/biasach.jpg'; // Thay thế với hình ảnh từ API nếu không có bìa
import './ProductDetail.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SliderProduct from '../../Components/SliderProduct/SliderProduct';
import AuthContext from '../Auth/AuthContext';
import { toast } from 'react-toastify';
const ProductDetail = () => {
  const { id } = useParams();
  const { userId } = useContext(AuthContext); 
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1); 
  const [user, setUser] = useState(null);
  useEffect(() => {

    fetchProductById(id)
      .then(productData => {
        setProduct(productData);
        if (productData.categories.length > 0) {
          const categoryId = productData.categories[0].id;
          fetchProductsByCategory(categoryId)
            .then(products => setRelatedProducts(products))
            .catch(err => console.error('Failed to fetch related products.', err));
        } else {
          fetchAllProducts()
            .then(products => setRelatedProducts(products))
            .catch(err => console.error('Failed to fetch all products.', err));
        }
      })
      .catch(err => console.error('Failed to fetch product details.', err));

      getReviewByProduct(id)
      .then(reviewsData => {
        setReviews(reviewsData);
      })
      .catch(err => console.error('Failed to fetch reviews.', err));

  }, [id]);

  const handleAddToCart = () => {
    if (!userId) {
      alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.');
      return;
    }

    addProductToCart(userId, product.id, quantity)
      .then(() => {
        alert(`${product.title} đã được thêm vào giỏ hàng!`);
        // toast.success(`${product.title} đã được thêm vào giỏ hàng!`);
      })
      .catch(err => {
        console.error('Failed to add product to cart.', err);
        alert('Thêm vào giỏ hàng thất bại.');
      });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star">
          {i < rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <Header />
      <div className="container">
        {product ? (
          <>
            <img src={product.image || Cover} alt={product.title} className="product-image" />

            <div className="product-details">
              <h1 className="product-title">{product.title}</h1>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Giá: {product.price} đồng</p>

              <div className="product-meta">
                <div className="product-meta-item">
                  <strong>Năm xuất bản:</strong> {product.publicationYear}
                </div>
                <div className="product-meta-item">
                  {/* <strong>Còn lại:</strong> {product.salesVolume}
                   */}
                   {/* //nếu product.salesVolume > 0 thì hiển thị "Còn lại: +salesVolume" không thì hiển thị sản phẩm hết hàng */}
                    {product.salesVolume > 0 ? (
                      <div>
                      <strong>Đã bán:</strong> {product.quantity_sold}
                      {/* chỉ hiện số lượng còn lại bằng một nửa số lượng tồn kho tvà làm tròn xuống */}
                      {/* <strong><br/>Có sẵn:</strong> {Math.floor(product.salesVolume/2)} */}
                      <strong><br/>Còn lại: </strong>{product.salesVolume}

                    </div>

                  ) : (
                    <strong className='zero-product'>Sản phẩm đã hết hàng</strong>
                  )}

                   
                </div>
                <div className="product-meta-item">
                  <strong>Đánh giá:</strong>
                  <div className="stars">{renderStars(product.starRating)}</div>
                </div>
                <div className="product-meta-item">
                  <strong>NXB:</strong> {product.publisher.name}
                </div>
                <div className="product-meta-item">
                  <strong>Trọng lượng:</strong> {product.weight} g
                  </div>
              </div>

              <div>
                <h3>Tác giả:</h3>
                <div className="authors">
                  {product.authors.map(author => (
                    <span key={author.id} className="author">
                      {author.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3>Thể loại:</h3>
                <div className="categories">
                  {product.categories.map(category => (
                    <span key={category.id} className="category">
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
              {product.topic&&(<div>
                  <h3>Chủ đề</h3>
                  <div className="topics">
                    {product.topic}
                  </div>
                </div>
              )}
                {product.content&&(<div>
                  <h3>Mục lục có chứa</h3>
                  <div className="table-of-contents">                
                  {product.content.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br/></span>
                  })}
                </div>
              </div>
              )}

              {/* <div dangerouslySetInnerHTML={{ __html: product.content }}></div> */}
              <div>
                <h3>Tags:</h3>
                <div className="tags">
                  {product.tags.map(tag => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              {/* //nếu product.status = 1 thì hiển thị nút thêm vào giỏ hàng và số lượng còn không thì hiển thị sản phẩm không còn bán */}
              {/* {(product.status === 1&&product.salesVolume>0) ? ( */}
              {(product.status === 1&&product.salesVolume>0) ? (
                <>
                  <div className="quantity-input">
                    <label htmlFor="quantity">Số lượng:</label>
                    <input
                       type="number"
                  id="quantity"
                  min="1"
                  max={product.salesVolume}
                  value={quantity}
                  onChange={(e) => {
                    if (e.target.value < 1) {
                      setQuantity(1);
                    } else if (e.target.value > product.salesVolume) {
                      setQuantity(product.salesVolume);
                    } else {
                      setQuantity(Number(e.target.value));
                    }
                  }}     
                />
              </div>

              <button className="add-to-cart" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
                </>
              ) : (
                <p className='stop-sale'>Sản phẩm hiện không còn bán</p>
              )}         
              <div className="reviews">
  <h3>Đánh giá</h3>
  {reviews.length > 0 ? (
    reviews.map((review, index) => (
      <div key={index} className="review">
        <div className="review-header">
          <img src={`/${review.userAvatar}` || '/defaultAvatar.jpg'} alt={review.userName} className="review-avatar" />
          <div className="review-info">
            <strong className="review-username">{review.userName}</strong>
            <div className="review-rating">{renderStars(review.rating)}</div>
          </div>
        </div>
        <p className="review-comment">{review.comment}</p>
      </div>
    ))
  ) : (
    <p>Chưa có đánh giá nào.</p>
  )}
</div>

              <div className="related-products">
                <h2>Có thể bạn quan tâm</h2>
                <SliderProduct products={relatedProducts} />
              </div>
            </div>
          </>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
