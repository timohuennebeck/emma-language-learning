import "./FlashcardsDeck.scss";

// components

// images
import unfilledStarImg from "../../assets/icons/Star.svg";
import starsFilledImg from "../../assets/icons/star-filled.svg";
import editImg from "../../assets/icons/Edit.svg";
import continueImg from "../../assets/icons/Shield - check.svg";
import finishedImg from "../../assets/icons/check-blue.svg";

// libraries
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDictionariesWords } from "../../utils/api";

export default function FlashcardsDeck({ flashcardsData }) {
    const [rating, setRating] = useState(0);
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        getDictionariesWords().then(({ data }) => {
            setFlashcards(data.filter((item) => item.dictionaries_id === flashcardsData.id));
        });
    }, []);

    useEffect(() => {
        setRating(flashcardsData.rating);
    }, []);

    if (!flashcards) {
        return;
    }

    const flashcardsWithoutLevel = flashcards.filter((item) => item.level === 0);

    // calculates the percentage for the bar
    const progress = flashcardsWithoutLevel.length / flashcards.length;

    const progressPercentage = progress * 100 + "%";

    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(
            <img
                src={i < rating ? starsFilledImg : unfilledStarImg}
                alt=""
                className="flashcards-deck__header-rating-stars-img"
            />
        );
    }

    return (
        <div className="flashcards-deck">
            <div className="flashcards-deck__header">
                <div className="flashcards-deck__header-rating">
                    <h2>{flashcardsData.name}</h2>
                    <div className="flashcards-deck__header-rating-stars">{stars}</div>
                </div>
                <Link to={`/flashcards/${flashcardsData.id}`}>
                    <img src={editImg} alt="" />
                </Link>
            </div>
            <p>{flashcardsData.description}</p>
            <p className="flashcards-deck__percentage">{progressPercentage} Finished</p>
            <div className="flashcards-deck__bar">
                <div className="flashcards-deck__bar-progress">
                    <div
                        className="flashcards-deck__bar-progress-amount"
                        style={{ width: progressPercentage }}
                    ></div>
                </div>
                <img src={finishedImg} alt="" />
            </div>
            <Link
                to={`/flashcards/${flashcardsData.id}/revision`}
                className="flashcards-deck__button"
            >
                <img src={continueImg} alt="" />
                <p>Continue Learning...</p>
            </Link>
        </div>
    );
}
