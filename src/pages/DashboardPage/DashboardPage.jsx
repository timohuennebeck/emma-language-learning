import "./DashboardPage.scss";

// components
import ReadingsProgress from "../../components/ReadingsProgress/ReadingsProgress";

// libraries
import { useEffect, useState } from "react";
import { getReadings } from "../../utils/api";

export default function DashboardPage() {
    const [readingsData, setReadingsData] = useState([]);

    // gets all readings from the API
    useEffect(() => {
        getReadings().then(({ data }) => {
            setReadingsData(data);
        });
    }, []);

    return (
        <div className="dashboard">
            {readingsData.map((item) => {
                return <ReadingsProgress readingsData={item} key={item.id} />;
            })}
        </div>
    );
}
