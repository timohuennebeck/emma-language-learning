import "./ReadingsProgress.scss";

import ukImg from "../../assets/languages/united kingdom.svg";
import { Link } from "react-router-dom";

export default function ReadingsProgress() {
    return (
        <Link className="readings-progress" to="/readings">
            <div className="readings-progress__level">
                <img src={ukImg} alt="" className="readings-progress__level-img" />
                <div className="readings-progress__level-cefr">
                    <p className="readings-progress__level-cefr-indv">B1</p>
                </div>
            </div>
            <div className="readings-progress__language">
                <p className="readings-progress__language-name">Beginner English</p>
                <p className="readings-progress__language-readings">... "Exploring The Future of AI"</p>
                <p className="readings-progress__language-words">21% Finished</p>
                <div className="readings-progress__language-bar">
                    <div className="readings-progress__language-bar-progress"></div>
                </div>
            </div>
        </Link>
    );
}
