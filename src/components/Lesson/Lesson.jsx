import ButtonLink from "../ButtonLink/ButtonLink";
import "./Lesson.scss";

export default function Lesson() {
    return (
        <div className="lesson">
            <div className="lesson__name">
                <p className="lesson__name-header">1:1 Lesson (A2 - A1)</p>
                <p className="lesson__name-lessons">47 Lesson Completed</p>
            </div>
            <div className="lesson__button">
                <ButtonLink text="Schedule 1:1 Lesson (A2 - A1)" />
            </div>
        </div>
    );
}
