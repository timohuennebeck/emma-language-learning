import "./TutorMinimised.scss";

// images
import profileImg from "../../assets/images/fake-profile.jpg";
import starImg from "../../assets/icons/review-star.png";

// components
import ButtonLink from "../ButtonLink/ButtonLink";

export default function TutorMinimised({ link, text }) {
    return (
        <div className="tutor">
            <div className="tutor__profile">
                <div className="tutor__profile-avatar">
                    <img className="tutor__profile-avatar-img" src={profileImg} alt="" />
                    <div className="tutor__profile-avatar-review">
                        <img className="tutor__profile-avatar-review-img" src={starImg} alt="" />
                        <p className="tutor__profile-avatar-review-rating">4.82</p>
                    </div>
                    <p className="tutor__profile-avatar-lessons">72 Lessons</p>
                </div>
                <div className="tutor__profile-info">
                    <p className="tutor__profile-info-name">
                        Madelaide <span className="tutor__profile-info-name-fade">Beer</span>
                    </p>
                    <p className="tutor__profile-info-location">Madrid, Spain (01:51 PM)</p>
                    <div className="tutor__profile-info-sessions">
                        <div className="tutor__profile-info-sessions-reviews">
                            <p className="tutor__profile-info-sessions-reviews-rating">
                                4.82 Rating
                            </p>

                            <p className="tutor__profile-info-sessions-reviews-amount">
                                72 Lessons
                            </p>
                        </div>
                        <div className="tutor__profile-info-sessions-pricing">
                            <p className="tutor__profile-info-sessions-pricing-amount">
                                11,50 Euro
                            </p>
                            <p className="tutor__profile-info-sessions-pricing-time">
                                60-min Lessons
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tutor__description">
                <div className="tutor__description-desktop">
                    <div className="tutor__description-desktop-indv">
                        <p className="tutor__description-desktop-indv-name">
                            Madelaide{" "}
                            <span className="tutor__description-desktop-indv-name-fade">Beer</span>
                        </p>
                        <div className="tutor__description-desktop-indv-price">11,50 Eur</div>
                    </div>
                    <p className="tutor__description-desktop-location">Madrid, Spain (01:51 PM)</p>
                </div>
                <p className="tutor__description-languages">Languages: English, Spanish, Italian</p>
                <p className="tutor__description-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="tutor__description-read-more">Read More</p>
                <div className="tutor__description-buttons">
                    <div>
                        <ButtonLink link={link} text={text} />
                    </div>
                </div>
            </div>
        </div>
    );
}
