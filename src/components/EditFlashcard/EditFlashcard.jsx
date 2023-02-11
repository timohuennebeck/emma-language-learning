import "./EditFlashcard.scss";

import ukImg from "../../assets/languages/united kingdom.svg";

import beginnerImg from "../../assets/icons/beginner.svg";
import beginnerWhiteImg from "../../assets/icons/beginner-white.svg";

import intermediateImg from "../../assets/icons/intermediate.svg";
import intermediateWhiteImg from "../../assets/icons/intermediate-white.svg";

import advancedImg from "../../assets/icons/advanced.svg";
import advancedWhiteImg from "../../assets/icons/advanced-white.svg";

// libraries
import { useState } from "react";

// api calls
import { updateDictionariesWords } from "../../utils/api";

export default function EditFlashcard({ indvWords, currentLanguage, setToggleMessage }) {
    const [highlightLevel, setHiglightLevel] = useState(indvWords.level);

    const [flashcardWord, setFlashcardWord] = useState({
        id: indvWords.level,
        dictionaries_id: indvWords.dictionaries_id,
        english: indvWords.english,
        foreign_translation: indvWords.foreign_translation,
        level: indvWords.level,
    });

    const changeLevel = (event) => {
        setFlashcardWord({ ...flashcardWord, level: event });
        setHiglightLevel(event);
    };

    // allows the user to change the words
    const handleChange = (event) => {
        setFlashcardWord({ ...flashcardWord, [event.target.name]: event.target.value });
    };

    // receives all values on submission and then sends them to the sql database
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!indvWords) {
            return;
        }

        const userWord = {
            id: indvWords.id,
            dictionaries_id: flashcardWord.dictionaries_id,
            english: flashcardWord.english,
            foreign_translation: flashcardWord.foreign_translation,
            level: flashcardWord.level,
        };

        updateDictionariesWords({ userWord })
            .then(() => {
                setToggleMessage(true);

                setTimeout(() => {
                    setToggleMessage(false);
                }, [2500]);
            })
            .catch((err) => {
                console.error(`There has been an error! ${err}`);
            });
    };

    return (
        <form className="edit-flashcard" onSubmit={handleSubmit}>
            <div className="edit-flashcard__languages">
                <div className="edit-flashcard__languages-foreign">
                    <div className="edit-flashcard__languages-foreign-indv">
                        <img
                            className="edit-flashcard__languages-foreign-indv-img"
                            src={ukImg}
                            alt=""
                        />
                    </div>
                    <div className="edit-flashcard__languages-foreign-input">
                        <p className="edit-flashcard__languages-foreign-input-title">Term</p>
                        <input
                            className="edit-flashcard__languages-foreign-input-indv"
                            placeholder="Insert Term..."
                            name="english"
                            value={flashcardWord.english}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="edit-flashcard__languages-foreign">
                    <div className="edit-flashcard__languages-foreign-indv">
                        <img
                            className="edit-flashcard__languages-foreign-indv-img"
                            src={currentLanguage}
                            alt=""
                        />
                    </div>
                    <div className="edit-flashcard__languages-foreign-input">
                        <p className="edit-flashcard__languages-foreign-input-title">Definition</p>
                        <input
                            className="edit-flashcard__languages-foreign-input-indv"
                            placeholder="Insert Term..."
                            name="foreign_translation"
                            value={flashcardWord.foreign_translation}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="edit-flashcard__nav">
                <div className="edit-flashcard__nav-level">
                    <div
                        className={
                            highlightLevel === 1
                                ? "edit-flashcard__nav-level-indv active-level"
                                : "edit-flashcard__nav-level-indv"
                        }
                        onClick={() => changeLevel(1)}
                    >
                        <img
                            className="edit-flashcard__nav-level-indv-img"
                            src={highlightLevel === 1 ? beginnerWhiteImg : beginnerImg}
                            alt=""
                        />
                    </div>
                    <div
                        className={
                            highlightLevel === 2
                                ? "edit-flashcard__nav-level-indv active-level"
                                : "edit-flashcard__nav-level-indv"
                        }
                        onClick={() => changeLevel(2)}
                    >
                        <img
                            className="edit-flashcard__nav-level-indv-img"
                            src={highlightLevel === 2 ? intermediateWhiteImg : intermediateImg}
                            alt=""
                        />
                    </div>
                    <div
                        className={
                            highlightLevel === 3
                                ? "edit-flashcard__nav-level-indv active-level"
                                : "edit-flashcard__nav-level-indv"
                        }
                        onClick={() => changeLevel(3)}
                    >
                        <img
                            className="edit-flashcard__nav-level-indv-img"
                            src={highlightLevel === 3 ? advancedWhiteImg : advancedImg}
                            alt=""
                        />
                    </div>
                </div>

                <div className="edit-flashcard__nav-buttons">
                    <button className="edit-flashcard__nav-buttons-save">Save Changes</button>
                </div>
            </div>
        </form>
    );
}
