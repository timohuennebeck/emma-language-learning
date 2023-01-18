import "./Review.scss";

// images
import avatarImg from "../../assets/images/fake-profile-2.jpg";

export default function Review({ data }) {
    console.log(data);

    return (
        <div className="review">
            <div className="review__profile">
                <img className="review__profile-img" src={data.image_url} alt="" />
                <div className="review__profile-person">
                    <p className="review__profile-person-name">
                        {data.first_name} {data.last_name}
                    </p>
                    <p className="review__profile-person-lessons">21 - 1:1 Lesson(s)</p>
                </div>
            </div>
            <div className="review__text">
                <p className="review__text-content">{data.message}</p>
                <p className="review__text-date">11 Dec, 2023</p>
            </div>
        </div>
    );
}
