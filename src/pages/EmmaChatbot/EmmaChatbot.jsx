import "./EmmaChatbot.scss";

// components
import LiveChatMessage from "../../components/LiveChatMessage/LiveChatMessage";
import LiveChatMessageDifferentUser from "../../components/LiveChatMessageDifferentUser/LiveChatMessageDifferentUser";

// images
import messagesImg from "../../assets/icons/send.svg";
import moreImg from "../../assets/icons/more-v.svg";
import { useState } from "react";

// libraries
import axios from "axios";

export default function EmmaChatbot() {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([
        {
            user: "gpt",
            message:
                "Hi! Let's have a conversation in French, Spanish German or English. You start!",
        },
    ]);

    async function handleSubmit(e) {
        e.preventDefault();

        const chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
        setChatLog(chatLogNew);

        const newMessage = input;

        setInput("");

        axios
            .post("http://localhost:8080/openai", {
                message: newMessage,
            })
            .then(({ data }) => {
                setChatLog([
                    ...chatLogNew,
                    {
                        user: "gpt",
                        message: data.message,
                    },
                ]);
            });
    }

    return (
        <div className="emma-chatbot">
            <div className="emma-chatbot__container-messages">
                {chatLog.map((item, index) => {
                    let correctChat;

                    console.log(item);

                    if (item.user === "me") {
                        return <LiveChatMessage userMessage={item} />;
                    } else {
                        return <LiveChatMessageDifferentUser openaiMessage={item} />;
                    }
                })}
            </div>
            <div className="emma-chatbot__send">
                <div className="emma-chatbot__send-magic">
                    <img className="emma-chatbot__send-magic-img" src={moreImg} alt="" />
                    <p className="emma-chatbot__send-magic-text">
                        Melanie is creating some magic...
                    </p>
                </div>
                <form className="emma-chatbot__send-container" onSubmit={handleSubmit}>
                    <div className="emma-chatbot__send-container-input">
                        <input
                            className="emma-chatbot__send-container-input-indv"
                            placeholder="Write a message here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <button className="emma-chatbot__send-container-button">
                        <img
                            className="emma-chatbot__send-container-button-img"
                            src={messagesImg}
                            alt=""
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}
