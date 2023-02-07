import "./EmmaPracticePage.scss";

// images
import micImg from "../../assets/icons/Mic.svg";
import mutedMicImg from "../../assets/icons/mutedMic.svg";
import hideTranslationImg from "../../assets/icons/eye-slash.svg";
import showTranslationImg from "../../assets/icons/eye.svg";
import hideImg from "../../assets/icons/stop.svg";
import showImg from "../../assets/icons/resume.svg";
import searchImg from "../../assets/icons/search.svg";

// components
import VCButton from "../../components/VCButton/VCButton";
import TranscriptionAIMessage from "../../components/TranscriptionAIMessage/TranscriptionAIMessage";
import TranscriptionUserMessage from "../../components/TranscriptionUserMessage/TranscriptionUserMessage";

// libraries
import { useState, useEffect } from "react";
import axios from "axios";

export default function EmmaPracticePage() {
    // shows or hides the text on the screen
    const [disableTranscription, setDisableTranscription] = useState(false);
    const [disableTranslation, setDisableTranslation] = useState(false);

    // sets the current language that's used for the speech-to-text api
    const [currentLanguage, setCurrentLanguage] = useState("None");

    // const [currentTranslation, setCurrentTranslation] = useState("English");
    const [toggleDropdown, setToggleDropdown] = useState(false);

    // enables or disables the microphone to start listening
    const [listening, setListening] = useState(false);

    // creates the chatlog which shows the users transcription in real-time
    const [chatLog, setChatLog] = useState([
        {
            user: "gpt",
            message:
                "Hi! Let's have a conversation in English, French, Spanish or German. You start!",
        },
    ]);

    // used for the real-time transcriptions
    const [transcript, setTranscript] = useState("");
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [recognition, setRecognition] = useState(null);

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    useEffect(() => {
        const recognition = new speechRecognition();
        recognition.interimResults = true;
        setRecognition(recognition);
    }, []);

    useEffect(() => {
        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, [recognition]);

    const toggleRecognition = () => {
        if (isRecognizing) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsRecognizing(!isRecognizing);
    };

    // shows the transcript in real-time
    useEffect(() => {
        if (recognition) {
            recognition.onresult = (event) => {
                setTranscript(event.results[0][0].transcript);
                handleGPT(event.results[0][0].transcript);
            };
            recognition.onend = () => {
                setListening(false);
                setIsRecognizing(false);
            };
        }
    }, [isRecognizing, recognition]);

    // changes the language code in order to use the correct api
    const changeLanguage = (language) => {
        setCurrentLanguage(language);
        recognition.lang = language;
    };

    // inserts the speech from the user into the chat log and makes an api call to receive an answer from the ai
    const handleGPT = (userInput) => {
        // adds the users input to the state which will be used to make the API call, meanwhile shows a loading sign until a response has been received

        if (!userInput) {
            return;
        }

        const chatLogNew = [...chatLog, { user: "me", message: userInput }];

        setChatLog(chatLogNew);

        if (isRecognizing) {
            return;
        }

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

                setListening(false);
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
                setListening(false);
            });
    };

    // maps through all languages which are used for the api
    const languageOptions = [
        { languageCode: "None" },
        { languageCode: "fr-FR" },
        { languageCode: "es-ES" },
        { languageCode: "de-DE" },
        { languageCode: "en-US" },
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
                        img={listening ? micImg : mutedMicImg}
                        hover={listening ? "Disable Microphone" : "Enable Microphone"}
                        onClick={() => {
                            setListening(!listening);
                            toggleRecognition();
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
