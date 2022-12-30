import "./Header.scss";

// images
import hambugerImg from "../../assets/icons/hamburger-menu.svg";
import messagesImg from "../../assets/icons/send.svg";
import openaiImg from "../../assets/icons/open-ai-logo.png";
import logoImg from "../../assets/icons/logo-white-bg.jpg";
import searchImg from "../../assets/icons/search.svg";
import filterImg from "../../assets/icons/slider-circle-h.svg";

import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="header">
            <div className="header__logo">
                <img src={logoImg} alt="" />
            </div>

            <ul className="header__nav">
                <Link to="/messages" className="header__nav-hamburger">
                    <img className="header__nav-hamburger-img" src={hambugerImg} alt="" />
                </Link>
                <Link to="/messages" className="header__nav-messages">
                    <img className="header__nav-messages-img" src={messagesImg} alt="" />
                </Link>
                <Link to="/openai" className="header__nav-openai">
                    <img className="header__nav-openai-img" src={openaiImg} alt="" />
                </Link>
                <Link to="/profile" className="header__nav-profile">
                    <img className="header__nav-profile-img" src={openaiImg} alt="" />
                    <p className="header__nav-profile-greeting">Hello, Madelaide!</p>
                </Link>
            </ul>

            <div className="header__search">
                <div className="header__search-bar">
                    <img className="header__search-bar-img" src={searchImg} alt="" />
                    <input
                        className="header__search-bar-input"
                        placeholder="Search a language..."
                    />
                </div>
                <div className="header__search-mobile">
                    <img className="header__search-mobile-img" src={filterImg} alt="" />
                </div>
                <div className="header__search-desktop"></div>
            </div>
        </nav>
    );
}
