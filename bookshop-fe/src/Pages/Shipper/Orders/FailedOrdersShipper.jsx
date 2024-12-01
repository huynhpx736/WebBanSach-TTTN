import React, { useEffect, useState } from 'react';
import { fetchOrdersByShipperAndStatus } from '../../../api';
import { Link } from 'react-router-dom';
import './FailedOrdersShipper.css';
import './ShipperOrders.css';

const FailedOrderShipper = () => {
  const [failedOrders, setFailedOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const itemsPerPage = 10;
  const shipperId = localStorage.getItem('userId') || 30;

  useEffect(() => {
    const fetchFailedOrders = async () => {
      try {
        const data = await fetchOrdersByShipperAndStatus(shipperId, 'FAILED');
        const sortedData = data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate) // Sắp xếp giảm dần theo ngày đặt
        );
        setFailedOrders(sortedData);
        setFilteredOrders(sortedData); // Hiển thị danh sách mặc định
      } catch (error) {
        console.error('Failed to fetch failed orders:', error);
      }
    };
    fetchFailedOrders();
  }, [shipperId]);

  // Hàm lọc đơn hàng
  const handleSearch = () => {
    let results = failedOrders;

    if (searchKeyword) {
      results = results.filter(order =>
        order.id.toString().includes(searchKeyword.trim())
      );
    }

    if (searchDate) {
      results = results.filter(order =>
        new Date(order.orderDate).toLocaleDateString('vi-VN') ===
        new Date(searchDate).toLocaleDateString('vi-VN')
      );
    }

    if (searchCustomer) {
      results = results.filter(order =>
        order.user.fullname.toLowerCase().includes(searchCustomer.trim().toLowerCase())
      );
    }

    setFilteredOrders(results);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Reset tìm kiếm
  const resetSearch = () => {
    setSearchKeyword('');
    setSearchDate('');
    setSearchCustomer('');
    setFilteredOrders(failedOrders);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  // Phân trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="orders-page">
      <h2>ĐƠN HÀNG GIAO THẤT BẠI</h2>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm theo mã đơn hàng..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tìm theo người đặt..."
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
        <button onClick={resetSearch}>Đặt lại</button>
      </div>

      {currentOrders.length === 0 ? (
        <p className="no-failed-orders">Không có đơn hàng thất bại nào</p>
      ) : (
        <>
          <table className="failed-orders-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Người đặt</th>
                <th>Lý do thất bại</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                  </td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                  <td>{order.user.fullname}</td>
                  <td>{order.failureReason || 'Không có lý do'}</td>
                  <td>{order.note || 'Không có ghi chú'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FailedOrderShipper;