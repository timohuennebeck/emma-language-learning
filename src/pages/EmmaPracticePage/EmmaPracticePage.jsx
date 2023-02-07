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
    const [muteMicrophone, setMuteMicrophone] = useState(false);
    const [disableTranscription, setDisableTranscription] = useState(false);
    const [disableTranslation, setDisableTranslation] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("None");
    // const [currentTranslation, setCurrentTranslation] = useState("English");
    const [toggleDropdown, setToggleDropdown] = useState(false);

    // this is the text that will be shown on the screen
    const [transcript, setTranscript] = useState("");
    const [input, setInput] = useState("");
    const [translatedTranscript, setTranslatedTranscript] = useState("");

    // used to set the language code for the API call
    const [language, setLanguage] = useState("");

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

    useEffect(() => {
        const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        let recognition = null;

        // checks if the value is undefined or not
        if (!speechRecognition) {
            console.error("Speech recognition is not supported in this browser.");
            return;
        }

        recognition = new speechRecognition();

        // starts the microphone and listens to the users input
        const startListening = () => {
            recognition = new speechRecognition();
            recognition.lang = language;
            recognition.interimResults = true;
            recognition.start();

            recognition.onresult = (event) => {
                setTranscript(event.results[0][0].transcript);
                setInput(event.results[0][0].transcript);
            };
        };

        if (listening) {
            startListening();
        }

        // // stops the microphone
        // const stopListening = () => {
        //     recognition.stop();
        //     recognition = null;
        //     setListening(false);
        // };

        // starts listening if the listening state is true that's triggered when clicking the microphone, stops if recognition exists
    }, [language, listening]);

    useEffect(() => {
        if (transcript) {
            return;
        }

        // adds the users input to the state which will be used to make the API call, meanwhile shows a loading sign until a response has been received
        const chatLogNew = [...chatLog, { user: "me", message: input }];
        const chatLoading = [
            ...chatLog,
            { user: "me", message: input },
            { user: "gpt", message: "I'm thinking... Hold on for a second." },
        ];

        setChatLog(chatLoading);

        // sends the users input to the AI and then adds the answer from the AI into the chat
        axios
            .post(`${process.env.REACT_APP_API_URL}/openai`, {
                message: input,
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
    }, [transcript]);

    // useEffect(() => {
    //     handleWord();
    // }, [transcript]);

    // const handleWord = () => {
    //     const languageCodes = {
    //         French: "FR",
    //         Spanish: "ES",
    //         German: "DE",
    //         default: "EN",
    //     };

    //     // finds the language and pulls the language code in order to use it in the API call
    //     const currentLanguageCode = languageCodes[currentLanguage] || languageCodes.default;
    //     const currentTranslationCode = languageCodes[currentTranslation] || languageCodes.default;

    //     // returns the API call if the translation div is not disabled
    //     if (!disableTranslation) {
    //         fetch(
    //             `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${transcript}&target_lang=${currentTranslationCode}&source_lang=${currentLanguageCode}`
    //         )
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error(`HTTP error! status: ${response.status}`);
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 setTranslatedTranscript(data.translations[0].text);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     }
    // };

    let userText;
    let userTranslation;

    // placeholder text in case the user hasn't started speaking
    if (!transcript) {
        userText = "Awaiting Input...";
        userTranslation = "Awaiting Translation...";
    } else {
        userText = transcript;
        userTranslation = translatedTranscript;
    }

    return (
        <>
            <div className="emma-video">
                {userText ? (
                    <TranscriptionUserMessage userMessage={userText} />
                ) : (
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
                )}
                <nav className="emma-video__nav">
                    <div className="emma-video__nav-search">
                        <img className="emma-video__nav-search-img" src={searchImg} alt="" />
                        <input
                            className="emma-video__nav-search-input"
                            placeholder="Search a username..."
                        />
                    </div>
                    <div
                        className="emma-video__nav-hide"
                        onClick={() => setDisableTranscription(!disableTranscription)}
                    >
                        {disableTranscription ? (
                            <VCButton
                                img={showImg}
                                hover="Enable Transcription"
                                onClick={() => setDisableTranscription(!disableTranscription)}
                            />
                        ) : (
                            <VCButton
                                img={hideImg}
                                hover="Disable Transcription"
                                onClick={() => setDisableTranscription(!disableTranscription)}
                            />
                        )}
                    </div>
                    <div
                        className="emma-video__nav-translation"
                        onClick={() => setDisableTranslation(!disableTranslation)}
                    >
                        {disableTranslation ? (
                            <VCButton
                                img={showTranslationImg}
                                hover="Enable Translation"
                                onClick={() => setDisableTranslation(!disableTranslation)}
                            />
                        ) : (
                            <VCButton
                                img={hideTranslationImg}
                                hover="Disable Translation"
                                onClick={() => setDisableTranslation(!disableTranslation)}
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
        </>
    );
}
