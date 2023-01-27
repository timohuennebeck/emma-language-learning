import "./CourseProgress.scss";

import ukImg from "../../assets/languages/united kingdom.svg";
import { Link } from "react-router-dom";

export default function CourseProgress() {
    return (
        <Link className="course-progress" to="/courses">
            <div className="course-progress__level">
                <img src={ukImg} alt="" className="course-progress__level-img" />
                <div className="course-progress__level-cefr">
                    <p className="course-progress__level-cefr-indv">B1</p>
                </div>
            </div>
            <div className="course-progress__language">
                <p className="course-progress__language-name">Beginner English</p>
                <p className="course-progress__language-course">... "Exploring The Future of AI"</p>
                <p className="course-progress__language-words">21% Finished</p>
                <div className="course-progress__language-bar">
                    <div className="course-progress__language-bar-progress"></div>
                </div>
            </div>
        </Link>
    );
}
