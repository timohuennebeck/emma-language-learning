import "./TutorMinimised.scss";

// images
import profileImg from "../../assets/images/fake-profile.jpg";
import starImg from "../../assets/icons/review-star.png";

// components
import ButtonLink from "../ButtonLink/ButtonLink";

export default function TutorMinimised({ data }) {

    console.log(data);

    return (
        <div className="tutor">
            <div className="tutor__profile">
                <div className="tutor__profile-avatar">
                    <img className="tutor__profile-avatar-img" src={data.image_url} alt="" />
                    <div className="tutor__profile-avatar-review">
                        <img className="tutor__profile-avatar-review-img" src={starImg} alt="" />
                        <p className="tutor__profile-avatar-review-rating">4.82</p>
                    </div>
                    <p className="tutor__profile-avatar-lessons">72 Lessons</p>
                </div>
                <div className="tutor__profile-info">
                    <p className="tutor__profile-info-name">
                        {data.first_name}{" "}
                        <span className="tutor__profile-info-name-fade">{data.last_name}</span>
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
                                {data.rate_per_hour} Euro
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
                            {data.first_name}{" "}
                            <span className="tutor__description-desktop-indv-name-fade">
                                {data.last_name}
                            </span>
                        </p>
                        <div className="tutor__description-desktop-indv-price">
                            {data.rate_per_hour} Eur
                        </div>
                    </div>
                    <p className="tutor__description-desktop-location">Madrid, Spain (01:51 PM)</p>
                </div>
                <p className="tutor__description-languages">Languages: English, Spanish, Italian</p>
                <p className="tutor__description-text">{data.description}</p>
                <p className="tutor__description-read-more">Read More</p>
                <div className="tutor__description-buttons">
                    <div>
                        <ButtonLink data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}
