import "./FlashcardsWritingPage.scss";

// images
import speakImg from "../../assets/icons/Volume - High.svg";
import ukImg from "../../assets/languages/united kingdom.svg";
import frenchImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";
import solvedImg from "../../assets/icons/Check.svg";
import solvedBlueImg from "../../assets/icons/check-blue.svg";
import helpImg from "../../assets/icons/Question.svg";
import enabledBell from "../../assets/icons/Volume - High.svg";
import disabledBell from "../../assets/icons/Volume - Slash.svg";

// sounds
import solvedMp3 from "../../assets/sounds/solved-sound.mp3";

// libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDictionariesWords } from "../../utils/api";

export default function FlashcardsWritingPage() {
    // toggles the background color and inverts image when hovered
    const [toggleHover, setToggleHover] = useState(false);

    // data from the API
    const [dictionariesData, setDictionariesData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);

    // shows congratulations message if user has translated the word
    const [showMessage, setShowMessage] = useState(false);

    // users input from the input field
    const [inputValue, setInputValue] = useState("");

    // used for countdown
    const [seconds, setSeconds] = useState(45);

    // color for the countdown
    const [backgroundColor, setBackgroundColor] = useState("#FFF");

    // shows message if user wants to click "next" button without having input something
    const [cheatingMessage, setCheatingMessage] = useState(false);

    const [enableSound, setEnableSound] = useState(false);

    const { id } = useParams();

    // gets the data from the API
    useEffect(() => {
        getDictionariesWords().then(({ data }) => {
            setDictionariesData(data.filter((item) => item.dictionaries_id === Number(id)));
        });
    }, []);

    // calculates the countdown
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         // continues to the next word if the user wasn't able to solve it in time
    //         if (seconds === 0) {
    //             clearInterval(intervalId);
    //             setCurrentIndex((currentIndex + 1) % dictionariesData.length);
    //             setSeconds(45);
    //         } else {
    //             setSeconds(seconds - 1);
    //         }

    //         // changes the background color of the countdown based on the amount of seconds left
    //         if (seconds <= 10) {
    //             setBackgroundColor("#FF2E2E");
    //         } else if (seconds <= 15) {
    //             setBackgroundColor("#FFC72E");
    //         } else if (seconds <= 30) {
    //             setBackgroundColor("#ADFF2F");
    //         } else {
    //             setBackgroundColor("white");
    //         }
    //     }, 1000);

    //     return () => clearInterval(intervalId);
    // }, [seconds]);

    // calculates the percentage of the progress bar
    const showProgress = (currentIndex + 1) / dictionariesData.length;
    const progressPercentage = showProgress * 100 + "%";

    // gets the currents index and gets the data from the API which will then be used to show the "english" and "foreign_translation" words
    const currentFlashcard = dictionariesData[currentIndex];

    // makes sure that nothing is undefined
    if (!currentFlashcard || !dictionariesData) {
        return;
    }

    // reveals the solution if the user clicked on the "reveal solution" button
    const triggerSolution = () => {
        setShowSolution(true);
        setInputValue(currentFlashcard.foreign_translation);
        setSeconds(300);

        if (!enableSound) {
            // the bell sound after the word has been translated
            const soundEffect = new Audio(solvedMp3);
            soundEffect.play();
        }
    };

    // reveals the solution is the user has input the correct one
    const correctSolution = (e) => {
        const solution = currentFlashcard.foreign_translation.toLowerCase();
        const userAnswer = e.toLowerCase();

        if (solution === userAnswer) {
            setShowSolution(true);
            setShowMessage(true);
            setSeconds(300);

            if (!enableSound) {
                // the bell sound after the word has been translated
                const soundEffect = new Audio(solvedMp3);
                soundEffect.play();
            }
        }
    };

    // shows the next flashcard while also removing all shown details, i.e. congratulations message, answer, etc...
    const nextWord = () => {
        if (!inputValue) {
            setCheatingMessage(true);

            setTimeout(() => {
                setCheatingMessage(false);
            }, [2500]);
        } else {
            setCurrentIndex((currentIndex + 1) % dictionariesData.length);
            setInputValue("");
            setShowSolution(false);
            setShowMessage(false);
            setSeconds(45);
        }
    };

    let flag;

    // sets the correct flag based on the current language
    if (currentFlashcard.language === "French") {
        flag = frenchImg;
    } else if (currentFlashcard.language === "Spanish") {
        flag = spainImg;
    } else {
        flag = germanyImg;
    }

    // finds the correct language API and then sets it equal to the current language
    const foreignLanguage = (event) => {
        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();

        let languageVoice;

        // finds the correct API to use to pronounce the word

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

    // pronounces the english word
    const englishLanguage = (event) => {
        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices.find((voice) => voice.name === "Google US English");
        msg.text = event;
        speechSynthesis.speak(msg);
    };

    // sets the correct congratulations message based on the current language
    let congratulationsMessage;

    if (currentFlashcard.language === "French") {
        congratulationsMessage = "C'est génial ! C'est exact. Continuons.";
    } else if (currentFlashcard.language === "Spanish") {
        congratulationsMessage = "¡Qué bien! Eso es correcto. Sigamos.";
    } else if (currentFlashcard.language === "German") {
        congratulationsMessage = "Wie toll! Das ist richtig. Weiter geht's.";
    } else {
        congratulationsMessage = "How great! That's correct. Let's keep going.";
    }

    return (
        <div className="flashcards-writing">
            <div className="flashcards-writing__loading">
                <div className="flashcards-writing__loading-box">
                    <div
                        className="flashcards-writing__loading-box-bar"
                        style={{ width: progressPercentage }}
                    ></div>
                </div>
                <img
                    className="flashcards-writing__loading-img"
                    src={solvedBlueImg}
                    alt=""
                />
            </div>
            <div className="flashcards-writing__box">
                <div
                    className="flashcards-writing__box-volume"
                    onClick={() => setEnableSound(!enableSound)}
                    onMouseEnter={() => setToggleHover("0")}
                    onMouseLeave={() => setToggleHover("")}
                >
                    <img
                        className={
                            toggleHover === "0"
                                ? "flashcards-writing__box-volume-img toggle-help-hover"
                                : "flashcards-writing__box-volume-img"
                        }
                        src={enableSound ? disabledBell : enabledBell}
                        alt=""
                    />
                </div>

                {/* shows the total amount of flashcards as well as the current one */}

                <p className="flashcards-writing__box-number">{`Progress: ${currentIndex + 1}/${
                    dictionariesData.length
                }`}</p>

                {/* sets the background color from the conditional above */}

                <div className="flashcards-writing__box-timer">
                    <p
                        style={{ backgroundColor: backgroundColor }}
                        className={
                            showSolution
                                ? "flashcards-writing__box-timer-seconds"
                                : "flashcards-writing__box-timer-seconds reveal-solution"
                        }
                    >
                        You got {seconds} seconds remaining...
                    </p>
                </div>
            </div>
            <div className="flashcards-writing__languages">
                <div className="flashcards-writing__languages-english">
                    {/* english word to be translated */}

                    <div className="flashcards-writing__languages-english-box">
                        <img
                            className="flashcards-writing__languages-english-box-img"
                            src={ukImg}
                            alt=""
                        />
                        <p>{currentFlashcard.english}</p>
                    </div>
                    <div
                        className="flashcards-writing__languages-english-speak"
                        onMouseEnter={() => setToggleHover("1")}
                        onMouseLeave={() => setToggleHover("")}
                        onClick={() => englishLanguage(currentFlashcard.english)}
                    >
                        <img
                            className={
                                toggleHover === "1"
                                    ? "flashcards-writing__languages-english-speak-img toggle-help-hover"
                                    : "flashcards-writing__languages-english-speak-img"
                            }
                            src={speakImg}
                            alt=""
                        />
                    </div>
                </div>
                <div
                    className={
                        showSolution
                            ? "flashcards-writing__languages-foreign reveal-solution"
                            : "flashcards-writing__languages-foreign"
                    }
                >
                    <div className="flashcards-writing__languages-foreign-box">
                        <img
                            className="flashcards-writing__languages-foreign-box-img"
                            src={flag}
                            alt=""
                        />
                        <p>{currentFlashcard.foreign_translation}</p>
                    </div>

                    {/* enables the background color and inverts the image based on the current select item when hovered */}

                    <div
                        className="flashcards-writing__languages-foreign-speak"
                        onMouseEnter={() => setToggleHover("2")}
                        onMouseLeave={() => setToggleHover("")}
                        // inputs the word for the API to pronounce

                        onClick={() => foreignLanguage(currentFlashcard.foreign_translation)}
                    >
                        <img
                            className={
                                toggleHover === "2"
                                    ? "flashcards-writing__languages-foreign-speak-img toggle-help-hover"
                                    : "flashcards-writing__languages-foreign-speak-img"
                            }
                            src={speakImg}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="flashcards-writing__input">
                <div className="flashcards-writing__input-user">
                    <div
                        className="flashcards-writing__input-user-box"
                        onMouseEnter={() => setToggleHover("3")}
                        onMouseLeave={() => setToggleHover("")}
                        // triggers the solution if the users clicks on "reveal solution"

                        onClick={() => triggerSolution()}
                    >
                        <img
                            className={
                                toggleHover === "3"
                                    ? "flashcards-writing__input-user-box-img toggle-help-hover"
                                    : "flashcards-writing__input-user-box-img"
                            }
                            src={helpImg}
                            alt=""
                        />
                        {toggleHover === "3" ? (
                            <p className="flashcards-writing__input-user-box-solution">
                                Reveal Solution
                            </p>
                        ) : null}
                    </div>
                    <div
                        className={
                            showSolution
                                ? "flashcards-writing__input-user-indv show-solution"
                                : "flashcards-writing__input-user-indv"
                        }
                    >
                        <img
                            className="flashcards-writing__input-user-indv-img"
                            src={flag}
                            alt=""
                        />
                        <input
                            className={
                                showSolution
                                    ? "flashcards-writing__input-user-indv-user show-solution"
                                    : "flashcards-writing__input-user-indv-user"
                            }
                            placeholder={`Translate '${currentFlashcard.english}'...`}
                            value={inputValue}
                            // inputs the users input which will then be compared above and trigger the solution if it's correct

                            onChange={(e) => {
                                setInputValue(e.target.value);
                                correctSolution(e.target.value);
                            }}
                        />
                    </div>
                </div>
                {showMessage ? (
                    <div className="flashcards-writing__input-solved">
                        <div className="flashcards-writing__input-solved-box">
                            <img src={solvedImg} alt="" />
                            <p>{congratulationsMessage}</p>
                        </div>
                    </div>
                ) : null}
                <div className="flashcards-writing__input-button">
                    {/* appears when the user tries to click the next button without having input something into the users field */}

                    <p
                        className={
                            cheatingMessage
                                ? "flashcards-writing__input-button-message reveal-solution"
                                : "flashcards-writing__input-button-message"
                        }
                    >
                        That's not how it works! The word is still waiting to be translated...
                    </p>
                    <button
                        className="flashcards-writing__input-button-next"
                        onClick={() => nextWord()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
