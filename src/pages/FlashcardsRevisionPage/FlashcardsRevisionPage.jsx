import "./FlashcardsRevisionPage.scss";

// components
import Flashcard from "../../components/Flashcard/Flashcard";

// libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDictionariesWords } from "../../utils/api";

export default function FlashcardsRevisionPage() {
    const [dictionariesData, setDictionariesData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getDictionariesWords().then(({ data }) => {
            setDictionariesData(data.filter((item) => item.dictionaries_id === Number(id)));
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
