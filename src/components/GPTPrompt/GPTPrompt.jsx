import "./GPTPrompt.scss";

import { useState } from "react";
import axios from "axios";

export default function GPTPrompt() {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([]);

    /**
     * When the user submits a message, the message is added to the chat log, the input is cleared, and
     * the message is sent to the API
     * @returns The data object is being returned.
     */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input) {
            return;
        }

        const chatLogNew = [...chatLog, { user: "me", message: input }];
        setChatLog(chatLogNew);

        setInput("");

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/openai`, {
                message: input,
            });

            setChatLog([
                ...chatLogNew,
                {
                    user: "gpt",
                    message: data.message.content,
                },
            ]);
        } catch (err) {
            console.error(err);
        }
    };

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
