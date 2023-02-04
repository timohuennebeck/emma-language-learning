import "./LanguageFlagDropdown.scss";

// components

// flags
import ukImg from "../../assets/languages/united kingdom.svg";
import franceImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";
import { useState } from "react";

export default function LanguageFlagDropdown({
    currentLanguage,
    currentTranslation,
    setCurrentTranslation,
}) {
    const [revealHover, setRevealHover] = useState(false);

    console.log(currentLanguage);

    const languages = ["English", "French", "Spanish", "German"];
    const filteredLanguages = languages.filter(
        (item) => item !== currentTranslation && item !== currentLanguage
    );

    console.log(filteredLanguages);

    let flag;

    switch (currentTranslation) {
        case "French":
            flag = franceImg;
            break;
        case "Spanish":
            flag = spainImg;
            break;
        case "German":
            flag = germanyImg;
            break;
        default:
            flag = ukImg;
            break;
    }

    return (
        <div className="language-flag" onClick={() => setRevealHover(!revealHover)}>
            <div className="language-flag__main">
                <img className="language-flag__main-img" src={flag} alt="" />
            </div>

            {revealHover ? (
                <div className="language-flag__hover">
                    {filteredLanguages.map((item) => {
                        let dropdownFlag;

                        switch (item) {
                            case "French":
                                dropdownFlag = franceImg;
                                break;
                            case "Spanish":
                                dropdownFlag = spainImg;
                                break;
                            case "German":
                                dropdownFlag = germanyImg;
                                break;
                            default:
                                dropdownFlag = ukImg;
                                break;
                        }

                        return (
                            <div
                                className="language-flag__hover-box"
                                onClick={() => setCurrentTranslation(item)}
                                key={item}
                            >
                                <img
                                    className="language-flag__hover-box-img"
                                    src={dropdownFlag}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}
