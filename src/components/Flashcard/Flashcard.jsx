import React, { useState } from "react";

export default function Flashcard({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentFlashcard = data[currentIndex];

    function handlePrevClick() {
        setCurrentIndex((currentIndex + data.length - 1) % data.length);
    }

    function handleNextClick() {
        setCurrentIndex((currentIndex + 1) % data.length);
    }

    if (!currentFlashcard) {
        return;
    }

    return (
        <div className="flashcard">
            <div className="flashcard-body">
                <p className="flashcard-question">{currentFlashcard.english}</p>
                <p className="flashcard-answer">{currentFlashcard.foreign_translation}</p>
            </div>
            <button className="flashcard-prev" onClick={handlePrevClick}>
                Prev
            </button>
            <button className="flashcard-next" onClick={handleNextClick}>
                Next
            </button>
        </div>
    );
}
