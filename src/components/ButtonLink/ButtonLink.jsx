import "./ButtonLink.scss";

import { Link } from "react-router-dom";

export default function ButtonLink({ link, text }) {
    return (
        <Link to={link}className="button">
            {text}
        </Link>
    );
}
