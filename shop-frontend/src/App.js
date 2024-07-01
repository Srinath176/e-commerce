import { BrowserRouter, Route, Routes, useMatches } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar/Navbar';
import ShopCategory from './pages/ShopCategory';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Footer from './components/footer/Footer';
import men_banner from "./components/assets/banner_mens.png";
import women_banner from "./components/assets/banner_women.png";
import kid_banner from "./components/assets/banner_kids.png";
import Product from './pages/Product';
import LoginSignUp from './pages/LoginSignUp';
import PlaceOrder from './pages/PlaceOrder';
import MyOrders from './pages/MyOrders';


function App() {


  return (

    <div className="App">

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/men"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/women"
            element={<ShopCategory banner={women_banner} category="wommen" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kids" />}
          />
          <Route path="product" element={<Product />}>
            <Route path=":productId" element={<Product />}></Route>
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path='/orderpage' element={<PlaceOrder/>}/>
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
