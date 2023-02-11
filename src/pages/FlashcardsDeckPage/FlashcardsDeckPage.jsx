import "./FlashcardsDeckPage.scss";

// pages
import EditFlashcard from "../../components/EditFlashcard/EditFlashcard";
import NewFlashcard from "../../components/NewFlashcard/NewFlashcard";

// libraries
import { useEffect } from "react";
import { getDictionariesId, getDictionariesWords, updateDictionaries } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

// flags
import ukImg from "../../assets/languages/united kingdom.svg";
import franceImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";

// images
import unfilledStarImg from "../../assets/icons/Star.svg";
import starsFilledImg from "../../assets/icons/star-filled.svg";
import SlideInFromTop from "../../components/SlideInFromTop/SlideInFromTop";

export default function FlashcardsDeckPage() {
    const [deck, setDeck] = useState({ name: "", description: "", rating: 0 });
    const [words, setWords] = useState([]);
    const [rating, setRating] = useState(0);

    // refreshs the page upon adding a new flashcard
    const [updateList, setUpdateList] = useState(false);
    const [toggleUpload, setToggleUpload] = useState(false);
    const [toggleMessage, setToggleMessage] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("");
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const { id } = useParams();

    // pulls the values from the input fields and updates them
    const handleInputChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    // pulls the data and sends the data to the api
    const handleSubmit = (event) => {
        event.preventDefault();

        updateDictionaries({
            id,
            userInput: {
                name: deck.name,
                description: deck.description,
                language: deck.language,
            },
        })
            .then(() => {
                setToggleMessage(true);

                setTimeout(() => {
                    setToggleMessage(false);
                }, [2000]);
            })
            .catch((err) => {
                console.error(`There has been an error updating ${id}! ${err}`);
            });
    };

    // updates the language based on the dropdown menu selection and triggers the message
    const handleLanguage = (event) => {
        setCurrentLanguage(event.flag);
        setDeck({ ...deck, language: event.name });
        setToggleDropdown(!toggleDropdown);
    };

    // receives the data from the api and sets it to the corresponding values
    useEffect(() => {
        // finds the right flashcard deck based on the url
        getDictionariesId({ id }).then(({ data }) => {
            setDeck(data[0]);
            setRating(data[0].rating);

            let languageFlag;

            if (data[0].language === "English") {
                languageFlag = ukImg;
            } else if (data[0].language === "French") {
                languageFlag = franceImg;
            } else if (data[0].language === "Spanish") {
                languageFlag = spainImg;
            } else {
                languageFlag = germanyImg;
            }

            setCurrentLanguage(languageFlag);
        });

        // individual words that are shown on the flashcards
        getDictionariesWords().then(({ data }) => {
            setWords(data.filter((item) => item.dictionaries_id === Number(id)).reverse());
        });
    }, [updateList]);

    // loops throught the ratings and inserts the amount of filled out stars as the rating
    const ratingStars = [];

    for (let i = 0; i < 5; i++) {
        ratingStars.push(
            <img
                src={i < rating ? starsFilledImg : unfilledStarImg}
                alt=""
                className="deck-page__indv-rating-stars-img"
            />
        );
    }

    // languages for the dropdown menu
    const chooseLanguage = [
        { id: 1, name: "English", flag: ukImg },
        { id: 2, name: "French", flag: franceImg },
        { id: 3, name: "Spanish", flag: spainImg },
        { id: 4, name: "German", flag: germanyImg },
    ];

    // filters through them to hide the ones that are selected
    const filteredLanguages = chooseLanguage.filter((item) => item.flag !== currentLanguage);

    return (
        <div className="deck-page">
            {(toggleUpload || toggleMessage) && (
                <SlideInFromTop
                    name={`+ Flashcard has been ${toggleUpload ? "added" : "updated"}`}
                />
            )}

            <div className="deck-page__back">
                <Link className="deck-page__back-link" to="/flashcards">
                    Back To Decks
                </Link>
            </div>
            <form className="deck-page__form" onSubmit={handleSubmit}>
                <div className="deck-page__form-indv">
                    <div className="deck-page__form-indv-name">
                        <p className="deck-page__form-indv-name-title">Title</p>
                        <input
                            className="deck-page__form-indv-name-input"
                            placeholder="Insert Term..."
                            value={deck.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="deck-page__form-indv-rating">
                        <p className="deck-page__form-indv-rating-title">Rating</p>
                        <div className="deck-page__form-indv-rating-stars">{ratingStars}</div>
                    </div>
                    <div className="deck-page__form-indv-flag">
                        <div
                            className="deck-page__form-indv-flag-box"
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        >
                            <img
                                className="deck-page__form-indv-flag-box-img"
                                src={currentLanguage}
                                alt=""
                            />
                        </div>
                        {toggleDropdown && (
                            <div className="deck-page__form-indv-flag-languages">
                                {filteredLanguages.map((item) => {
                                    return (
                                        <div
                                            className="deck-page__form-indv-flag-languages-box"
                                            onClick={() => handleLanguage(item)}
                                        >
                                            <img
                                                className="deck-page__form-indv-flag-languages-box-img"
                                                src={item.flag}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div className="deck-page__form-description">
                    <p className="deck-page__form-description-title">Title</p>
                    <textarea
                        className="deck-page__form-description-input"
                        placeholder="Insert Term..."
                        value={deck.description}
                        name="description"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="deck-page__form-box">
                    <button className="deck-page__form-box-button">Save Changes</button>
                </div>
            </form>
            <NewFlashcard
                currentLanguage={currentLanguage}
                deckData={deck}
                updateList={updateList}
                setUpdateList={setUpdateList}
                setToggleUpload={setToggleUpload}
            />

            <div className="deck-page__edit">
                {words.map((item) => {
                    return (
                        <EditFlashcard
                            indvWords={item}
                            currentLanguage={currentLanguage}
                            setToggleMessage={setToggleMessage}
                            key={item.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}
