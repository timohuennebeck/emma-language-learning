import "./Dropdown.scss";

// images
import searchImg from "../../assets/icons/search.svg";

// components
import { useEffect, useState } from "react";

export default function Dropdown({ currentLanguage, setCurrentLanguage }) {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [filteredLanguages, setFilteredLanguages] = useState([]);

    useEffect(() => {
        const handleClick = (event) => {
            if (!event.target.closest(".dropdown")) {
                setToggleDropdown(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [toggleDropdown]);

    const languages = [
        { language: "English" },
        { language: "French" },
        { language: "Spanish" },
        { language: "German" },
    ];

    const showDropdown = () => {
        setFilteredLanguages(languages);
        setToggleDropdown(!toggleDropdown);
    };

    const handleChange = (value) => {
        setFilteredLanguages(
            languages.filter((item) => item.language.toLowerCase().includes(value.toLowerCase()))
        );
        setToggleDropdown(true);
    };

    return (
        <div className="dropdown" onClick={() => showDropdown()}>
            <div className="dropdown__search">
                <img className="dropdown__search-img" src={searchImg} alt="" />
                <input
                    className="dropdown__search-input"
                    placeholder="Search a language..."
                    onChange={(event) => handleChange(event.target.value)}
                />
            </div>
            {toggleDropdown && (
                <div className="dropdown__languages">
                    {filteredLanguages.map((item) => {
                        return (
                            <p
                                className="dropdown__languages-all"
                                onClick={() => setCurrentLanguage(item.language)}
                            >
                                {item.language}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
