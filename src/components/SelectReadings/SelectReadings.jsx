import "./SelectReadings.scss";

// images
import beginnerImg from "../../assets/icons/beginner.svg";
import intermediateImg from "../../assets/icons/intermediate.svg";
import advancedImg from "../../assets/icons/advanced.svg";
import finishedImg from "../../assets/icons/check-blue.svg";
import { useEffect, useState } from "react";
import { getDictionariesWords, getReadings } from "../../utils/api";

export default function SelectReadings({ readingsData, onClick }) {
    const [selectText, setSelectText] = useState(false);
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

    if (!readings.narrative) {
        return;
    }

    const splitNarrative = readings.narrative.split(" ");
    const lowercaseNarrative = splitNarrative.map((item) => item.toLowerCase());

    const matchingWords = flashcards.filter((item) => {
        const flashcardWord = item.foreign_translation.toLowerCase();
        return lowercaseNarrative.includes(flashcardWord) && item.level === 0;
    });

    // calculate percentage for the progress bar
    const progressBar = matchingWords.length / flashcards.length;
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
        <div className="select-readings">
            <img src={readingsData.image_url} alt="" className="select-readings-img" />
            <div className="select-readings__right">
                <h3>{readingsData.name}</h3>
                <p className="select-readings__right-narrative">{readingsData.narrative}</p>
                <div className="select-readings__right-box">
                    <div className="select-readings__right-box-progress">
                        <div
                            className="select-readings__right-box-progress-bar"
                            style={{ width: progressPercentage }}
                        ></div>
                    </div>
                    <img src={finishedImg} alt="" />
                </div>
                <div
                    className="select-readings__right-level"
                    onMouseEnter={() => setSelectText(true)}
                    onMouseLeave={() => setSelectText(false)}
                    onClick={() => onClick(readingsData)}
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
                            <p>{readingsData.level}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
