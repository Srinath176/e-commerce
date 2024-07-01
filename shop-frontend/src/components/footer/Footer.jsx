import "./Footer.css";
import instagram_icon from "../assets/instagram_icon.png";
import pintester_icon from "../assets/pintester_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";

const Footer = () => {

   
    return (
        <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <p>This website is just for my portfolio, it's not a real website.</p>
            <div className="footer-social-icons">
            <img src={instagram_icon} alt="" />
              <img src={pintester_icon} alt="" />
              <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+1-212-456-7890</li>
              <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright @2024 - All rights reserved.</p>
    </div>
  )
    
};

export default Footer;