import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div id="header">
      <div id="logo">
        <img src={LOGO_URL} alt="logo" className="logoImage" />
      </div>
      <div id="navigation">
        <ul className="navigation-item">
          <li>Home</li>
          <li>About Us</li>
          <li>Contact US</li>
          <li>Cart</li>
          <li>
            <button
              className="loginLogout"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "LOGIN" : "LOGOUT"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
