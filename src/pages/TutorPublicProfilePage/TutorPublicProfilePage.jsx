import "./TutorPublicProfilePage.scss";

// components
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import Review from "../../components/Review/Review";
import TutorStatistics from "../../components/TutorStatistics/TutorStatistics";
import CalendarElement from "../../components/CalendarElement/CalendarElement";
import Lesson from "../../components/Lesson/Lesson";

export default function TutorPublicProfilePage() {
    return (
        <div className="tutor-public">
            <div className="tutor-public__left">
                <TutorMinimised />
                <TutorStatistics />
                <Lesson />
                <Lesson />
                <Lesson />
                <div className="tutor-public__left-reviews">
                    <p className="tutor-public__left-reviews-header">11 Reviews</p>
                    <div className="tutor-public__left-container-reviews">
                        <Review />
                        <Review />
                        <Review />
                    </div>
                </div>
            </div>
            <div className="tutor-public__right">
                <div className="tutor-public__right-container">
                    <iframe
                        className="tutor-public__right-container-iframe"
                        title="intrduction"
                        src="https://www.youtube.com/embed/Jmx5Y92Tlk8"
                        frameborder="0"
                        width="100%"
                        height="360"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
                <CalendarElement />
            </div>
        </div>
    );
}
