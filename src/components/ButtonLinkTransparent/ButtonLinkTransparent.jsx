import "./ButtonLinkTransparent.scss";

import { Link } from "react-router-dom";

export default function ButtonLinkTransparent({ link, text }) {
    return (
        <Link to={link} className="transparent">
            {text}
        </Link>
    );
}
