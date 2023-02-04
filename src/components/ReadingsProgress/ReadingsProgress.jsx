import "./ReadingsProgress.scss";

// components

// libraries
import { Link } from "react-router-dom";

// flags
import frImg from "../../assets/languages/france.svg";
import esImg from "../../assets/languages/spain.svg";
import deImg from "../../assets/languages/germany.svg";
import ukImg from "../../assets/languages/united kingdom.svg";

// components
import { useEffect, useState } from "react";
import { getDictionariesWords, getReadings } from "../../utils/api";

export default function ReadingsProgress({ readingsData }) {
    const [readings, setReadings] = useState([]);
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        // gets all readings
        getReadings().then(({ data }) => {
            setReadings(data.filter((item) => item.id === readingsData.id)[0]);
        });

        // gets all flashcards
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
    const progressPercentage = (progressBar * 100).toFixed(0) + "%";

    // finds the correct language level and then removes the text
    let languageLevel;

    switch (readingsData.level) {
        case "Beginner (A1)":
            languageLevel = "A1";
            break;
        case "Beginner (A2)":
            languageLevel = "A2";
            break;
        case "Intermediate (B2)":
            languageLevel = "B2";
            break;
        case "Intermediate (B1)":
            languageLevel = "B1";
            break;
        case "Advanced (C1)":
            languageLevel = "C1";
            break;
        case "Advanced (C2)":
            languageLevel = "C2";
            break;
        default:
            languageLevel = "No Language Level Found";
            break;
    }

    // assigns the right flag, background color and font color to each language
    let languageFlag;
    let backgroundColor;
    let fontColor;

    switch (readingsData.language) {
        case "French":
            languageFlag = frImg;
            backgroundColor = "#E7F8FF";
            fontColor = "#1BAAE7";
            break;
        case "Spanish":
            languageFlag = esImg;
            backgroundColor = "#FFEEE3";
            fontColor = "#F4835D";
            break;
        case "German":
            languageFlag = deImg;
            backgroundColor = "#F0E7FB";
            fontColor = "#6E43C9";
            break;
        default:
            languageFlag = ukImg;
            break;
    }

    return (
        <Link className="readings-progress" to="/readings">
            <div className="readings-progress__level">
                <img src={languageFlag} alt="" className="readings-progress__level-img" />
                <div className="readings-progress__level-cefr" style={{ backgroundColor }}>
                    <p className="readings-progress__level-cefr-indv" style={{ color: fontColor }}>
                        {languageLevel}
                    </p>
                </div>
            </div>
            <div className="readings-progress__language">
                <p className="readings-progress__language-name">{readingsData.status}</p>
                <p className="readings-progress__language-readings">{readingsData.name}</p>
                <p className="readings-progress__language-words" style={{ color: fontColor }}>
                    {`${progressPercentage} Finished`}
                </p>
                {/* shows the process of the progress bar */}
                <div className="readings-progress__language-bar">
                    <div
                        className="readings-progress__language-bar-progress"
                        style={{ backgroundColor: fontColor, width: progressPercentage }}
                    ></div>
                </div>
            </div>
        </Link>
    );
}
