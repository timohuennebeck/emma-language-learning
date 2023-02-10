import "./EmmaChatbot.scss";

// components
import LiveChatMessage from "../../components/LiveChatMessage/LiveChatMessage";
import LiveChatMessageDifferentUser from "../../components/LiveChatMessageDifferentUser/LiveChatMessageDifferentUser";

// images
import messagesImg from "../../assets/icons/send.svg";
import loadingGif from "../../assets/animations/loading-animation.gif";
import infoImg from "../../assets/icons/Info.svg";

// languages
import ukImg from "../../assets/languages/united kingdom.svg";
import franceImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";

// libraries
import axios from "axios";
import { useEffect, useState } from "react";
import ConversationExamples from "../../components/ConversationExamples/ConversationExamples";

export default function EmmaChatbot() {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([
        {
            user: "gpt",
            message:
                "Hi! Let's have a conversation in English, French, Spanish or German. You start!",
        },
    ]);
    const [showMessage, setShowMessage] = useState(false);
    const [hover, setHover] = useState(false);
    const [triggerError, setTriggerError] = useState(false);

    useEffect(() => {
        if (input !== "") {
            setTriggerError(false);
        }
    }, [input]);

    const handleGPT = (userInput) => {
        setInput("");

        // adds the users input to the state which will be used to make the API call, meanwhile shows a loading sign until a response has been received
        const chatLogNew = [...chatLog, { user: "me", message: `${userInput}` }];
        const chatLoading = [
            ...chatLog,
            { user: "me", message: `${userInput}` },
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

    // prevents the form from reloading and sends the data to the AI
    const handleSubmit = (event) => {
        if (input === "") {
            event.preventDefault();
            setTriggerError(true);
        } else {
            event.preventDefault();
            handleGPT(input);
        }
    };

    return (
        <div className="emma-chatbot">
            <div className="emma-chatbot__container-messages">
                {chatLog.map((item, index) => {
                    if (item.user === "me") {
                        return (
                            <div className="emma-chatbot__container-messages-left">
                                <LiveChatMessage userMessage={item} key={index} />
                            </div>
                        );
                    } else {
                        return (
                            <div className="emma-chatbot__container-messages-right">
                                <LiveChatMessageDifferentUser openaiMessage={item} key={index} />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="emma-chatbot__send">
                <div className="emma-chatbot__send-examples">
                    <ConversationExamples flag={ukImg} language="English" handleGPT={handleGPT} />
                    <ConversationExamples
                        flag={franceImg}
                        language="French"
                        handleGPT={handleGPT}
                    />
                    <ConversationExamples
                        flag={spainImg}
                        language="Spanish"
                        handleGPT={handleGPT}
                    />
                    <ConversationExamples
                        flag={germanyImg}
                        language="German"
                        handleGPT={handleGPT}
                    />
                </div>
                {showMessage ? (
                    <div className="emma-chatbot__send-magic">
                        <img className="emma-chatbot__send-magic-img" src={loadingGif} alt="" />
                        <p className="emma-chatbot__send-magic-text">
                            You are creating some magic...
                        </p>
                    </div>
                ) : null}
                {triggerError && (
                    <div className="emma-chatbot__error">
                        <img className="emma-chatbot__error-img" src={infoImg} alt="" />
                        <p className="emma-chatbot__error-message">
                            Whoops! We can't do that. Insert a message to continue...
                        </p>
                    </div>
                )}
                <form className="emma-chatbot__send-container" onSubmit={handleSubmit}>
                    <div
                        className={`emma-chatbot__send-container-input ${triggerError && "error"}`}
                    >
                        <input
                            className="emma-chatbot__send-container-input-indv"
                            placeholder="Write a message here..."
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onFocus={() => setShowMessage(true)}
                            onBlur={() => setShowMessage(false)}
                        />
                    </div>
                    <button
                        className="emma-chatbot__send-container-button"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <img
                            className={`emma-chatbot__send-container-button-img ${
                                hover && "new-hover"
                            }`}
                            src={messagesImg}
                            alt=""
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}
