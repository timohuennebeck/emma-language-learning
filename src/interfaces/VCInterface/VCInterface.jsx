import { Outlet } from "react-router-dom";
import "./VCInterface.scss";

export default function VCInterface() {
    return (
        <div className="vc-interface">
            <Outlet />
        </div>
    );
}
