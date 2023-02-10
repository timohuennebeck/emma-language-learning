import "./NewFlashcard.scss";

// images
import ukImg from "../../assets/languages/united kingdom.svg";

import beginnerImg from "../../assets/icons/beginner.svg";
import beginnerWhiteImg from "../../assets/icons/beginner-white.svg";

import intermediateImg from "../../assets/icons/intermediate.svg";
import intermediateWhiteImg from "../../assets/icons/intermediate-white.svg";

import advancedImg from "../../assets/icons/advanced.svg";
import advancedWhiteImg from "../../assets/icons/advanced-white.svg";

import infoImg from "../../assets/icons/Info.svg";

// components
import InputField from "../InputField/InputField";

// libraries
import { useState } from "react";
import { addDictionariesWords } from "../../utils/api";
import { useParams } from "react-router-dom";

export default function NewFlashcard({
    flags,
    deckData,
    updateList,
    setUpdateList,
    setToggleUpload,
}) {
    const [flashcard, setFlashcard] = useState({ english: "", foreign_translation: "", level: "" });
    const [highlightLevel, setHiglightLevel] = useState("");
    const [triggerError, setTriggerError] = useState(false);

    const { id } = useParams();

    // gets the level value and pushes it into the flashcard object
    const handleLevelClick = (level) => {
        setFlashcard({ ...flashcard, level });

        // sets the to-be-highlighted box
        setHiglightLevel(level);
    };

    // pulls the values from the input fields and inserts them into the flashcard object
    const handleInputChange = (event) => {
        setFlashcard({ ...flashcard, [event.target.name]: event.target.value });
    };

    // brings all required values together and uploads them to the sql database
    const handleSubmit = (event) => {
        event.preventDefault();

        const userWord = {
            dictionaries_id: id,
            english: flashcard.english,
            foreign_translation: flashcard.foreign_translation,
            level: flashcard.level,
            language: deckData.language,
        };

        if (!userWord.english || !userWord.foreign_translation || !userWord.level) {
            // shows an error message if one of the fields is not filled out
            setTriggerError(true);

            // hides the error message after 2.5 seconds
            setTimeout(() => {
                setTriggerError(false);
            }, [3000]);
        } else {
            // makes the api post request to the sql database
            addDictionariesWords({ userWord }).then(() => {
                setUpdateList(!updateList);
                setFlashcard({ english: "", foreign_translation: "", level: "" });
                setHiglightLevel("");
                setToggleUpload(true);

                setTimeout(() => {
                    setToggleUpload(false); 
                }, [3000]);
            });
        }
    };

    return (
        <form className="new-flashcard" onSubmit={handleSubmit}>
            <div className="new-flashcard__languages">
                <div className="new-flashcard__languages-foreign">
                    <div className="new-flashcard__languages-foreign-indv">
                        <img
                            className="new-flashcard__languages-foreign-indv-img"
                            src={ukImg}
                            alt=""
                        />
                    </div>
                    <InputField name="english" onChange={handleInputChange} flashcard={flashcard} />
                </div>

                <div className="new-flashcard__languages-foreign">
                    <div className="new-flashcard__languages-foreign-indv">
                        <img
                            className="new-flashcard__languages-foreign-indv-img"
                            src={flags}
                            alt=""
                        />
                    </div>
                    <InputField
                        name="foreign_translation"
                        onChange={handleInputChange}
                        flashcard={flashcard}
                    />
                </div>
            </div>

            <div className="new-flashcard__nav">
                <div className="new-flashcard__nav-level">
                    <div
                        name="level"
                        className={
                            highlightLevel === "1"
                                ? "new-flashcard__nav-level-indv active-level"
                                : "new-flashcard__nav-level-indv"
                        }
                        onClick={() => handleLevelClick("1")}
                    >
                        <img
                            className="new-flashcard__nav-level-indv-img"
                            src={highlightLevel === "1" ? beginnerWhiteImg : beginnerImg}
                            alt=""
                        />
                    </div>
                    <div
                        name="level"
                        className={
                            highlightLevel === "2"
                                ? "new-flashcard__nav-level-indv active-level"
                                : "new-flashcard__nav-level-indv"
                        }
                        onClick={() => handleLevelClick("2")}
                    >
                        <img
                            className="new-flashcard__nav-level-indv-img"
                            src={highlightLevel === "2" ? intermediateWhiteImg : intermediateImg}
                            alt=""
                        />
                    </div>
                    <div
                        name="level"
                        className={
                            highlightLevel === "3"
                                ? "new-flashcard__nav-level-indv active-level"
                                : "new-flashcard__nav-level-indv"
                        }
                        onClick={() => handleLevelClick("3")}
                    >
                        <img
                            className="new-flashcard__nav-level-indv-img"
                            src={highlightLevel === "3" ? advancedWhiteImg : advancedImg}
                            alt=""
                        />
                    </div>
                </div>

                <div className="new-flashcard__nav-buttons">
                    {triggerError && (
                        <div className="new-flashcard__nav-buttons-error">
                            <img
                                className="new-flashcard__nav-buttons-error-img"
                                src={infoImg}
                                alt=""
                            />
                            <p className="new-flashcard__nav-buttons-error-message">
                                You are stilling missing a field(s)...
                            </p>
                        </div>
                    )}

                    <button className="new-flashcard__nav-buttons-indv">+ Add Word</button>
                </div>
            </div>
        </form>
    );
}
