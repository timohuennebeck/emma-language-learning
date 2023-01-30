import "./ReadingsPage.scss";

// images
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";
import franceImg from "../../assets/languages/france.svg";
import SelectReadings from "../../components/SelectReadings/SelectReadings";
import searchImg from "../../assets/icons/search.svg";
import { getDictionariesWords, getReadings } from "../../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import SelectLanguage from "../../components/SelectLanguage/SelectLanguage";
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import UploadNewWord from "../../components/UploadNewWord/UploadNewWord";

export default function ReadingsPage() {
    const [readingsData, setReadingsData] = useState([]);
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [singleData, setSingleData] = useState([]);
    const [wholeNarrative, setWholeNarrative] = useState([]);
    const [wordsData, setWordsData] = useState([]);
    const [selectedWord, setSelectedWord] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    useEffect(() => {
        getReadings().then(({ data }) => {
            setReadingsData(data);
            setFilteredLanguages(data.filter((item) => item.language === "French"));
        });
        getDictionariesWords().then(({ data }) => {
            setWordsData(data);
        });
    }, []);

    const handleClick = (event) => {
        const languageName = event.currentTarget.getAttribute("name");
        setFilteredLanguages(readingsData.filter((item) => item.language === languageName));
    };

    const handleWord = (event) => {
        const word = event.currentTarget.getAttribute("name").toUpperCase();
        setSelectedWord(word);

        setModalIsOpen(!modalIsOpen);
    };

    const getReadingsData = (event) => {
        setSingleData(event);

        const narrative = event.narrative;
        const divideNarrative = narrative.split(" ");
        setWholeNarrative(divideNarrative);
    };

    return (
        <>
            <div className="readings">
                <div className="readings__left">
                    <div className="readings__left-search">
                        <img src={searchImg} alt="" className="readings__left-search-img" />
                        <input
                            placeholder="Let's explore some stories... (Beginner, Intermediate, or Advanced)!"
                            className="readings__left-search-input"
                        />
                    </div>
                    <div className="readings__left-languages">
                        <SelectLanguage name="French" flag={franceImg} onClick={handleClick} />
                        <SelectLanguage name="Spanish" flag={spainImg} onClick={handleClick} />
                        <SelectLanguage name="German" flag={germanyImg} onClick={handleClick} />
                    </div>
                    <div className="readings__left-choose">
                        {filteredLanguages.map((item) => {
                            return (
                                <SelectReadings
                                    data={item}
                                    onClick={getReadingsData}
                                    key={item.id}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="readings__right">
                    <h2 className="readings__right-header">
                        {singleData.name ? singleData.name : "Let's get started...!"}
                    </h2>
                    <div className="readings__right-narrative">
                        {wholeNarrative.length !== 0 ? (
                            wholeNarrative.map((item) => {
                                const wordData = wordsData.find(
                                    (word) => word.foreign_translation === item
                                );

                                let backgroundColor = "#D6F3FF";

                                if (wordData) {
                                    if (wordData.level === 3) {
                                        backgroundColor = "#FFD6D6";
                                    } else if (wordData.level === 2) {
                                        backgroundColor = "#FFFBC2";
                                    } else if (wordData.level === 1) {
                                        backgroundColor = "#D6FFD8";
                                    } else {
                                        backgroundColor = "#D6F3FF";
                                    }
                                }

                                return (
                                    <span
                                        className="readings__right-narrative-span"
                                        style={{ backgroundColor }}
                                        name={item}
                                        id={uuid()}
                                        key={uuid()}
                                        onClick={handleWord}
                                    >
                                        {item}
                                    </span>
                                );
                            })
                        ) : (
                            <>
                                <p className="readings__right-narrative-self">
                                    Please select a narrative to get started learning...
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ReactModal
                isOpen={modalIsOpen}
                className="readings__card-modal"
                overlayClassName="readings__card-modal-background"
            >
                <UploadNewWord
                    selectedWord={selectedWord}
                    setModalIsOpen={setModalIsOpen}
                    modalIsOpen={modalIsOpen}
                    singleData={singleData}
                />
            </ReactModal>
        </>
    );
}
