import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import Card from './Card';
import Detailcard from './Detailcard';
import Search from './Search';
import Buy from './Buy';
import Cart from './Cart';
import Show from './Show';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home1 from './home1';
import Bottom from './Bottom';
import Login from './Admin/Login';
import Dashboard from './Admin/Dashboard';
import Product from './Admin/Product';
import Catagory from './Admin/Category';
import SignUp from './SignUp';
import Address from './Address';
import Order from './Order';
import { Provider } from 'react-redux';
import store from './Redstore';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 

 <Provider store={store}>
  <BrowserRouter>
    <Routes>
    
      <Route exact path="/detailcard" element={<Detailcard/>}></Route>
      <Route exact path="/detailcard/:id" element={<Detailcard/>}></Route>
      <Route exact path="/cart/buy" element={<Buy/>}></Route>
      <Route exact path="/adminlogin" element={<Login/>}></Route>
      <Route exact path="/home" element={<Home1/>}></Route>
      <Route exact path="/bottom" element={<Bottom/>}></Route>
      <Route exact path='/Dashboard' element={<Dashboard/>}></Route>
      <Route exact path='/product' element={<Product/>}></Route>
      <Route exact path='/category' element={<Catagory/>}></Route>
      <Route exact path='/show' element={<Show/>}></Route>
      <Route exact path='/show/:id' element={<Show/>}></Route>
      <Route exact path='/login' element={<App/>} ></Route>
      <Route exact path='/signup' element={<SignUp/>}></Route>
      <Route exact path='/cart/:id' element={<Cart/>}></Route>
      <Route exact path='/cart' element={<Cart/>}></Route>
      <Route exact path='/address' element={<Address/>}></Route>
     <Route exact path='/order' element={<Order/>}></Route>
     <Route exact path='/buy/:id' element={<Buy/>}></Route>
     <Route exact path='/search/:id' element={<Search/>}></Route>
   
   </Routes>
 </BrowserRouter>
 </Provider>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
