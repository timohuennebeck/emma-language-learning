import "./FlashcardsDeck.scss";

import unfilledStarImg from "../../assets/icons/Star.svg";
import starsFilledImg from "../../assets/icons/star-filled.svg";
import editImg from "../../assets/icons/Edit.svg";
import continueImg from "../../assets/icons/Shield - check.svg";
import emojiImg from "../../assets/images/emoji-no-bg.png";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function FlashcardsDeck({ data }) {
    console.log(data);

    const [rating, setRating] = useState(0);

    useEffect(() => {
        setRating(data.rating);
    }, []);

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
                <img src={data.image_url} alt="" className="flashcards-deck__header-img" />

                {/* acts as a placeholder for the avatar image */}
                <div></div>

                <div className="flashcards-deck__header-rating">
                    <h2>{data.name}</h2>

                    {/* renders the amount of stars based on the rating */}
                    <div className="flashcards-deck__header-rating-stars">{stars}</div>
                </div>
                <img src={editImg} alt="" />
            </div>
            <p>{data.description}</p>
            <p className="flashcards-deck__percentage">21% Finished</p>
            <div className="flashcards-deck__bar">
                <div className="flashcards-deck__bar-progress"></div>
            </div>
            <Link to={`/flashcards/${data.id}`} className="flashcards-deck__button">
                <img src={continueImg} alt="" />
                <p>Continue Learning...</p>
            </Link>
        </div>
    );
}
