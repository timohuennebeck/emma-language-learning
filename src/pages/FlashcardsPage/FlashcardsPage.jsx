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

export default function FlashcardsPage() {
    const [dictionariesData, setDictionariesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getDictionaries().then(({ data }) => {
            setDictionariesData(data);
            console.log(data);
        });
    }, []);

    const filteredDictionaries = dictionariesData.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="flashcards-page">
            <nav className="flashcards-page__nav">
                <div className="flashcards-page__nav-left">
                    <div className="flashcards-page__nav-left-languages">
                        <div className="flashcards-page__nav-left-languages-indv">
                            <img
                                className="flashcards-page__nav-left-languages-indv-img"
                                src={franceImg}
                                alt=""
                            />
                            <p>French</p>
                        </div>
                        <div className="flashcards-page__nav-left-languages-indv">
                            <img
                                className="flashcards-page__nav-left-languages-indv-img"
                                src={spainImg}
                                alt=""
                            />
                            <p>Spanish</p>
                        </div>
                        <div className="flashcards-page__nav-left-languages-indv">
                            <img
                                className="flashcards-page__nav-left-languages-indv-img"
                                src={germanyImg}
                                alt=""
                            />
                            <p>German</p>
                        </div>
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
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Link className="flashcards-page__nav-link">
                    <img className="flashcards-page__nav-link-img" src={addImg} alt="" />
                    <p>ADD NEW LIST</p>
                </Link>
            </nav>
            <div className="flashcards-page__items">
                {filteredDictionaries.map((item) => {
                    return <FlashcardsDeck data={item} />;
                })}
            </div>
        </div>
    );
}
