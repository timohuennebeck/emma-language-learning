import "./TutorStatistics.scss";

// images
import starImg from "../../assets/icons/review-star.png";

export default function TutorStatistics() {
    return (
        <div className="statistics">
            <div className="statistics__rating">
                <div className="statistics__rating-container">
                    <img className="statistics__rating-container-img" src={starImg} alt="" />
                    <p className="statistics__rating-container-amount">4.72</p>
                </div>
                <p>Rating</p>
            </div>
            <div className="statistics__students">
                <p className="statistics--bold">20</p>
                <p>Students</p>
            </div>
            <div className="statistics__lessons">
                <p className="statistics--bold">32</p>
                <p>Lessons</p>
            </div>
            <div className="statistics__attendance">
                <p className="statistics--bold">97%</p>
                <p>Attendance Rate</p>
            </div>
            <div className="statistics__response">
                <p className="statistics--bold">100%</p>
                <p>Response</p>
            </div>
        </div>
    );
}
