import { useState } from "react";
import "./VCButton.scss";

export default function VCButton({ img, hover, onClick }) {
    const [revealHover, setRevealHover] = useState(false);

    return (
        <div
            className="vc-button"
            onClick={onClick}
            onMouseEnter={() => setRevealHover(true)}
            onMouseLeave={() => setRevealHover(false)}
        >
            <button className={revealHover ? "vc-button__indv toggle-hover" : "vc-button__indv"}>
                <img
                    className={
                        revealHover ? "vc-button__indv-img toggle-img" : "vc-button__indv-img"
                    }
                    src={img}
                    alt=""
                />
                {revealHover ? (
                    <div className="vc-button__indv-hover">
                        <p>{hover}</p>
                    </div>
                ) : null}
            </button>
        </div>
    );
}
