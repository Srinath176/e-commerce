import './NavBar.css';
import cart_icon from '../assets/cart_icon.png'
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import down_arrow from '../assets/down_arrow.png'
import wishlist_icon from '../assets/wishlist_icon.png'
import profile_icon from '../assets/profile_icon.png'
import search_icon from '../assets/search_icon.png'



const NavBar = () => {

    const [menu, setMenu] = useState("shop")
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef()

    const dropdown_toggle = (e) => {

        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <p>SG</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={down_arrow} alt=''></img>
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => setMenu("shop")}>
                    <Link style={{ textDecoration: "none" }} to='/'>Shop </Link> {menu === "shop" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("men")}>
                    <Link style={{ textDecoration: "none" }} to='/men'>Men </Link> {menu === "men" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("women")}>
                    <Link style={{ textDecoration: "none" }} to='/women'>Women </Link> {menu === "women" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link style={{ textDecoration: "none" }} to='/kids'>Kids </Link>{menu === "kids" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                <img src={search_icon} alt=''/>
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to='/login'><button>Login</button></Link>}
                <Link to='/wishlist'><img className='wishlist-icon' src={wishlist_icon} alt=''/></Link>
                <Link to='/cart'><img src={cart_icon} alt='' /></Link>
                <Link to='/profile'><img className='profile-icon' src={profile_icon} alt=''/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>

    )
}


export default NavBar