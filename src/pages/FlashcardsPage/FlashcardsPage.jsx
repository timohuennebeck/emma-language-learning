import "./FlashcardsPage.scss";

import FlashcardsDeck from "../../components/FlashcardsDeck/FlashcardsDeck";
import { useEffect } from "react";
import { getDictionaries, getDictionariesWords } from "../../utils/api";
import { useState } from "react";

export default function FlashcardsPage() {
    const [dictionariesData, setDictionariesData] = useState([]);

    useEffect(() => {
        getDictionaries().then(({ data }) => {
            setDictionariesData(data);
        });
    }, []);

    return (
        <div className="flashcards-page">
            {dictionariesData.map((item) => {
                return <FlashcardsDeck data={item} />;
            })}
        </div>
    );
}
