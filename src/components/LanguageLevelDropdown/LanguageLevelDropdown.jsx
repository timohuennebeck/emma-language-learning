import { useState } from "react";
import "./LanguageLevelDropdown.scss";

export default function LanguageLevelDropdown({ handleLanguageLevel }) {
    const [selectLanguage, setSelectLanguage] = useState("None");
    const [toggleDropdown, setToggleDropdown] = useState(false);

    return (
        <div className="language-dropdown" onClick={() => setToggleDropdown(!toggleDropdown)}>
            <div className="language-dropdown__default">
                <p className="language-dropdown__default-indv">{selectLanguage}</p>
            </div>
            {toggleDropdown ? (
                <div className="language-dropdown__levels">
                    <p
                        className="language-dropdown__levels-indv"
                        onClick={() => {
                            setSelectLanguage("None");
                            handleLanguageLevel("None");
                        }}
                    >
                        Remove Filters
                    </p>
                    <p
                        className="language-dropdown__levels-indv"
                        onClick={() => {
                            setSelectLanguage("Beginner (A1)");
                            handleLanguageLevel("Beginner (A1)");
                        }}
                    >
                        Beginner (A1)
                    </p>
                    <p
                        className="language-dropdown__levels-indv"
                        onClick={() => {
                            setSelectLanguage("Beginner (A2)");
                            handleLanguageLevel("Beginner (A2)");
                        }}
                    >
                        Beginner (A2)
                    </p>
                    <p
                        className="language-dropdown__levels-indv"
                        onClick={() => {
                            setSelectLanguage("Intermediate (B1)");
                            handleLanguageLevel("Intermediate (B1)");
                        }}
                    >
                        Intermediate (B1)
                    </p>
                    <p
                        className="language-dropdown__levels-indv"
                        onClick={() => {
                            setSelectLanguage("Intermediate (B2)");
                            handleLanguageLevel("Intermediate (B2)");
                        }}
                    >
                        Intermediate (B2)
                    </p>
                    <p
                        className="language-dropdown__levels-indv"
                        onClick={() => {
                            setSelectLanguage("Advanced (C1)");
                            handleLanguageLevel("Advanced (C1)");
                        }}
                    >
                        Advanced (C1)
                    </p>
                    <p
                        className="language-dropdown__levels-indv"
                        onClick={() => {
                            setSelectLanguage("Advanced (C2)");
                            handleLanguageLevel("Advanced (C2)");
                        }}
                    >
                        Advanced (C2)
                    </p>
                </div>
            ) : null}
        </div>
    );
}
