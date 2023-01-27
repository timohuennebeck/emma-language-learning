import ReadingsProgress from "../../components/ReadingsProgress/ReadingsProgress";
import "./DashboardPage.scss";

export default function DashboardPage() {
    return (
        <div className="dashboard">
            <ReadingsProgress />
            <ReadingsProgress />
            <ReadingsProgress />
            <ReadingsProgress />
        </div>
    );
}
