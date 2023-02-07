import "./NavLinkButton.scss";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavLinkButton({ link, hover, img, onClick }) {
    const [brightness, setBrightness] = useState(false);

    return (
        <div className="nav-link">
            <div
                className="nav-link__button"
                onMouseEnter={() => setBrightness(true)}
                onMouseLeave={() => setBrightness(false)}
                onClick={onClick}
            >
                <Link className="nav-link__button-link" to={link}>
                    <img
                        src={img}
                        alt=""
                        className={
                            brightness
                                ? "nav-link__button-link-img active-hover"
                                : "nav-link__button-link-img"
                        }
                    />
                </Link>
            </div>
            <p className={brightness ? "nav-link-hide" : "nav-link-hide no-element"}>{hover}</p>
        </div>
    );
}
