import "./LoggedInInterface.scss";

// components
import Header from "../../components/Header/Header";

// libraries
import { Outlet } from "react-router-dom";
import { getTeachers } from "../../utils/api";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export default function LoggedInInterface() {
    const [teachersData, setTeachersData] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState("English");

    // pulls all teacher profiles from the API
    useEffect(() => {
        getTeachers().then(({ data }) => {
            setTeachersData(data);
        });
    }, []);

    if (!teachersData) {
        return;
    }

    const filteredTutors = teachersData.filter((item) => item.language === currentLanguage);

    return (
        <DataContext.Provider value={{ filteredTutors }}>
            <div className="li-interface">
                <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
                <div className="li-interface__structures">
                    <Outlet />
                </div>
            </div>
        </DataContext.Provider>
    );
}
