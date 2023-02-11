import "./UploadNewFlashcardsDeck.scss";

// pages
import NewFlashcard from "../../components/NewFlashcard/NewFlashcard";

// libraries
import { addDictionaries } from "../../utils/api";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

// flags
import ukImg from "../../assets/languages/united kingdom.svg";
import franceImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";

// images
import unfilledStarImg from "../../assets/icons/Star.svg";
import filledStarImg from "../../assets/icons/star-filled.svg";
import SlideInFromTop from "../../components/SlideInFromTop/SlideInFromTop";

export default function UploadNewFlashcardsDeck() {
    const [deck, setDeck] = useState({ name: "", description: "", rating: 0 });
    const [toggleUpload, setToggleUpload] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [currentLanguage, setCurrentLanguage] = useState(ukImg);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    // pulls the values from the input fields and updates them
    const handleInputChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        addDictionaries({
            flashcardData: {
                name: deck.name,
                description: deck.description,
                language: deck.language,
                rating: deck.rating,
            },
        })
            .then(() => {
                setToggleUpload(true);
                setDeck({ name: "", description: "" });
                setSelectedStars(0);

                setTimeout(() => {
                    navigate("/flashcards");
                }, [2000]);
            })
            .catch((err) => {
                console.error(`There has been an error updating ${id}! ${err}`);
            });
    };

    const handleStars = (index) => {
        setSelectedStars(index + 1);
        setDeck({ ...deck, rating: index + 1 });
    };

    const languages = [
        { id: 1, name: "English", flag: ukImg },
        { id: 2, name: "French", flag: franceImg },
        { id: 3, name: "Spanish", flag: spainImg },
        { id: 4, name: "German", flag: germanyImg },
    ];

    const filteredLanguages = languages.filter((item) => item.flag !== currentLanguage);

    const handleLanguage = (item) => {
        setToggleDropdown(!toggleDropdown);
        setCurrentLanguage(item.flag);
        setDeck({ ...deck, language: item.name });
    };

    return (
        <div className="new-deck">
            {toggleUpload && <SlideInFromTop name="+ Deck has been added" />}
            <div className="new-deck__back">
                <Link className="new-deck__back-link" to="/flashcards">
                    Back To Decks
                </Link>
            </div>
            <form className="new-deck__form" onSubmit={handleSubmit}>
                <div className="new-deck__form-indv">
                    <div className="new-deck__form-indv-name">
                        <p className="new-deck__form-indv-name-title">Title</p>
                        <input
                            className="new-deck__form-indv-name-input"
                            placeholder="Insert Term..."
                            value={deck.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="new-deck__form-indv-rating">
                        <p className="new-deck__form-indv-rating-title">Rating</p>
                        <div className="new-deck__form-indv-rating-stars">
                            {[...Array(5)].map((star, index) => (
                                <img
                                    key={index}
                                    className="new-deck__form-indv-rating-stars-img"
                                    src={selectedStars > index ? filledStarImg : unfilledStarImg}
                                    onMouseEnter={() => handleStars(index)}
                                    alt="star"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="new-deck__form-indv-flag">
                        <div
                            className="new-deck__form-indv-flag-box"
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        >
                            <img
                                className="new-deck__form-indv-flag-box-img"
                                src={currentLanguage}
                                alt=""
                            />
                        </div>

                        {toggleDropdown && (
                            <div className="new-deck__form-indv-flag-dropdown">
                                {filteredLanguages.map((item) => {
                                    return (
                                        <div
                                            className="new-deck__form-indv-flag-dropdown-box"
                                            onClick={() => handleLanguage(item)}
                                        >
                                            <img
                                                className="new-deck__form-indv-flag-dropdown-box-img"
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
                <div className="new-deck__form-description">
                    <p className="new-deck__form-description-title">Title</p>
                    <textarea
                        className="new-deck__form-description-input"
                        placeholder="Insert Term..."
                        value={deck.description}
                        name="description"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="new-deck__form-box">
                    <button className="new-deck__form-box-button">Save Changes</button>
                </div>
            </form>
        </div>
    );
}
