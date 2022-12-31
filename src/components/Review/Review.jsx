import "./Review.scss";

// images
import avatarImg from "../../assets/images/fake-profile-2.jpg";

export default function Review() {
    return (
        <div className="review">
            <div className="review__profile">
                <img className="review__profile-img" src={avatarImg} alt="" />
                <div className="review__profile-person">
                    <p className="review__profile-person-name">Jon James</p>
                    <p className="review__profile-person-lessons">21 - 1:1 Lesson(s)</p>
                </div>
            </div>
            <div className="review__text">
                <p className="review__text-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="review__text-date">11 Dec, 2023</p>
            </div>
        </div>
    );
}
