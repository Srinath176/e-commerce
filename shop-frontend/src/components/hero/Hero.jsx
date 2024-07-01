import "./Hero.css";
import arrow_icon from "../assets/arrow.png";
import hero_image from "../assets/hero_image.png";


const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-left">
                <h2>Enjoy 80% Off In Our Winter Sale</h2>
                <div>
                    <p>Ultimate Street Fashion Destination</p>
                </div>
                <span>Explore street fashion and elevate your wardrobe Today with Exclusive discounts.</span>
                <div className="hero-latest-btn">
                    <div>Shop Now</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />
            </div>
        </div>
    );
};

export default Hero;