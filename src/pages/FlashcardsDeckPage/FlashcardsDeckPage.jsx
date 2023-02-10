import "./FlashcardsDeckPage.scss";

// pages
import EditFlashcard from "../../components/EditFlashcard/EditFlashcard";
import InputField from "../../components/InputField/InputField";
import NewFlashcard from "../../components/NewFlashcard/NewFlashcard";

// libraries
import { useEffect, useRef } from "react";
import { getDictionariesId, getDictionariesWords, updateDictionaries } from "../../utils/api";
import { useParams } from "react-router-dom";
import { useState } from "react";

// flags
import franceImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";

// images
import unfilledStarImg from "../../assets/icons/Star.svg";
import starsFilledImg from "../../assets/icons/star-filled.svg";

export default function FlashcardsDeckPage() {
    const [deck, setDeck] = useState({ name: "", description: "", rating: 0 });
    const [words, setWords] = useState([]);
    const [rating, setRating] = useState(0);

    const { id } = useParams();

    // pulls the values from the input fields and updates them
    const handleInputChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        updateDictionaries({
            id,
            userInput: {
                name: deck.name,
                description: deck.description,
            },
        })
            .then(() => {
                console.log(`${id} has been updated!`);
            })
            .catch((err) => {
                console.error(`There has been an error updating ${id}! ${err}`);
            });
    };

    // receives the data from the api and sets it to the corresponding values
    useEffect(() => {
        // finds the right flashcard deck based on the url
        getDictionariesId({ id }).then(({ data }) => {
            setDeck(data[0]);
            setRating(data[0].rating);
        });

        // individual words that are shown on the flashcards
        getDictionariesWords().then(({ data }) => {
            setWords(data.filter((item) => item.dictionaries_id === Number(id)));
        });
    }, []);

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

    // finds the correct flag based on the vocabularies language
    let flag;

    if (deck.language === "Spanish") {
        flag = spainImg;
    } else if (deck.language === "French") {
        flag = franceImg;
    } else {
        flag = germanyImg;
    }

    return (
        <div className="deck-page">
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
                        <img className="deck-page__form-indv-flag-img" src={flag} alt="" />
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
            {/* <NewFlashcard flags={flag} />

            <div className="deck-page__edit">
                {words.map((item) => {
                    return <EditFlashcard indvWords={item} flag={flag} key={item.id}/>;
                })}
            </div> */}
        </div>
    );
}
