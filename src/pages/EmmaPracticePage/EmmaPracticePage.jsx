import "./EmmaPracticePage.scss";

// images
import micImg from "../../assets/icons/Mic.svg";
import resetImg from "../../assets/icons/Shield - vulnerable.svg";
import hideTranslationImg from "../../assets/icons/eye-slash.svg";
import showTranslationImg from "../../assets/icons/eye.svg";
import hideImg from "../../assets/icons/stop.svg";
import showImg from "../../assets/icons/resume.svg";
import searchImg from "../../assets/icons/search.svg";
import loadingImg from "../../assets/icons/Loading.svg";

// components
import VCButton from "../../components/VCButton/VCButton";
import TranscriptionAIMessage from "../../components/TranscriptionAIMessage/TranscriptionAIMessage";
import TranscriptionUserMessage from "../../components/TranscriptionUserMessage/TranscriptionUserMessage";

// libraries
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

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
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    const containerRef = useRef(null);

    useEffect(() => {
        if (!transcript) {
            return;
        }

        setTranscribedText(transcript);
    }, [transcript]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    // changes the language code in order to use the correct api
    const changeLanguage = (language) => {
        setCurrentLanguage(language);
    };

    const handleGPT = (userInput) => {
        // adds the users input to the state which will be used to make the API call, meanwhile shows a loading sign until a response has been received
        const chatLogNew = [...chatLog, { user: "me", message: userInput }];
        const chatLoading = [
            ...chatLog,
            { user: "me", message: userInput },
            { user: "gpt", message: "I'm thinking... Hold on for a second." },
        ];

        setChatLog(chatLoading);

        // sends the users input to the AI and then adds the answer from the AI into the chat
        axios
            .post(`${process.env.REACT_APP_API_URL}/openai`, {
                message: userInput,
            })
            .then(({ data }) => {
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
            <div className="emma-video">
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
                <nav className="emma-video__nav">
                    <div className="emma-video__nav-search">
                        <img className="emma-video__nav-search-img" src={searchImg} alt="" />
                        <input
                            className="emma-video__nav-search-input"
                            placeholder="Search a username..."
                        />
                    </div>
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

                    <VCButton
                        img={disableTranscription ? showImg : hideImg}
                        hover={
                            disableTranscription ? "Enable Transcription" : "Disable Transcription"
                        }
                        onClick={() => setDisableTranscription(!disableTranscription)}
                    />
                    <VCButton
                        img={disableTranslation ? showTranslationImg : hideTranslationImg}
                        hover={disableTranslation ? "Enable Translation" : "Disable Translation"}
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
                            setIsSpinning(false);
                            resetTranscript();
                            SpeechRecognition.stopListening();
                            handleGPT(transcribedText);
                        }}
                    />
                    <VCButton
                        img={resetImg}
                        hover="Reset Defaults"
                        onClick={() => resetTranscript()}
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
