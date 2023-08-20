import './App.css';
import Header from './components/shared/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
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
import { useEffect, useState } from 'react';
import RequireAuth from './components/pages/Auth/RequireAuth';
import Dashboard from './components/pages/Dashboard/Dashboard';
import MyOrders from './components/pages/Dashboard/User/MyOrders';
import MyProfile from './components/pages/Dashboard/MyProfile';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllOrders from './components/pages/Dashboard/Admin/AllOrders';
import CreateProduct from './components/pages/Dashboard/Admin/CreateProduct';
import ManageProducts from './components/pages/Dashboard/Admin/ManageProducts';
import AllUsers from './components/pages/Dashboard/Admin/AllUsers';
import EditProfile from './components/pages/Dashboard/EditProfile';
import EditProduct from './components/pages/Dashboard/Admin/EditProduct';
import { createTheme, ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommingSoon from './CommingSoon/CommingSoon';
import SingleProduct from './components/pages/SingleProduct/SingleProduct';
import Wishlist from './components/pages/Wishlist/Wishlist';
import { getMe } from './Redux/actions/userActions';

function App() {

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Mulish'
      },
    },
  });

  const [searchText, setSearchText] = useState('')

  const user = useSelector(state => state.allUsers.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header setSearchText={setSearchText} searchText={searchText} />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/wishlist' element={
            <RequireAuth> <Wishlist/> </RequireAuth>
          }></Route>
          <Route path='/cart' element={
            <RequireAuth> <Cart/> </RequireAuth>
          }></Route>
          <Route path='/product/:id' element={<SingleProduct/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/shop' element={
            <Shop searchText={searchText} setSearchText={setSearchText} />}>
          </Route>
          <Route path='/blog' element={<Blogs/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/checkout' element={
          <RequireAuth> <Checkout /> </RequireAuth>
          }></Route>
          <Route path='/orderComplete' element={
          <RequireAuth> <OrderComplete/> </RequireAuth>
          }></Route>
          <Route path='/*' element={<Error/>}></Route>
          <Route path='/soon' element={<CommingSoon/>}></Route>

          <Route path='/dashboard' element={<RequireAuth><Dashboard/> </RequireAuth> }>
            {
              user?.role === 'admin' ?
                <>
                  <Route index element={<CreateProduct/>}></Route>
                  <Route path='orderDetails' element={<AllOrders/>}></Route>
                  <Route path='manageProducts' element={<ManageProducts/>}></Route>
                  <Route path='allUsers' element={<AllUsers/>}></Route>
                  <Route path='editProduct/:id' element={<EditProduct/>}></Route>
                </>
                :
                <Route index element={<MyOrders/>}></Route>
                
            }
            <Route path='profile' element={<RequireAuth> <MyProfile/> </RequireAuth>}></Route>
            <Route path='profile/edit' element={<RequireAuth> <EditProfile/> </RequireAuth>}></Route>
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </ThemeProvider>

  );
}

export default App;
