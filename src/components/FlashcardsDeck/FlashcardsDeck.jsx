import "./FlashcardsDeck.scss";

import starsImg from "../../assets/icons/Star.svg";
import starsFilledImg from "../../assets/icons/star-filled.svg";
import editImg from "../../assets/icons/Edit.svg";
import continueImg from "../../assets/icons/Shield - check.svg";
import emojiImg from "../../assets/images/emoji-no-bg.png";

export default function FlashcardsDeck() {
    return (
        <div className="flashcards-deck">
            <div className="flashcards-deck__header">
                <img src={emojiImg} alt="" className="flashcards-deck__header-img" />

                {/* this is just a placeholder for the avatar image */}
                <div></div>
                
                <div className="flashcards-deck__header-rating">
                    <h2>Intermediate Spanish</h2>
                    <div className="flashcards-deck__header-rating-stars">
                        <img
                            src={starsFilledImg}
                            alt=""
                            className="flashcards-deck__header-rating-stars-img"
                        />
                        <img
                            src={starsFilledImg}
                            alt=""
                            className="flashcards-deck__header-rating-stars-img"
                        />
                        <img
                            src={starsFilledImg}
                            alt=""
                            className="flashcards-deck__header-rating-stars-img"
                        />
                        <img
                            src={starsImg}
                            alt=""
                            className="flashcards-deck__header-rating-stars-img"
                        />
                        <img
                            src={starsImg}
                            alt=""
                            className="flashcards-deck__header-rating-stars-img"
                        />
                    </div>
                </div>
                <img src={editImg} alt="" />
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam possimus sapiente
                nemo illo accusamus ab...
            </p>
            <p className="flashcards-deck__percentage">21% Finished</p>
            <div className="flashcards-deck__bar">
                <div className="flashcards-deck__bar-progress"></div>
            </div>
            <div className="flashcards-deck__button">
                <img src={continueImg} alt="" />
                <p>Continue Learning...</p>
            </div>
        </div>
    );
}
