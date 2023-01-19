import "./Header.scss";

// images
import hambugerImg from "../../assets/icons/hamburger-menu.svg";
import messagesImg from "../../assets/icons/send.svg";
import openaiImg from "../../assets/icons/open-ai-logo.png";
import logoImg from "../../assets/icons/logo-white-bg.jpg";
import searchImg from "../../assets/icons/search.svg";
import filterImg from "../../assets/icons/slider-circle-h.svg";
import profileImg from "../../assets/images/fake-profile-2.jpg";

// libraries
import { Link } from "react-router-dom";

// components
import Dropdown from "../Dropdown/Dropdown";

export default function Header() {
    return (
        <nav className="header">
            <div className="header__nav">
                <Link to="/messages" className="header__nav-hamburger">
                    <img className="header__nav-hamburger-img" src={hambugerImg} alt="" />
                </Link>
                <Link to="/messages" className="header__nav-messages">
                    <img className="header__nav-messages-img" src={messagesImg} alt="" />
                </Link>
                <Link to="/emma" className="header__nav-openai">
                    <img className="header__nav-openai-img" src={openaiImg} alt="" />
                </Link>
                <Link to="/tutor/personal" className="header__nav-profile">
                    <img className="header__nav-profile-img" src={profileImg} alt="" />
                    <p className="header__nav-profile-greeting">Hello, Madelaide!</p>
                </Link>
            </div>

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
                <div className="header__search-desktop">
                    <Dropdown />
                    <Dropdown />
                    <Dropdown />
                </div>
            </div>
        </nav>
    );
}
