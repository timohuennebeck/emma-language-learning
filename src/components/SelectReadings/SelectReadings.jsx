import "./SelectReadings.scss";

// images
import beginnerImg from "../../assets/icons/beginner.svg";
import intermediateImg from "../../assets/icons/intermediate.svg";
import advancedImg from "../../assets/icons/advanced.svg";
import finishedImg from "../../assets/icons/check-blue.svg";
import finishedWhiteImg from "../../assets/icons/check-white.svg";

// components
import { useEffect, useState } from "react";
import { getDictionariesWords, getReadings } from "../../utils/api";

export default function SelectReadings({ readingsData, onClick }) {
    const [hover, setHover] = useState(false);
    const [readings, setReadings] = useState([]);
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        getReadings().then(({ data }) => {
            setReadings(data.filter((item) => item.id === readingsData.id)[0]);
        });
        getDictionariesWords().then(({ data }) => {
            setFlashcards(data.filter((item) => item.language === readingsData.language));
        });
    }, []);

    // checks if the value is undefined or not
    if (!readings.narrative) {
        return;
    }

    // divides the narrative into individual words and then turns them into lower case letters
    const splitNarrative = readings.narrative.split(" ");
    const lowercaseNarrative = splitNarrative.map((item) => item.toLowerCase());

    // returns all flashcards that also occur in the narrative
    const matchingWords = flashcards.filter((item) => {
        const flashcardWord = item.foreign_translation.toLowerCase();

        return lowercaseNarrative.includes(flashcardWord);
    });

    // calculate percentage for the progress bar
    const progressBar = matchingWords.length / lowercaseNarrative.length;
    const progressPercentage = progressBar * 100 + "%";

    // renders the right language leve based on the selected element
    let languageLevel;

    if (readingsData.level === "Beginner (A1)" || readingsData.level === "Beginner (A2)") {
        languageLevel = beginnerImg;
    } else if (
        readingsData.level === "Intermediate (B1)" ||
        readingsData.level === "Intermediate (B2)"
    ) {
        languageLevel = intermediateImg;
    } else {
        languageLevel = advancedImg;
    }

    return (
        <div
            className="select-readings"
            onClick={() => onClick(readingsData)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img src={readingsData.image_url} alt="" className="select-readings-img" />
            <div className="select-readings__right">
                <h3>{readingsData.name}</h3>
                <p className="select-readings__right-narrative">{readingsData.narrative}</p>
                <div className="select-readings__right-box">
                    <div className="select-readings__right-box-progress">
                        <div
                            className={`select-readings__right-box-progress-bar ${
                                hover ? "color-bar" : ""
                            }`}
                            style={{ width: progressPercentage }}
                        ></div>
                    </div>
                    <img src={hover ? finishedWhiteImg : finishedImg} alt="" />
                </div>
                <div className="select-readings__right-level">
                    <>
                        <img
                            src={languageLevel}
                            alt=""
                            className="select-readings__right-level-img"
                        />
                        <p className={hover ? "color-name" : ""}>{readingsData.level}</p>
                    </>
                </div>
            </div>
        </div>
    );
}
