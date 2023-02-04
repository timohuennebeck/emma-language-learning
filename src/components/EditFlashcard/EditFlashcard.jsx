import "./EditFlashcard.scss";

import speakImg from "../../assets/icons/Volume - High.svg";

import ukImg from "../../assets/languages/united kingdom.svg";

import beginnerImg from "../../assets/icons/beginner.svg";
import beginnerWhiteImg from "../../assets/icons/beginner-white.svg";

import intermediateImg from "../../assets/icons/intermediate.svg";
import intermediateWhiteImg from "../../assets/icons/intermediate-white.svg";

import advancedImg from "../../assets/icons/advanced.svg";
import advancedWhiteImg from "../../assets/icons/advanced-white.svg";

// libraries
import { useState } from "react";

export default function EditFlashcard({ indvWords, flag }) {
    const [selectLevel, setSelectLevel] = useState("");
    const [highlightLevel, setHiglightLevel] = useState(indvWords.level);

    const [englishWord, setEnglishWord] = useState(indvWords.english);
    const [foreignWord, setForeignWord] = useState(indvWords.foreign_translation);

    // contains all text-to-speech APIs for all foreign languages
    const foreignLanguage = (event) => {
        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();

        // finds the right text to speech API for each language
        let languageVoice;

        switch (indvWords.language) {
            case "French":
                languageVoice = voices.find((voice) => voice.name === "Google français");
                break;
            case "Spanish":
                languageVoice = voices.find((voice) => voice.name === "Google español");
                break;
            case "German":
                languageVoice = voices.find((voice) => voice.name === "Google Deutsch");
                break;
            default:
                languageVoice = voices.find((voice) => voice.name === "Google US English");
                break;
        }

        // assigns the to-be-spoken text to the API
        msg.voice = languageVoice;
        msg.text = event;
        speechSynthesis.speak(msg);
    };

    // contains the text-to-speech API for all english words
    const englishLanguage = (event) => {
        speechSynthesis.cancel();

        // creates a new instance
        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();

        // sets the voice to the english API and inputs the words into it
        msg.voice = voices.find((voice) => voice.name === "Google US English");
        msg.text = event;
        speechSynthesis.speak(msg);
    };

    // stops the code from executing if the data from indvWords is undefined
    if (!indvWords) {
        return;
    }

    return (
        <div className="edit-flashcard">
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
                            value={englishWord}
                        />
                    </div>
                    <div
                        className="edit-flashcard__languages-foreign-speak"
                        onClick={() => englishLanguage(englishWord)}
                    >
                        <img
                            className="edit-flashcard__languages-foreign-speak-img"
                            src={speakImg}
                            alt=""
                        />
                    </div>
                </div>

                <div className="edit-flashcard__languages-foreign">
                    <div className="edit-flashcard__languages-foreign-indv">
                        <img
                            className="edit-flashcard__languages-foreign-indv-img"
                            src={flag}
                            alt=""
                        />
                    </div>
                    <div className="edit-flashcard__languages-foreign-input">
                        <p className="edit-flashcard__languages-foreign-input-title">Definition</p>
                        <input
                            className="edit-flashcard__languages-foreign-input-indv"
                            placeholder="Insert Term..."
                            value={foreignWord}
                        />
                    </div>
                    <div
                        className="edit-flashcard__languages-foreign-speak"
                        onClick={() => foreignLanguage(foreignWord)}
                    >
                        <img
                            className="edit-flashcard__languages-foreign-speak-img"
                            src={speakImg}
                            alt=""
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
                        onClick={() => {
                            setSelectLevel(1);
                            setHiglightLevel(1);
                        }}
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
                        onClick={() => {
                            setSelectLevel(1);
                            setHiglightLevel(2);
                        }}
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
                        onClick={() => {
                            setSelectLevel(1);
                            setHiglightLevel(3);
                        }}
                    >
                        <img
                            className="edit-flashcard__nav-level-indv-img"
                            src={highlightLevel === 3 ? advancedWhiteImg : advancedImg}
                            alt=""
                        />
                    </div>
                </div>

                <div className="edit-flashcard__nav-buttons">
                    <button className="edit-flashcard__nav-buttons-save">SAVE</button>
                </div>
            </div>
        </div>
    );
}
