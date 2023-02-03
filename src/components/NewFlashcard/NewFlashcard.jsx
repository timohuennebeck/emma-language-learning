import "./NewFlashcard.scss";
import InputField from "../InputField/InputField";

import ukImg from "../../assets/languages/united kingdom.svg";
import spainImg from "../../assets/languages/spain.svg";
import franceImg from "../../assets/languages/france.svg";
import germanyImg from "../../assets/languages/germany.svg";

import beginnerImg from "../../assets/icons/beginner.svg";
import beginnerWhiteImg from "../../assets/icons/beginner-white.svg";

import intermediateImg from "../../assets/icons/intermediate.svg";
import intermediateWhiteImg from "../../assets/icons/intermediate-white.svg";

import advancedImg from "../../assets/icons/advanced.svg";
import advancedWhiteImg from "../../assets/icons/advanced-white.svg";
import { useState } from "react";

export default function NewFlashcard({ flags }) {
    const [selectLevel, setSelectLevel] = useState("");
    const [highlightLevel, setHiglightLevel] = useState("");

    return (
        <div className="new-flashcard">
            <div className="new-flashcard__languages">
                <div className="new-flashcard__languages-foreign">
                    <div className="new-flashcard__languages-foreign-indv">
                        <img
                            className="new-flashcard__languages-foreign-indv-img"
                            src={ukImg}
                            alt=""
                        />
                    </div>
                    <InputField />
                </div>

                <div className="new-flashcard__languages-foreign">
                    <div className="new-flashcard__languages-foreign-indv">
                        <img
                            className="new-flashcard__languages-foreign-indv-img"
                            src={flags}
                            alt=""
                        />
                    </div>
                    <InputField />
                </div>
            </div>

            <div className="new-flashcard__nav">
                <div className="new-flashcard__nav-level">
                    <div
                        className={
                            highlightLevel === "1"
                                ? "new-flashcard__nav-level-indv active-level"
                                : "new-flashcard__nav-level-indv"
                        }
                        onClick={() => {
                            setSelectLevel(1);
                            setHiglightLevel("1");
                        }}
                    >
                        <img
                            className="new-flashcard__nav-level-indv-img"
                            src={highlightLevel === "1" ? beginnerWhiteImg : beginnerImg}
                            alt=""
                        />
                    </div>
                    <div
                        className={
                            highlightLevel === "2"
                                ? "new-flashcard__nav-level-indv active-level"
                                : "new-flashcard__nav-level-indv"
                        }
                        onClick={() => {
                            setSelectLevel(1);
                            setHiglightLevel("2");
                        }}
                    >
                        <img
                            className="new-flashcard__nav-level-indv-img"
                            src={highlightLevel === "2" ? intermediateWhiteImg : intermediateImg}
                            alt=""
                        />
                    </div>
                    <div
                        className={
                            highlightLevel === "3"
                                ? "new-flashcard__nav-level-indv active-level"
                                : "new-flashcard__nav-level-indv"
                        }
                        onClick={() => {
                            setSelectLevel(1);
                            setHiglightLevel("3");
                        }}
                    >
                        <img
                            className="new-flashcard__nav-level-indv-img"
                            src={highlightLevel === "3" ? advancedWhiteImg : advancedImg}
                            alt=""
                        />
                    </div>
                </div>

                <div className="new-flashcard__nav-buttons">
                    <button className="new-flashcard__nav-buttons-indv">ADD WORD</button>
                </div>
            </div>
        </div>
    );
}
