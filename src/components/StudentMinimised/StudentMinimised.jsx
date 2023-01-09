import "./StudentMinimised.scss";

// images
import profileImg from "../../assets/images/fake-profile.jpg";
import starImg from "../../assets/icons/review-star.png";

// components
import ButtonLink from "../ButtonLink/ButtonLink";

export default function StudentMinimised({ link, text }) {
    return (
        <div className="student">
            <div className="student__profile">
                <div className="student__profile-avatar">
                    <img className="student__profile-avatar-img" src={profileImg} alt="" />
                    <p className="student__profile-avatar-lessons">72 Lessons</p>
                </div>
                <div className="student__profile-info">
                    <p className="student__profile-info-name">
                        Madelaide <span className="student__profile-info-name-fade">Beer</span>
                    </p>
                    <p className="student__profile-info-location">Madrid, Spain (01:51 PM)</p>
                    <div className="student__profile-info-sessions">
                        <div className="student__profile-info-sessions-reviews">
                            <p className="student__profile-info-sessions-reviews-rating">
                                4.82 Rating
                            </p>

                            <p className="student__profile-info-sessions-reviews-amount">
                                72 Lessons
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="student__description">
                <div className="student__description-desktop">
                    <div className="student__description-desktop-indv">
                        <p className="student__description-desktop-indv-name">
                            Madelaide{" "}
                            <span className="student__description-desktop-indv-name-fade">Beer</span>
                        </p>
                    </div>
                    <p className="student__description-desktop-location">Madrid, Spain (01:51 PM)</p>
                </div>
                <p className="student__description-languages">Languages: English, Spanish, Italian</p>
                <p className="student__description-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="student__description-read-more">Read More</p>
            </div>
        </div>
    );
}
