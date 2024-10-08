
import React, { useState } from 'react';
import axios from 'axios';
import './SearchProduct.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
// import Cover from '../../images/biasach.jpg';

const criteriaList = [
  { id: 'title', label: 'Tên sách' },
  { id: 'author', label: 'Tác giả' },
  { id: 'category', label: 'Thể loại' },
  { id: 'publisher', label: 'Nhà xuất bản' },
  { id: 'publicationYear', label: 'Năm xuất bản' },
  { id: 'tag', label: 'Tag' },
  { id: 'rating', label: 'Đánh giá' },
  { id: 'price', label: 'Giá' },
];

const Search = () => {
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [formData, setFormData] = useState({
    title: null,
    titleWeight: 1,
    author: null,
    authorWeight: 1,
    category: null,
    categoryWeight: 1,
    publisher: null,
    publisherWeight: 1,
    publicationYear: null,
    yearWeight: 1,
    tag: null,
    tagWeight: 1,
    minRating: null,
    maxRating: null,
    ratingWeight: 1,
    minPrice: null,
    maxPrice: null,
    priceWeight: 1,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeCriteria = (e) => {
    const { id, checked } = e.target;
    setSelectedCriteria(prev => {
      if (checked) return [...prev, id];
      return prev.filter(criteria => criteria !== id);
    });
  };

  const handleSubmitCriteria = (e) => {
    e.preventDefault();
    if (selectedCriteria.length > 0) {
      setShowSearchForm(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/products/BooleanSearch', formData);
      const results = response.data.data;
      setSearchResults(results);
    } catch (err) {
      setError('Có lỗi xảy ra trong quá trình tìm kiếm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="search-container">
        <h2>Tìm kiếm sách</h2>

        {/* Phần chọn tiêu chí */}
        {!showSearchForm && (
          <div>
            <h3>Chọn tiêu chí tìm kiếm</h3>
            <form onSubmit={handleSubmitCriteria}>
              {criteriaList.map(criteria => (
                <div key={criteria.id}>
                  <input
                    type="checkbox"
                    id={criteria.id}
                    onChange={handleChangeCriteria}
                  />
                  <label htmlFor={criteria.id}>{criteria.label}</label>
                </div>
              ))}
              <button type="submit" disabled={selectedCriteria.length === 0}>OK</button>
            </form>
          </div>
        )}

        {/* Phần form tìm kiếm */}
        {showSearchForm && (
          <form id="searchForm" onSubmit={handleSearch}>
            <div className="form-group-booleanSearch">
              {selectedCriteria.includes('title') && (
                <div className="criteria-line">
                  <label htmlFor="title">Tên sách:&emsp;&emsp;&emsp;</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  <label htmlFor="titleWeight">&emsp;&emsp;&emsp;&emsp;&emsp;Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="titleWeight"
                    name="titleWeight"
                    min="1"
                    max="100"
                    value={formData.titleWeight}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              )}
              {selectedCriteria.includes('author') && (
                <div className="criteria-line">
                
                  <label htmlFor="author">Tác giả:&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                  />
                  <label htmlFor="authorWeight">&emsp;&emsp;&emsp;&emsp;&emsp;Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="authorWeight"
                    name="authorWeight"
                    min="1"
                    max="100"
                    value={formData.authorWeight}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              )}
              {selectedCriteria.includes('category') && (
                <div className="criteria-line">
                  <label htmlFor="category">Thể loại:&emsp;&emsp;&emsp;&nbsp;</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                  <label htmlFor="categoryWeight">&emsp;&emsp;&emsp;&emsp;&emsp;Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="categoryWeight"
                    name="categoryWeight"
                    min="1"
                    max="100"
                    value={formData.categoryWeight}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              )}
              {selectedCriteria.includes('publisher') && (
                <div className="criteria-line">
                  <label htmlFor="publisher">Nhà xuất bản:&emsp;</label>
                  <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                  />
                  <label htmlFor="publisherWeight">&emsp;&emsp;&emsp;&emsp;&emsp;Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="publisherWeight"
                    name="publisherWeight"
                    min="1"
                    max="100"
                    value={formData.publisherWeight}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              )}
              {selectedCriteria.includes('publicationYear') && (
                <div className="criteria-line">
                  <label htmlFor="publicationYear">Năm xuất bản:&nbsp;&nbsp;&nbsp;</label>
                  <input
                    type="number"
                    id="publicationYear"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleChange}
                  />
                  <label htmlFor="yearWeight">&emsp;&emsp;&emsp;&emsp;&emsp;Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="yearWeight"
                    name="yearWeight"
                    min="1"
                    max="100"
                    value={formData.yearWeight}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              )}
              {selectedCriteria.includes('tag') && (
                <div className="criteria-line">
                  <label htmlFor="tag">Tag:&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;</label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                  />
                  <label htmlFor="tagWeight">&emsp;&emsp;&emsp;&emsp;&emsp;Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="tagWeight"
                    name="tagWeight"
                    min="1"
                    max="100"
                    value={formData.tagWeight}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              )}
              {selectedCriteria.includes('rating') && (
                <div className="criteria-line">
                  <label htmlFor="minRating">Đánh giá (sao)từ:</label>
                  <input
                    type="number"
                    id="minRating"
                    name="minRating"
                    step="0.1"
                    value={formData.minRating}
                    onChange={handleChange}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    id="maxRating"
                    name="maxRating"
                    step="0.1"
                    value={formData.maxRating}
                    onChange={handleChange}
                  />
                  <label htmlFor="ratingWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="ratingWeight"
                    name="ratingWeight"
                    min="1"
                    max="100"
                    value={formData.ratingWeight}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              )}
              {selectedCriteria.includes('price') && (
                <div className="criteria-line">
                  <label htmlFor="minPrice">Giá từ:&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;</label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleChange}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleChange}
                  />
                  <label htmlFor="priceWeight">Độ ưu tiên:</label>
                  <input
                    type="number"
                    id="priceWeight"
                    name="priceWeight"
                    min="1"
                    max="100"
                    value={formData.priceWeight}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
            </button>
          </form>
        )}

        {error && <p className="error-message">{error}</p>}
        <ul id="searchResults">
          {searchResults.map((book) => (

            <li key={book.id}>
            <Link to={`/product/${book.id}`} target='blank'>

                {/* <img src={'Cover'} alt={book.title} /> */}
                {/* <img src='biasach.jpg' alt={book.title} /> */}


                {/* <img src={'../../images/biasach.jpg'} alt={book.title} /> */}
                <img src={book.image}  />
                </Link>

              <div>
                <strong>{book.title}</strong><br />
                Tác giả: {book.authors.map(author => author.name).join(', ')}<br />
                Thể loại: {book.categories.map(category => category.name).join(', ')}<br />
                Nhà xuất bản: {book.publisher.name}<br />
                Năm xuất bản: {book.publicationYear}<br />
                Tag: {book.tags.map(tag => tag.name).join(', ')}<br />
                Đánh giá: {book.starRating} sao<br />
                Giá: {book.price.toLocaleString()} VNĐ
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
