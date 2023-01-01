import "./HomePage.scss";

// components
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import CalendarElement from "../../components/CalendarElement/CalendarElement";

// components
import { useState } from "react";

export default function HomePage() {
    const [showSchedule, setShowSchedule] = useState(false);

    return (
        <div className="home">
            <div className="home__tutors" onMouseEnter={() => setShowSchedule(true)}>
                <TutorMinimised />
                <TutorMinimised />
            </div>
            {showSchedule && (
                <div className="home__calendar">
                    <div className="home__calendar-container">
                        <iframe
                            className="home__calendar-container-iframe"
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
            )}
        </div>
    );
}
