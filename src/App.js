import './App.css';
import Header from './components/shared/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import SingleProduct from './components/pages/Home/SingleProduct';
import Cart from './components/pages/Cart/Cart';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Blogs from './components/pages/Blogs/Blogs';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import Shop from './components/pages/Shop/Shop';
import Checkout from './components/pages/Checkout/Checkout';
import Error from './components/pages/NotFound/Error';
import OrderComplete from './components/pages/Checkout/OrderComplete';
import { useState } from 'react';
import RequireAuth from './components/pages/Auth/RequireAuth';
import Dashboard from './components/pages/Dashboard/Dashboard';
import MyOrders from './components/pages/Dashboard/User/MyOrders';
import MyProfile from './components/pages/Dashboard/MyProfile';
import Footer from './components/shared/Footer';

function App() {
  const [searchText, setSearchText] = useState('')
  return (
    <div>
      <Header setSearchText={setSearchText} searchText={searchText} />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={
          <RequireAuth>
            <Cart />
          </RequireAuth>
        }></Route>
        <Route path='/product/:id' element={<SingleProduct />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/shop' element={
          <Shop searchText={searchText} setSearchText={setSearchText} />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='/orderComplete' element={<OrderComplete />}></Route>
        <Route path='/*' element={<Error />}></Route>
        <Route path='/dashboard' element={
          <Dashboard />}>
          <Route index element={<MyOrders />}></Route>
          <Route path='profile' element={<MyProfile />}></Route>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
