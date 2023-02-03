import "./FlashcardsDeckPage.scss";

// pages
import EditFlashcard from "../../components/EditFlashcard/EditFlashcard";
import InputField from "../../components/InputField/InputField";
import NewFlashcard from "../../components/NewFlashcard/NewFlashcard";

// libraries
import { useEffect } from "react";
import { getDictionariesId, getDictionariesWords } from "../../utils/api";
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
    const [deck, setDeck] = useState([]);
    const [words, setWords] = useState([]);
    const [rating, setRating] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        getDictionariesId({ id }).then(({ data }) => {
            setDeck(data[0]);
            setRating(data[0].rating);
        });
        getDictionariesWords().then(({ data }) => {
            setWords(data.filter((item) => item.dictionaries_id === Number(id)));
        });
    }, []);

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
            <div className="deck-page__indv">
                <div className="deck-page__indv-name">
                    <p className="deck-page__indv-name-title">Title</p>
                    <input
                        className="deck-page__indv-name-input"
                        placeholder="Insert Term..."
                        value={deck.name}
                    />
                </div>
                <div className="deck-page__indv-rating">
                    <p className="deck-page__indv-rating-title">Rating</p>
                    <div className="deck-page__indv-rating-stars">{ratingStars}</div>
                </div>
                <div className="deck-page__indv-flag">
                    <img className="deck-page__indv-flag-img" src={flag} alt="" />
                </div>
            </div>
            <div className="deck-page__description">
                <p className="deck-page__description-title">Title</p>
                <textarea
                    className="deck-page__description-input"
                    placeholder="Insert Term..."
                    value={deck.description}
                />
            </div>
            <NewFlashcard flags={flag} />

            <div className="deck-page__edit">
                {words.map((item) => {
                    return <EditFlashcard indvWords={item} flag={flag} />;
                })}
            </div>
        </div>
    );
}
