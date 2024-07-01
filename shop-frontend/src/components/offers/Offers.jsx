import "./Offers.css";
import exclusive_image from "../assets/exclusive_image.png";


const Offers = () => {

    return (
        <div className="offers">
            <div className="offers-left">
                <h1>Exclusive Offers For You</h1>
                <p>Sign Up And Get Started With Our Latest Collections</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt="" />
            </div>
        </div>
    );
};

export default Offers;