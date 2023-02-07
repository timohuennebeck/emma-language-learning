import React, { useState, useEffect } from "react";

export default function TranscribeText() {
    const [transcript, setTranscript] = useState("");
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [recognition, setRecognition] = useState(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    useEffect(() => {
        setRecognition(new SpeechRecognition());
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

    useEffect(() => {
        if (recognition) {
            recognition.onresult = (event) => {
                setTranscript(event.results[0][0].transcript);
            };
            recognition.onend = () => {
                console.log("Hello");
                setIsRecognizing(false);
            };
        }
    }, [isRecognizing, recognition]);

    const changeLanguage = (language) => {
        recognition.lang = language;
    };

    return (
        <div>
            <button onClick={toggleRecognition}>
                {isRecognizing ? "Stop" : "Start"} Recognition
            </button>
            <select onChange={(e) => changeLanguage(e.target.value)}>
                <option value="en-US">English</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
            </select>
            <p>{transcript}</p>
        </div>
    );
}
