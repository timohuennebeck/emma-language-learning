import "./GPTPrompt.scss";

import { useState } from "react";
import axios from "axios";

export default function GPTPrompt() {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        const chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
        setChatLog(chatLogNew);

        const newMessage = input;

        setInput("");

        axios
            .post(`${process.env.REACT_APP_API_URL}/openai`, {
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
        <div>
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button>Submit</button>
            </form>
            {chatLog.map((item, index) => {
                return (
                    <p className="hello-world" key={index}>
                        {item.message}
                    </p>
                );
            })}
        </div>
    );
}
