import "./HomePage.scss";

// components
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import CalendarElement from "../../components/CalendarElement/CalendarElement";

export default function HomePage() {
    return (
        <div className="home">
            <div className="home__tutors">
                <TutorMinimised />
                <TutorMinimised />
            </div>
            <div className="home__calendar">
                <CalendarElement />
            </div>
        </div>
    );
}
