import "./BrowseTutorsPage.scss";

// components
import CalendarElement from "../../components/CalendarElement/CalendarElement";
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";

// libraries
import { useContext, useState } from "react";
import { DataContext } from "../../interfaces/LoggedInInterface/LoggedInInterface";

export default function BrowseTutorsPage() {
    const [showSchedule, setShowSchedule] = useState(false);

    const { filteredTutors } = useContext(DataContext);

    if (!filteredTutors) {
        return;
    }

    return (
        <div className="home">
            <div className="home__tutors" onMouseEnter={() => setShowSchedule(true)}>
                {filteredTutors.map((item) => {
                    return <TutorMinimised data={item} key={item.id} />;
                })}
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
                            allowFullScreen
                        ></iframe>
                    </div>
                    <CalendarElement />
                </div>
            )}
        </div>
    );
}
