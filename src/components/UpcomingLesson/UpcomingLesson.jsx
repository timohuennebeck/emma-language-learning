import "./UpcomingLesson.scss";

// images
import userImg from "../../assets/images/fake-profile-2.jpg";

// components
import ButtonLink from "../ButtonLink/ButtonLink";

export default function UpcomingLesson() {
    return (
        <div className="upcoming">
            <div className="upcoming__container">
                <div className="upcoming__container-left">
                    <img className="upcoming__container-left-img" src={userImg} alt="" />
                    <p className="upcoming__container-left-lessons">72 Lessons</p>
                </div>
                <div className="upcoming__container-right">
                    <p className="upcoming__container-right-name">
                        Madelaide <span className="upcoming__container-right-name-bold"> Beer</span>
                    </p>
                    <p className="upcoming__container-right-location">Madrid, Spain</p>
                    <p className="upcoming__container-right-lessons">1:1 Lesson (A2 - A1)</p>
                    <p className="upcoming__container-right-time">03:00PM (GMT+1)</p>
                </div>
            </div>
            <ButtonLink link="/profile" text="Confirm Lesson" />
        </div>
    );
}
