import { useEffect, useState } from "react";
import Flashcard from "../../components/Flashcard/Flashcard";
import { getDictionariesWords } from "../../utils/api";
import "./FlashcardsRevisionPage.scss";

export default function FlashcardsRevisionPage() {
    const [dictionariesData, setDictionariesData] = useState([]);

    useEffect(() => {
        getDictionariesWords().then(({ data }) => {
            setDictionariesData(data);
        });
    }, []);

    if (!dictionariesData) {
        return;
    }

    return (
        <div className="flashcards-revision">
            <Flashcard data={dictionariesData} />
        </div>
    );
}
