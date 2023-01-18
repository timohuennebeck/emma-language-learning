import "./ButtonLink.scss";

import { Link } from "react-router-dom";

export default function ButtonLink({ data }) {
    return (
        <Link to={`/tutor/${data.id}`} className="button">
            {`Visit ${data.first_name} ${data.last_name}'s Profile`}
        </Link>
    );
}
