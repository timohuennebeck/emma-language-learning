import "./Flashcard.scss";

// images
import speakImg from "../../assets/icons/Volume - High.svg";
import ukImg from "../../assets/languages/united kingdom.svg";
import frenchImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";

// libraries
import React, { useState } from "react";

export default function Flashcard({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);

    const currentFlashcard = data[currentIndex];

    function handlePrevClick() {
        setCurrentIndex((currentIndex + data.length - 1) % data.length);
    }

    function handleNextClick() {
        setCurrentIndex((currentIndex + 1) % data.length);
    }

    if (!currentFlashcard) {
        return;
    }

    let flag;

    if (currentFlashcard.language === "French") {
        flag = frenchImg;
    } else if (currentFlashcard.language === "Spanish") {
        flag = spainImg;
    } else {
        flag = germanyImg;
    }

    const foreignLanguage = (event) => {
        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();

        let languageVoice;

        if (!showSolution) {
            languageVoice = voices.find((voice) => voice.name === "Google US English");
        } else if (currentFlashcard.language === "French") {
            languageVoice = voices.find((voice) => voice.name === "Google français");
        } else if (currentFlashcard.language === "Spanish") {
            languageVoice = voices.find((voice) => voice.name === "Google español");
        } else {
            languageVoice = voices.find((voice) => voice.name === "Google Deutsch");
        }

        msg.voice = languageVoice;
        msg.text = event;
        speechSynthesis.speak(msg);
    };

    let pronounceWord;

    if (showSolution) {
        pronounceWord = currentFlashcard.foreign_translation;
    } else {
        pronounceWord = currentFlashcard.english;
    }

    return (
        <div className="flashcard">
            <div className="flashcard__speak" onClick={() => foreignLanguage(pronounceWord)}>
                <p className="flashcard__speak-term">Term</p>
                <img className="flashcard__speak-img" src={speakImg} alt="" />
            </div>

            <div className="flashcard__content" onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? (
                    <>
                        <img className="flashcard__content-img" src={flag} alt="" />
                        <p className="flashcard__content-language">
                            {currentFlashcard.foreign_translation}
                        </p>
                    </>
                ) : (
                    <>
                        <img className="flashcard__content-img" src={ukImg} alt="" />
                        <p className="flashcard__content-language">{currentFlashcard.english}</p>
                    </>
                )}
            </div>

            <div className="flashcard__buttons">
                <button
                    className="flashcard__buttons-prev"
                    onClick={() => {
                        handlePrevClick();
                        setShowSolution(false);
                    }}
                >
                    Previous
                </button>
                <button
                    className="flashcard__buttons-next"
                    onClick={() => {
                        handleNextClick();
                        setShowSolution(false);
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
