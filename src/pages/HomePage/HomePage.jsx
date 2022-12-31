import "./HomePage.scss";

// components
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import CalendarElement from "../../components/CalendarElement/CalendarElement";
import Review from "../../components/Review/Review";
import TutorStatistics from "../../components/TutorStatistics/TutorStatistics";

export default function HomePage() {
    return (
        <div className="home">
            <div className="home__tutors">
                <TutorMinimised />
                <TutorMinimised />
                <TutorStatistics />
                <div className="home__tutors-reviews">
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>
            <div className="home__calendar">
                <CalendarElement />
            </div>
        </div>
    );
}
