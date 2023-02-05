import "./EmmaPracticePage.scss";

// images
import micImg from "../../assets/icons/Mic.svg";
import mutedMicImg from "../../assets/icons/mutedMic.svg";
import resetImg from "../../assets/icons/Close.svg";
import hideImg from "../../assets/icons/eye-slash.svg";
import showImg from "../../assets/icons/eye.svg";
import hideTranslationImg from "../../assets/icons/translation-stroke.svg";
import showTranslationImg from "../../assets/icons/Chart.svg";
import leaveImg from "../../assets/icons/Call - Muted.svg";
import aiFace from "../../assets/images/ai-face.gif";

// components
import VCButton from "../../components/VCButton/VCButton";

// libraries
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LanguageFlagDropdown from "../../components/LanguageFlagDropdown/LanguageFlagDropdown";
import GPTPrompt from "../../components/GPTPrompt/GPTPrompt";

export default function EmmaPracticePage() {
    const [muteMicrophone, setMuteMicrophone] = useState(false);
    const [hideText, setHideText] = useState(false);
    const [hideTranslation, setHideTranslation] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("None");
    const [currentTranslation, setCurrentTranslation] = useState("English");
    const [toggleDropdown, setToggleDropdown] = useState(false);

    // this is the text that will be shown on the screen
    const [transcript, setTranscript] = useState("");
    const [translatedTranscript, setTranslatedTranscript] = useState("");

    // used to set the language code for the API call
    const [language, setLanguage] = useState("");

    // enables or disables the microphone to start listening
    const [listening, setListening] = useState(false);

    const userRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        // checks if the value is undefined or not
        if (!SpeechRecognition) {
            console.error("Speech recognition is not supported in this browser.");
            return;
        }

        let recognition = null;

        // stars the microphone and listens to the users input
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

        // stops the microphone
        const stopListening = () => {
            recognition.stop();
            recognition = null;
        };

        // if the user stops speaking the machine will stop listening
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

    // scrolls to the bottom of the text if a max-height has been reached
    useEffect(() => {
        if (transcript && translatedTranscript) {
            userRef.current.scrollTop = userRef.current.scrollHeight;
        }
    }, [transcript, translatedTranscript]);

    const resetToDefault = () => {
        setMuteMicrophone(false);
        setHideText(false);
        setHideTranslation(false);
        setCurrentLanguage("None");
        setCurrentTranslation("English");
        setToggleDropdown(false);
        setTranscript("");
        setTranslatedTranscript("");
        setLanguage("");
        setListening(false);
    };

    const handleWord = () => {
        const languageCodes = {
            French: "FR",
            Spanish: "ES",
            German: "DE",
            default: "EN",
        };

        // finds the language and pulls the language code in order to use it in the API call
        const currentLanguageCode = languageCodes[currentLanguage] || languageCodes.default;
        const currentTranslationCode = languageCodes[currentTranslation] || languageCodes.default;

        // returns the API call if the translation div is not disabled
        if (!hideTranslation) {
            fetch(
                `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${transcript}&target_lang=${currentTranslationCode}&source_lang=${currentLanguageCode}`
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
        }
    };

    let userText;
    let userTranslation;

    // placeholder text in case the user hasn't started speaking
    if (!transcript) {
        userText = "Users and AI's Words...";
        userTranslation = `${currentTranslation} Translation...`;
    } else {
        userText = transcript;
        userTranslation = translatedTranscript;
    }

    return (
        <>
            <div className="emma-video">
                <GPTPrompt />
                <div className="emma-video--bg">
                    <div className="emma-video__ai">
                        <div className="emma-video__ai-live">
                            <img className="emma-video__ai-live-img" src={aiFace} alt="" />
                        </div>

                        <div
                            className={
                                hideTranslation
                                    ? "emma-video__ai-translation hide-speech"
                                    : "emma-video__ai-translation"
                            }
                        >
                            <div className="emma-video__ai-translation-dropdown">
                                <LanguageFlagDropdown
                                    currentLanguage={currentLanguage}
                                    currentTranslation={currentTranslation}
                                    setCurrentTranslation={setCurrentTranslation}
                                />
                            </div>
                            <p className="emma-video__ai-translation-indv" ref={userRef}>
                                {userTranslation}
                            </p>
                        </div>

                        <div
                            className={
                                hideText ? "emma-video__ai-user hide-speech" : "emma-video__ai-user"
                            }
                            ref={userRef}
                        >
                            <p className="emma-video__ai-user-indv">{userText}</p>
                        </div>
                    </div>
                    <nav className="emma-video__nav">
                        <Link to="/">
                            <VCButton img={leaveImg} hover="Leave Practice" />
                        </Link>
                        <VCButton
                            img={resetImg}
                            hover="Reset To Defaults"
                            onClick={() => resetToDefault()}
                        />
                        <div
                            className="emma-video__nav-hide"
                            onClick={() => setHideText(!hideText)}
                        >
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
                                    Microphone disabled! Input required...
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
                                    <p
                                        className="emma-video__nav-languages-all-indv"
                                        onClick={() => {
                                            setCurrentLanguage("English");
                                            setLanguage("en-EN");
                                        }}
                                    >
                                        English
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
