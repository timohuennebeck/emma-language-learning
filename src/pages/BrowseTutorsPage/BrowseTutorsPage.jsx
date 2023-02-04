import "./BrowseTutorsPage.scss";

// components
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import CalendarElement from "../../components/CalendarElement/CalendarElement";

// components
import { useEffect, useState } from "react";
import { getTeachers, getUsers } from "../../utils/api";

export default function BrowseTutorsPage() {
    const [teachersData, setTeachersData] = useState([]);
    const [showSchedule, setShowSchedule] = useState(false);

    // pulls all teacher profiles from the API
    useEffect(() => {
        getTeachers().then(({ data }) => {
            setTeachersData(data);
        });
    }, []);

    return (
        <div className="home">
            <div className="home__tutors" onMouseEnter={() => setShowSchedule(true)}>
                {teachersData.map((item) => {
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
                            allowfullscreen
                        ></iframe>
                    </div>
                    <CalendarElement />
                </div>
            )}
        </div>
    );
}
