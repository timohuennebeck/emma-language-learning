import "./TutorPublicProfilePage.scss";

// components
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import Review from "../../components/Review/Review";
import TutorStatistics from "../../components/TutorStatistics/TutorStatistics";
import CalendarElement from "../../components/CalendarElement/CalendarElement";
import Lesson from "../../components/Lesson/Lesson";
import { getReviews, getTeachersId } from "../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TutorPublicProfilePage() {
    const [teachersData, setTeachersData] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getTeachersId({ id }).then(({ data }) => {
            setTeachersData(data[0]);
        });
        getReviews().then(({ data }) => {
            setReviewsData(data.filter((item) => item.teachers_id === Number(id)));
        });
    }, []);

    return (
        <div className="tutor-public">
            <div className="tutor-public__left">
                <TutorMinimised data={teachersData} />
                <TutorStatistics />
                {/* <Lesson /> */}
                {/* <Lesson /> */}
                {/* <Lesson /> */}
                <div className="tutor-public__left-reviews">
                    <p className="tutor-public__left-reviews-header">11 Reviews</p>
                    <div className="tutor-public__left-container-reviews">
                        {reviewsData.map((item) => {
                            return <Review data={item} />;
                        })}
                    </div>
                </div>
            </div>
            <div className="tutor-public__right">
                <div className="tutor-public__right-container">
                    {/* <iframe
                        className="tutor-public__right-container-iframe"
                        title="intrduction"
                        src="https://www.youtube.com/embed/Jmx5Y92Tlk8"
                        frameBorder="0"
                        width="100%"
                        height="360"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe> */}
                </div>
                <CalendarElement />
            </div>
        </div>
    );
}
