import "./EmmaPracticePage.scss";

// images
import micImg from "../../assets/icons/Mic.svg";
import hideTranslationImg from "../../assets/icons/eye-slash.svg";
import showTranslationImg from "../../assets/icons/eye.svg";
import hideImg from "../../assets/icons/stop.svg";
import showImg from "../../assets/icons/resume.svg";
import searchImg from "../../assets/icons/search.svg";
import loadingImg from "../../assets/icons/Loading.svg";
import aiImg from "../../assets/images/ai-face.gif";
import leaveImg from "../../assets/icons/Arrow - Left.svg";
import infoImg from "../../assets/icons/Info.svg";

// components
import VCButton from "../../components/VCButton/VCButton";
import TranscriptionAIMessage from "../../components/TranscriptionAIMessage/TranscriptionAIMessage";
import TranscriptionUserMessage from "../../components/TranscriptionUserMessage/TranscriptionUserMessage";

// libraries
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Link } from "react-router-dom";

export default function EmmaPracticePage() {
    // shows or hides the text on the screen
    const [disableTranscription, setDisableTranscription] = useState(false);
    const [disableTranslation, setDisableTranslation] = useState(false);

    // sets the current language that's used for the speech-to-text api
    const [currentLanguage, setCurrentLanguage] = useState("en-EN");

    // const [currentTranslation, setCurrentTranslation] = useState("English");
    const [toggleDropdown, setToggleDropdown] = useState(false);

    // creates the chatlog which shows the users transcription in real-time
    const [chatLog, setChatLog] = useState([
        {
            user: "gpt",
            message:
                "Hi! Let's have a conversation in English, French, Spanish or German. You start! P.S. In order to talk to me, please hold the microphone while speaking.",
        },
    ]);
    const [transcribedText, setTranscribedText] = useState("");
    const [isSpinning, setIsSpinning] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toggleError, setToggleError] = useState(false);

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [chatLog]);

    useEffect(() => {
        if (!transcript) {
            return;
        }

        setTranscribedText(transcript);
    }, [transcript]);

    useEffect(() => {
        if (transcript !== "") {
            setToggleError(false);
        }
    }, [transcript]);

    useEffect(() => {
        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();

        let languageVoice;

        if (currentLanguage === "fr-FR") {
            languageVoice = voices.find((voice) => voice.name === "Google français");
        } else if (currentLanguage === "es-ES") {
            languageVoice = voices.find((voice) => voice.name === "Google español");
        } else if (currentLanguage === "de-DE") {
            languageVoice = voices.find((voice) => voice.name === "Google Deutsch");
        } else {
            languageVoice = voices.find((voice) => voice.name === "Google US English");
        }

        msg.voice = languageVoice;
        msg.text = message;
        speechSynthesis.speak(msg);
    }, [message]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    // changes the language code in order to use the correct api
    const changeLanguage = (language) => {
        setCurrentLanguage(language);
    };

    const handleGPT = (userInput) => {
        if (userInput !== "") {
            // adds the users input to the state which will be used to make the API call, meanwhile shows a loading sign until a response has been received
            const chatLogNew = [...chatLog, { user: "me", message: userInput }];
            const chatLoading = [
                ...chatLog,
                { user: "me", message: userInput },
                { user: "gpt", message: "I'm thinking... Hold on for a second." },
            ];

            setChatLog(chatLoading);
            setIsLoading(true);

            // sends the users input to the AI and then adds the answer from the AI into the chat
            axios
                .post(`${process.env.REACT_APP_API_URL}/openai`, {
                    message: userInput,
                })
                .then(({ data }) => {
                    setMessage(data.message);
                    setIsLoading(false);
                    setTranscribedText("");
                    resetTranscript();
                    setChatLog([
                        ...chatLogNew,
                        {
                            user: "gpt",
                            message: data.message,
                        },
                    ]);
                })
                .catch((error) => {
                    console.error(error);
                    setChatLog([
                        ...chatLogNew,
                        {
                            user: "gpt",
                            message: "There has been an error. Please, reload the page.",
                        },
                    ]);
                });
        } else {
            setToggleError(true);
        }
    };

    // maps through all languages which are used for the api
    const languageOptions = [
        { languageCode: "fr-FR" },
        { languageCode: "es-ES" },
        { languageCode: "de-DE" },
        { languageCode: "en-EN" },
    ];

    return (
        <>
            <div className={`emma-video ${disableTranscription ? "" : "black-bg"}`}>
                {disableTranscription ? (
                    <div className="emma-video__messages">
                        {chatLog.map((item, index) => {
                            if (item.user === "me") {
                                return (
                                    <div className="emma-chatbot__container-messages-left">
                                        <TranscriptionUserMessage userMessage={item} key={index} />
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="emma-chatbot__container-messages-right">
                                        <TranscriptionAIMessage openaiMessage={item} key={index} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                ) : (
                    <div className="emma-video__ai">
                        <img className="emma-video__ai-img" src={aiImg} alt="" />
                        {isLoading && (
                            <img
                                className={`emma-video__ai-loading ${
                                    isLoading ? "loading-animation" : ""
                                }`}
                                src={loadingImg}
                                alt=""
                            />
                        )}
                    </div>
                )}
                {toggleError && (
                    <div className="emma-video__error">
                        <img className="emma-video__error-img" src={infoImg} alt="" />
                        <p className="emma-video__error-message">
                            Whoops! Looks like we're not able to find user input...
                        </p>
                    </div>
                )}
                <nav className="emma-video__nav">
                    {/* <div className="emma-video__nav-search">
                        <img className="emma-video__nav-search-img" src={searchImg} alt="" />
                        <input
                            className="emma-video__nav-search-input"
                            placeholder="Search a username..."
                        />
                    </div> */}
                    <div className="emma-video__nav-transcription">
                        <img
                            className={`emma-video__nav-transcription-img ${
                                isSpinning ? "loading-animation" : ""
                            }`}
                            src={loadingImg}
                            alt=""
                        />
                        <input
                            ref={containerRef}
                            className="emma-video__nav-transcription-input"
                            placeholder="Search a username..."
                            value={transcribedText ? transcribedText : "Transcribing..."}
                            disabled
                        />
                    </div>
                    <Link to="/">
                        <VCButton img={leaveImg} hover="Leave Practice" />
                    </Link>

                    <VCButton
                        img={disableTranscription ? hideImg : showImg}
                        hover={
                            disableTranscription ? "Disable Transcription" : "Enable Transcription"
                        }
                        onClick={() => setDisableTranscription(!disableTranscription)}
                    />
                    <VCButton
                        img={disableTranslation ? hideTranslationImg : showTranslationImg}
                        hover={disableTranslation ? "Disable Translation" : "Enable Translation"}
                        onClick={() => setDisableTranslation(!disableTranslation)}
                    />
                    <VCButton
                        img={micImg}
                        hover="Hold to Talk"
                        onMouseDown={() => {
                            setIsSpinning(true);
                            SpeechRecognition.startListening({
                                continuous: true,
                                language: currentLanguage,
                            });
                        }}
                        onMouseUp={() => {
                            SpeechRecognition.stopListening();
                            setIsSpinning(false);
                            resetTranscript();
                            handleGPT(transcribedText);
                        }}
                    />
                    <div
                        className="emma-video__nav-languages"
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                    >
                        <p className="emma-video__nav-languages-current">{currentLanguage}</p>

                        {toggleDropdown ? (
                            <div className="emma-video__nav-languages-all">
                                {languageOptions.map(({ languageCode }) => (
                                    <p
                                        key={languageCode}
                                        className="emma-video__nav-languages-all-indv"
                                        onClick={() => changeLanguage(languageCode)}
                                    >
                                        {languageCode}
                                    </p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </nav>
            </div>
        </>
    );
}
