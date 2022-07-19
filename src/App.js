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

function App() {
  return (
    <div>
      <Header/>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/product/:id' element={<SingleProduct/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/shop' element={<Shop/>}></Route>
          <Route path='/blogs' element={<Blogs/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
