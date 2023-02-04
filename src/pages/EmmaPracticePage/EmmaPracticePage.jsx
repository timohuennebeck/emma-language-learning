import "./EmmaPracticePage.scss";

// images
import micImg from "../../assets/icons/Mic.svg";
import mutedMicImg from "../../assets/icons/mutedMic.svg";
import leaveImg from "../../assets/icons/Close.svg";
import hideImg from "../../assets/icons/eye-slash.svg";
import showImg from "../../assets/icons/eye.svg";
import hideTranslationImg from "../../assets/icons/translation-stroke.svg";
import showTranslationImg from "../../assets/icons/Chart.svg";
import soundsWavesImg from "../../assets/images/sound-waves.png";

// components
import VCButton from "../../components/VCButton/VCButton";

// libraries
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function EmmaPracticePage() {
    const [muteMicrophone, setMuteMicrophone] = useState(false);
    const [hideText, setHideText] = useState(false);
    const [hideTranslation, setHideTranslation] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("None");
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const [transcript, setTranscript] = useState("");
    const [translatedTranscript, setTranslatedTranscript] = useState("");

    const [language, setLanguage] = useState("es-ES");
    const [listening, setListening] = useState(false);

    const userRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech recognition is not supported in this browser.");
            return;
        }

        let recognition = null;

        const startListening = () => {
            recognition = new SpeechRecognition();
            recognition.lang = language;
            recognition.interimResults = true;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onresult = (event) => {
                setTranscript(event.results[0][0].transcript);
            };
        };

        const stopListening = () => {
            recognition.stop();
            recognition = null;
        };

        if (listening) {
            startListening();
        } else if (recognition) {
            stopListening();
        }

        return () => {
            if (recognition) {
                stopListening();
            }
        };
    }, [language, listening]);

    useEffect(() => {
        handleWord();
    }, [transcript]);

    useEffect(() => {
        if (transcript && translatedTranscript) {
            userRef.current.scrollTop = userRef.current.scrollHeight;
        }
    }, [transcript, translatedTranscript]);

    const handleWord = () => {
        let languageCode;

        switch (currentLanguage) {
            case "French":
                languageCode = "FR";
                break;
            case "Spanish":
                languageCode = "ES";
                break;
            case "German":
                languageCode = "DE";
                break;
            default:
                languageCode = "EN";
                break;
        }

        fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${transcript}&target_lang=EN&source_lang=${languageCode}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTranslatedTranscript(data.translations[0].text);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    let userText;
    let userTranslation;

    if (!transcript) {
        userText = "Yours and the AI's speech will populate here...";
        userTranslation = "Awaiting Translation...";
    } else {
        userText = transcript;
        userTranslation = translatedTranscript;
    }

    return (
        <>
            <div className="emma-video">
                <div className="emma-video__ai">
                    <img className="emma-video__ai-img" src={soundsWavesImg} alt="" />

                    <div
                        className={
                            hideText ? "emma-video__ai-user hide-speech" : "emma-video__ai-user"
                        }
                        ref={userRef}
                    >
                        <p className="emma-video__ai-user-indv">{userText}</p>
                    </div>

                    <div
                        className={
                            hideTranslation
                                ? "emma-video__ai-translation hide-speech"
                                : "emma-video__ai-translation"
                        }
                        ref={userRef}
                    >
                        <p className="emma-video__ai-translation-indv">{userTranslation}</p>
                    </div>
                </div>
                <nav className="emma-video__nav">
                    <Link to="/">
                        <VCButton img={leaveImg} hover="Leave Practice" />
                    </Link>
                    <div className="emma-video__nav-hide" onClick={() => setHideText(!hideText)}>
                        {hideText ? (
                            <VCButton
                                img={showImg}
                                hover="Enable Text"
                                onClick={() => setHideText(!hideText)}
                            />
                        ) : (
                            <VCButton
                                img={hideImg}
                                hover="Disable Text"
                                onClick={() => setHideText(!hideText)}
                            />
                        )}
                    </div>
                    <div
                        className="emma-video__nav-translation"
                        onClick={() => setHideTranslation(!hideTranslation)}
                    >
                        {hideTranslation ? (
                            <VCButton
                                img={showTranslationImg}
                                hover="Enable Translation"
                                onClick={() => setHideTranslation(!hideTranslation)}
                            />
                        ) : (
                            <VCButton
                                img={hideTranslationImg}
                                hover="Disable Translation"
                                onClick={() => setHideTranslation(!hideTranslation)}
                            />
                        )}
                    </div>
                    <div
                        className="emma-video__nav-mic"
                        onClick={() => setMuteMicrophone(!muteMicrophone)}
                    >
                        {currentLanguage === "None" ? (
                            <p className="emma-video__nav-mic-select">
                                Microphone disabled! Awaiting language input...
                            </p>
                        ) : muteMicrophone ? (
                            <VCButton
                                img={micImg}
                                hover="Disable Microphone"
                                onClick={() => setListening(!listening)}
                            />
                        ) : (
                            <VCButton
                                img={mutedMicImg}
                                hover="Enable Microphone"
                                onClick={() => setListening(!listening)}
                            />
                        )}
                    </div>
                    <div
                        className="emma-video__nav-languages"
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                    >
                        <p className="emma-video__nav-languages-current">{currentLanguage}</p>
                        {toggleDropdown ? (
                            <div className="emma-video__nav-languages-all">
                                <p
                                    className="emma-video__nav-languages-all-indv"
                                    onClick={() => setCurrentLanguage("None")}
                                >
                                    None
                                </p>
                                <p
                                    className="emma-video__nav-languages-all-indv"
                                    onClick={() => {
                                        setCurrentLanguage("French");
                                        setLanguage("fr-FR");
                                    }}
                                >
                                    French
                                </p>
                                <p
                                    className="emma-video__nav-languages-all-indv"
                                    onClick={() => {
                                        setCurrentLanguage("Spanish");
                                        setLanguage("es-ES");
                                    }}
                                >
                                    Spanish
                                </p>
                                <p
                                    className="emma-video__nav-languages-all-indv"
                                    onClick={() => {
                                        setCurrentLanguage("German");
                                        setLanguage("de-DE");
                                    }}
                                >
                                    German
                                </p>
                            </div>
                        ) : null}
                    </div>
                </nav>
            </div>
        </>
    );
}
