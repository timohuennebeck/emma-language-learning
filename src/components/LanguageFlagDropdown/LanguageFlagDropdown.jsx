import "./LanguageFlagDropdown.scss";

// components


// flags
import ukImg from "../../assets/languages/united kingdom.svg";
import franceImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";
import { useState } from "react";

export default function LanguageFlagDropdown() {
    const [revealHover, setRevealHover] = useState(false);

    return (
        <div className="language-flag" onClick={() => setRevealHover(!revealHover)}>
            <div className="language-flag__main">
                <img className="language-flag__main-img" src={ukImg} alt="" />
            </div>

            {revealHover ? (
                <div className="language-flag__hover">
                    <div className="language-flag__hover-box">
                        <img className="language-flag__main-img" src={franceImg} alt="" />
                    </div>
                    <div className="language-flag__hover-box">
                        <img className="language-flag__main-img" src={spainImg} alt="" />
                    </div>
                    <div className="language-flag__hover-box">
                        <img className="language-flag__main-img" src={germanyImg} alt="" />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
