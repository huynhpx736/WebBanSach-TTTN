// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


// export default App;



// import './App.css';
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home/Home';
// import ProductDetail from './Pages/Product/ProductDetail';
// import Search from './Pages/Search/SearchProduct';
// import Register from './Pages/Auth/SignUp';
// import Login from './Pages/Auth/Login';
// import CategoryPage from './Pages/CategoryPage/CategoryPage';

// import AdminLayout from './Pages/Admin/AdminLayout/AdminLayout';
// import Dashboard from './Pages/Admin/Dashboard/Dashboard';
// import ManageProduct from './Pages/Admin/Products/ManaProduct';
// import ManageCategory from './Pages/Admin/Category/ManageCategory';
// import Shop from './Pages/Shop/Shop';
// import { AuthProvider } from './Pages/Auth/AuthContext';
// import Profile from './Pages/User/Profile/Profile';
// import Cart from './Pages/User/Cart/Cart';
// import Order from './Pages/User/Order/Order';
// import ManagePublisher from './Pages/Admin/Publisher/ManagePublisher';
// import ManageAuthor from './Pages/Admin/Author/ManageAuthor';
// import ManageTag from './Pages/Admin/Tag/ManageTag';
// import CreateOrder from './Pages/User/CreateOrder/CreateOrder';
// import NotFound from './Pages/404';
// import OrderDetail from './Pages/User/Order/OrderDetail';
// import PlacedOrders from './Pages/Admin/Orders/PlacedOrders';
// import OrderDetailAdmin from './Pages/Admin/Orders/OrderDetailAdmin';
// import ShippingOrders from './Pages/Admin/Orders/ShippingOrders';
// import CancelledOrders from './Pages/Admin/Orders/CancelledOrders';
// import CompletedOrders from './Pages/Admin/Orders/CompletedOrders';
// import About from './Pages/About/About';
// import ReviewPage from './Pages/User/Order/ReviewPage';
// import FindResults from './Pages/FindProduct/FindProduct';
// import DashboardShipper from './Pages/Shipper/DashboardShipper/DashboardShipper';
// import ShipperLayout from './Pages/Shipper/ShipperLayout/ShipperLayout';
// import ProfileShip from './Pages/Shipper/Profile/ProfileShipper';
// import WaitingOrders from './Pages/Shipper/Orders/WaitingOrders';
// import FailedOrderShipper from './Pages/Shipper/Orders/FailedOrdersShipper';
// import CompletedOrdersShipper from './Pages/Shipper/Orders/CompletedOrdersShipper';
// import AcceptedOrdersShipper from './Pages/Shipper/Orders/AcceptedOrdersShipper';
// import ConfirmedOrders from './Pages/Admin/Orders/ConfirmedOrders';
// import FailedOrders from './Pages/Admin/Orders/FailedOrders';
// import ManageShipper from './Pages/Admin/ManageUser/ManageShipper';
// const App = () => {
//   return (
//     <AuthProvider>
//     <Routes>
     
//        {/* <Route path="*" element={NotFound} />  */}
       
//       <Route path="*" element={<div> <h2>404 Not found</h2></div>} />
//       <Route path="/" element={<Home />} />
//       <Route path="/shop" element={<Shop/>} />
//       <Route path="/search" element={<Search />} />
//       <Route path='/findProduct' element={<FindResults />} />
//       <Route path="/product/:id" element={<ProductDetail />} />
//       <Route path="/register" element={<Register/>} />
//       <Route path="/login" element={<Login/>} />
//       <Route path='/profile' element ={<Profile/>} />
//       <Route path='/cart' element ={<Cart />} />
//       <Route path='/orders' element={<Order />} />
//       <Route path='/orderDetail/:orderId' element={<OrderDetail />} />
//       <Route path='createOrder' element={<CreateOrder />} />
//       <Route path='/review/:orderId' element={<ReviewPage />} />
//       <Route path="/category/:categoryId" element={<CategoryPage/>} />
//       <Route path='/about' element={<About/>} />
      
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="products" element={<ManageProduct />} />
//         <Route path="categories" element={<ManageCategory />} />
//         <Route path="authors" element={ <ManageAuthor/>} />
//         <Route path="publishers" element={<ManagePublisher/>} />
//         <Route path="tags" element={<ManageTag />} />
//         <Route path="orders/ordered" element = {<PlacedOrders/>} />
//         <Route path="orders/confirmed" element = {<ConfirmedOrders/>} />
//         <Route path='orders/shipping' element={<ShippingOrders />} />
//         <Route path='orders/cancelled' element={<CancelledOrders />} />
//         <Route path='orders/completed' element={<CompletedOrders />} />
//         <Route path='orders/failed' element={<FailedOrders />} />
//         <Route path='orders/:orderId' element={<OrderDetailAdmin />} />
//         <Route path="manage-shipper" element={<ManageShipper />} />
//       </Route>      
//       {/* Shipper Routes */}
//       <Route path="/shipper" element={<ShipperLayout />}>

//       <Route path="dashboard" element= {<DashboardShipper />} />
//       <Route path="orders/waiting" element={<WaitingOrders />} />
//       <Route path="orders/accepted" element = {<AcceptedOrdersShipper />} />
//         <Route path="orders/cancelled" element={<CancelledOrders />} />
//         <Route path="orders/completed" element={<CompletedOrdersShipper />} />
//         <Route path="orders/failed" element = {<FailedOrderShipper />} />
//         <Route path="orders/:orderId" element={<OrderDetailAdmin />} />
//         <Route path="profile" element={<ProfileShip />} />
//       </Route>
//     </Routes>
//     </AuthProvider>
//   );
// };

// export default App;

import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/Product/ProductDetail';
import Search from './Pages/Search/SearchProduct';
import Register from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import CategoryPage from './Pages/CategoryPage/CategoryPage';

import AdminLayout from './Pages/Admin/AdminLayout/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import ManageProduct from './Pages/Admin/Products/ManaProduct';
import ManageCategory from './Pages/Admin/Category/ManageCategory';
import Shop from './Pages/Shop/Shop';
import { AuthProvider } from './Pages/Auth/AuthContext';
import Profile from './Pages/User/Profile/Profile';
import Cart from './Pages/User/Cart/Cart';
import Order from './Pages/User/Order/Order';
import ManagePublisher from './Pages/Admin/Publisher/ManagePublisher';
import ManageAuthor from './Pages/Admin/Author/ManageAuthor';
import ManageTag from './Pages/Admin/Tag/ManageTag';
import CreateOrder from './Pages/User/CreateOrder/CreateOrder';
import NotFound from './Pages/404';
import OrderDetail from './Pages/User/Order/OrderDetail';
import PlacedOrders from './Pages/Admin/Orders/PlacedOrders';
import OrderDetailAdmin from './Pages/Admin/Orders/OrderDetailAdmin';
import ShippingOrders from './Pages/Admin/Orders/ShippingOrders';
import CancelledOrders from './Pages/Admin/Orders/CancelledOrders';
import CompletedOrders from './Pages/Admin/Orders/CompletedOrders';
import About from './Pages/About/About';
import ReviewPage from './Pages/User/Order/ReviewPage';
import FindResults from './Pages/FindProduct/FindProduct';
import DashboardShipper from './Pages/Shipper/DashboardShipper/DashboardShipper';
import ShipperLayout from './Pages/Shipper/ShipperLayout/ShipperLayout';
import ProfileShip from './Pages/Shipper/Profile/ProfileShipper';
import WaitingOrders from './Pages/Shipper/Orders/WaitingOrders';
import FailedOrderShipper from './Pages/Shipper/Orders/FailedOrdersShipper';
import CompletedOrdersShipper from './Pages/Shipper/Orders/CompletedOrdersShipper';
import AcceptedOrdersShipper from './Pages/Shipper/Orders/AcceptedOrdersShipper';
import ConfirmedOrders from './Pages/Admin/Orders/ConfirmedOrders';
import FailedOrders from './Pages/Admin/Orders/FailedOrders';
import ManageShipper from './Pages/Admin/ManageUser/ManageShipper';
import CancelledOrdersShipper from './Pages/Shipper/Orders/CancelledOrdersShipper';
import CreateImportReport from './Pages/Admin/Products/CreateImportReport';
import ImportReportHistory from './Pages/Admin/Products/ImportReportHistory';
import ImportReportDetail from './Pages/Admin/Products/ImportReportDetail';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import HistoryImportProductID from './Pages/Admin/Products/HistoryImportProductID';
const App = () => {
  return (
    <AuthProvider>
    <Routes>
        {/* Public Routes */}
       {/* <Route path="*" element={NotFound} />  */}
       
      <Route path="*" element={<div> <h2>404 Not found</h2></div>} />
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/search" element={<Search />} />
      <Route path='/findProduct' element={<FindResults />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/profile' element ={<Profile/>} />
      <Route path='/cart' element ={<Cart />} />
      <Route path='/orders' element={<Order />} />
      <Route path='/orderDetail/:orderId' element={<OrderDetail />} />
      <Route path='createOrder' element={<CreateOrder />} />
      <Route path='/review/:orderId' element={<ReviewPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage/>} />
      <Route path='/about' element={<About/>} />
      
      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={[2]} />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ManageProduct />} />
        <Route path="create-import-report" element={<CreateImportReport />} />
        <Route path="import-report-history" element={<ImportReportHistory />} />
        <Route path="import-report-detail/:id" element={<ImportReportDetail />} />
        <Route path="history-import-product/:productId" element={<HistoryImportProductID />} />
        <Route path="categories" element={<ManageCategory />} />
        <Route path="authors" element={ <ManageAuthor/>} />
        <Route path="publishers" element={<ManagePublisher/>} />
        <Route path="tags" element={<ManageTag />} />
        <Route path="orders/ordered" element = {<PlacedOrders/>} />
        <Route path="orders/confirmed" element = {<ConfirmedOrders/>} />
        <Route path='orders/shipping' element={<ShippingOrders />} />
        <Route path='orders/cancelled' element={<CancelledOrders />} />
        <Route path='orders/completed' element={<CompletedOrders />} />
        <Route path='orders/failed' element={<FailedOrders />} />
        <Route path='orders/:orderId' element={<OrderDetailAdmin />} />
        <Route path="manage-shipper" element={<ManageShipper />} />
        <Route path="profile" element={<ProfileShip />} />
      </Route>
      </Route>      
      {/* Shipper Routes */}
      <Route element={<ProtectedRoute allowedRoles={[3]} />}>
      <Route path="/shipper" element={<ShipperLayout />}>
      <Route path="dashboard" element= {<DashboardShipper />} />
      <Route path="orders/waiting" element={<WaitingOrders />} />
      <Route path="orders/accepted" element = {<AcceptedOrdersShipper />} />
        <Route path="orders/cancelled" element={<CancelledOrdersShipper />} />
        <Route path="orders/completed" element={<CompletedOrdersShipper />} />
        <Route path="orders/failed" element = {<FailedOrderShipper />} />
        <Route path="orders/:orderId" element={<OrderDetailAdmin />} />
        <Route path="profile" element={<ProfileShip />} />
      </Route>
      </Route>
    </Routes>
    </AuthProvider>
  );
};

export default App;