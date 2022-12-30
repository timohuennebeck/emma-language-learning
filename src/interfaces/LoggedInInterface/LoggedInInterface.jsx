import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./LoggedInInterface.scss";

export default function LoggedInInterface() {
    return (
        <div className="li-interface">
            <Header />
            <div className="li-interface__structures">
                <Outlet />
            </div>
        </div>
    );
}
