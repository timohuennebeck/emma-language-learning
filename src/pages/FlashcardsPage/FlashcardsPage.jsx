import "./FlashcardsPage.scss";

import FlashcardsDeck from "../../components/FlashcardsDeck/FlashcardsDeck";
import { useEffect } from "react";
import { getDictionaries, getDictionariesWords } from "../../utils/api";

export default function FlashcardsPage() {
    useEffect(() => {
        getDictionaries().then(({ data }) => {
            console.log(data);
        });
        getDictionariesWords().then(({ data }) => {
            console.log(data);
        });
    }, []);

    return (
        <div className="flashcards-page">
            <FlashcardsDeck />
            <FlashcardsDeck />
            <FlashcardsDeck />
            <FlashcardsDeck />
        </div>
    );
}
