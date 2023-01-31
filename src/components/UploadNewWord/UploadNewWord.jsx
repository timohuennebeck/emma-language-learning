import "./UploadNewWord.scss";

// images
import easyImg from "../../assets/icons/beginner.svg";
import middleImg from "../../assets/icons/intermediate.svg";
import hardImg from "../../assets/icons/advanced.svg";

import easyWhiteImg from "../../assets/icons/beginner-white.svg";
import middleWhiteImg from "../../assets/icons/intermediate-white.svg";
import hardWhiteImg from "../../assets/icons/advanced-white.svg";

import ukImg from "../../assets/languages/united kingdom.svg";
import frenchImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";
import speakImg from "../../assets/icons/Volume - High.svg";
import { addDictionariesWords } from "../../utils/api";

import { useState } from "react";

export default function UploadNewWord({
    selectedWord,
    translatedWord,
    modalIsOpen,
    setModalIsOpen,
    singleData,
    refreshList,
    setRefreshList,
}) {
    const [selectLevel, setSelectLevel] = useState(null);

    const handleClick = (name) => {
        setSelectLevel(name);
    };

    const foreignLanguage = (event) => {
        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();

        let languageVoice;

        if (singleData.language === "French") {
            languageVoice = voices.find((voice) => voice.name === "Google français");
        } else if (singleData.language === "Spanish") {
            languageVoice = voices.find((voice) => voice.name === "Google español");
        } else if (singleData.language === "German") {
            languageVoice = voices.find((voice) => voice.name === "Google Deutsch");
        } else {
            languageVoice = voices.find((voice) => voice.name === "Google US English");
        }

        msg.voice = languageVoice;
        msg.text = event;
        speechSynthesis.speak(msg);
    };

    const englishLanguage = (event) => {
        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices.find((voice) => voice.name === "Google US English");
        msg.text = event;
        speechSynthesis.speak(msg);
    };

    const uploadWord = () => {
        const highlightLevel = Number(selectLevel);

        if (!highlightLevel) {
            console.log("not working");
        }

        const userWord = {
            dictionaries_id: 1,
            english: translatedWord,
            foreign_translation: selectedWord,
            language: singleData.language,
            level: highlightLevel,
        };

        addDictionariesWords({ userWord })
            .then(() => {
                console.log("Word has been uploaded!");
            })
            .catch((err) => {
                console.log(`Error uploading word! ${err}`);
            });

        setModalIsOpen(!modalIsOpen);

        setRefreshList(!refreshList);
    };

    let flag;

    if (singleData.language === "French") {
        flag = frenchImg;
    } else if (singleData.language === "Spanish") {
        flag = spainImg;
    } else {
        flag = germanyImg;
    }

    return (
        <div className="upload-word">
            <div className="upload-word__top">
                <div className="upload-word__top-language">
                    <div className="upload-word__top-language-indv">
                        <img src={flag} alt="" className="upload-word__top-language-indv-img" />
                    </div>
                    <div className="upload-word__top-language-name">{selectedWord}</div>
                    <div
                        className="upload-word__top-language-speak"
                        onClick={() => foreignLanguage(selectedWord)}
                    >
                        <img
                            src={speakImg}
                            alt=""
                            className="upload-word__top-language-speak-img"
                        />
                    </div>
                </div>
                <div className="upload-word__top-language">
                    <div className="upload-word__top-language-indv">
                        <img src={ukImg} alt="" className="upload-word__top-language-indv-img" />
                    </div>
                    <div className="upload-word__top-language-name">{translatedWord}</div>
                    <div
                        className="upload-word__top-language-speak"
                        onClick={() => englishLanguage(translatedWord)}
                    >
                        <img
                            src={speakImg}
                            alt=""
                            className="upload-word__top-language-speak-img"
                        />
                    </div>
                </div>
            </div>
            <div className="upload-word__nav">
                <div className="upload-word__nav-level">
                    <div
                        className={`upload-word__nav-level-indv ${
                            selectLevel === "1" ? "active-level" : ""
                        }`}
                        name="1"
                        onClick={() => handleClick("1")}
                    >
                        <img
                            src={selectLevel === "1" ? easyWhiteImg : easyImg}
                            alt=""
                            className="upload-word__nav-level-indv-img"
                        />
                    </div>
                    <div
                        className={`upload-word__nav-level-indv ${
                            selectLevel === "2" ? "active-level" : ""
                        }`}
                        name="2"
                        onClick={() => handleClick("2")}
                    >
                        <img
                            src={selectLevel === "2" ? middleWhiteImg : middleImg}
                            alt=""
                            className="upload-word__nav-level-indv-img"
                        />
                    </div>
                    <div
                        className={`upload-word__nav-level-indv ${
                            selectLevel === "3" ? "active-level" : ""
                        }`}
                        name="3"
                        onClick={() => handleClick("3")}
                    >
                        <img
                            src={selectLevel === "3" ? hardWhiteImg : hardImg}
                            alt=""
                            className="upload-word__nav-level-indv-img"
                        />
                    </div>
                </div>
                <div className="upload-word__nav-buttons">
                    <button
                        className="upload-word__nav-buttons-cancel"
                        onClick={() => setModalIsOpen(!modalIsOpen)}
                    >
                        CANCEL
                    </button>
                    {selectLevel ? (
                        <button className="upload-word__nav-buttons-save" onClick={uploadWord}>
                            SAVE
                        </button>
                    ) : null}
                </div>
            </div>
            {selectLevel ? null : <p>Please select a level!</p>}
        </div>
    );
}
