import "./FlashcardsPage.scss";

import FlashcardsDeck from "../../components/FlashcardsDeck/FlashcardsDeck"

export default function FlashcardsPage() {
    return (
        <div className="flashcards-page">
            <FlashcardsDeck />
            <FlashcardsDeck />
            <FlashcardsDeck />
            <FlashcardsDeck />
        </div>
    );
}
