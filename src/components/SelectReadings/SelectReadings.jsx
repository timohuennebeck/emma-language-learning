import "./SelectReadings.scss";

// images
import beginnerImg from "../../assets/icons/beginner.svg";
import intermediateImg from "../../assets/icons/intermediate.svg";
import advancedImg from "../../assets/icons/advanced.svg";
import emojiImg from "../../assets/images/emoji.jpg";
import { useState } from "react";

export default function SelectReadings({ data, onClick }) {
    const [selectText, setSelectText] = useState(false);

    let languageLevel;
    if (data.level === "Beginner (A1)" || data.level === "Beginner (A2)") {
        languageLevel = beginnerImg;
    } else if (data.level === "Intermediate (B1)" || data.level === "Intermediate (B2)") {
        languageLevel = intermediateImg;
    } else {
        languageLevel = advancedImg;
    }

    return (
        <div className="select-readings">
            <img src={data.image_url} alt="" className="select-readings-img" />
            <div className="select-readings__right">
                <h3>{data.name}</h3>
                <p className="select-readings__right-narrative">{data.narrative}</p>
                <div className="select-readings__right-bar">
                    <div className="select-readings__right-bar-progress"></div>
                </div>
                <div
                    className="select-readings__right-level"
                    onMouseEnter={() => setSelectText(true)}
                    onMouseLeave={() => setSelectText(false)}
                    onClick={() => onClick(data)}
                >
                    {selectText ? (
                        <p>Yes, I want to read this.</p>
                    ) : (
                        <>
                            <img
                                src={languageLevel}
                                alt=""
                                className="select-readings__right-level-img"
                            />
                            <p>{data.level}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
