import "./Header.scss";

// images
import hamburgerImg from "../../assets/icons/hamburger-menu.svg";
import searchImg from "../../assets/icons/search.svg";
import filterImg from "../../assets/icons/slider-circle-h.svg";

// libraries
import { Link } from "react-router-dom";

// components
import Dropdown from "../Dropdown/Dropdown";

export default function Header({ currentLanguage, setCurrentLanguage }) {
    return (
        <nav className="header">
            <div className="header__nav">
                <Link to="/messages" className="header__nav-hamburger">
                    <img className="header__nav-hamburger-img" src={hamburgerImg} alt="" />
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
                    <Dropdown
                        currentLanguage={currentLanguage}
                        setCurrentLanguage={setCurrentLanguage}
                    />
                </div>
            </div>
        </nav>
    );
}
