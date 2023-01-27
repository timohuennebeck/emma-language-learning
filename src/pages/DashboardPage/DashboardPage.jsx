import CourseProgress from "../../components/CourseProgress/CourseProgress";
import "./DashboardPage.scss";

export default function DashboardPage() {
    return (
        <div className="dashboard">
            <CourseProgress />
            <CourseProgress />
            <CourseProgress />
            <CourseProgress />
        </div>
    );
}
