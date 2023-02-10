import "./FlashcardsPage.scss";

// components
import FlashcardsDeck from "../../components/FlashcardsDeck/FlashcardsDeck";

// images
import franceImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";
import searchImg from "../../assets/icons/search.svg";
import addImg from "../../assets/icons/Add.svg";

// libraries
import { useEffect } from "react";
import { getDictionaries } from "../../utils/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import SelectLanguage from "../../components/SelectLanguage/SelectLanguage";

export default function FlashcardsPage() {
    const [dictionariesData, setDictionariesData] = useState([]);
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState("French");

    useEffect(() => {
        getDictionaries().then(({ data }) => {
            setDictionariesData(data);
            setFilteredLanguages(data.filter((item) => item.language === "French"));
        });
    }, []);

    const handleClick = (event) => {
        const languageName = event.currentTarget.getAttribute("name");
        setCurrentLanguage(languageName);

        setFilteredLanguages(dictionariesData.filter((item) => item.language === languageName));
    };

    const handleSearch = (e) => {
        setFilteredLanguages(
            dictionariesData.filter((item) => {
                return (
                    item.name.toLowerCase().includes(e.toLowerCase()) &&
                    item.language === currentLanguage
                );
            })
        );
    };

    return (
        <div>
            <div className="flashcards-page">
                <nav className="flashcards-page__nav">
                    <div className="flashcards-page__nav-left">
                        <div className="flashcards-page__nav-left-languages">
                            <SelectLanguage
                                name="French"
                                flag={franceImg}
                                onClick={handleClick}
                                currentLanguage={currentLanguage}
                            />
                            <SelectLanguage
                                name="Spanish"
                                flag={spainImg}
                                onClick={handleClick}
                                currentLanguage={currentLanguage}
                            />
                            <SelectLanguage
                                name="German"
                                flag={germanyImg}
                                onClick={handleClick}
                                currentLanguage={currentLanguage}
                            />
                        </div>

                        <div className="flashcards-page__nav-left-search">
                            <img
                                className="flashcards-page__nav-left-search-img"
                                src={searchImg}
                                alt=""
                            />
                            <input
                                className="flashcards-page__nav-left-search-input"
                                placeholder="Search..."
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <Link className="flashcards-page__nav-link">
                        <img className="flashcards-page__nav-link-img" src={addImg} alt="" />
                        <p>New List</p>
                    </Link>
                </nav>
                <div className="flashcards-page__items">
                    {filteredLanguages.map((item) => {
                        return <FlashcardsDeck flashcardsData={item} key={item.id} />;
                    })}
                </div>
            </div>
        </div>
    );
}
