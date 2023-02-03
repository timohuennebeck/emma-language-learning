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
import speakImg from "../../assets/icons/Volume - High.svg";
import muteImg from "../../assets/icons/Volume - Slash.svg";
import LanguageLevelDropdown from "../../components/LanguageLevelDropdown/LanguageLevelDropdown";

export default function ReadingsPage() {
    const [readingsData, setReadingsData] = useState([]);
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [singleData, setSingleData] = useState([]);
    const [splitNarrative, setSplitNarrative] = useState([]);
    const [wordsData, setWordsData] = useState([]);
    const [selectedWord, setSelectedWord] = useState("");
    const [translatedWord, setTranslatedWord] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [speakNarrative, setSpeakNarrative] = useState("");
    const [hoverState, setHoverState] = useState("");
    const [refreshList, setRefreshList] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("French");
    const [currentLanguageLevel, setCurrentLanguageLevel] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getReadings().then(({ data }) => {
            setReadingsData(data);
            setFilteredLanguages(data.filter((item) => item.language === "French"));
        });
    }, []);

    useEffect(() => {
        getDictionariesWords().then(({ data }) => {
            setWordsData(data);
        });
    }, [refreshList]);

    const handleClick = (event) => {
        const languageName = event.currentTarget.getAttribute("name");
        setCurrentLanguage(languageName);

        if (currentLanguageLevel === "" || currentLanguageLevel === "None") {
            setFilteredLanguages(readingsData.filter((item) => item.language === languageName));
        } else {
            setFilteredLanguages(
                readingsData.filter(
                    (item) => item.language === languageName && item.level === currentLanguageLevel
                )
            );
        }
    };

    const handleWord = (event) => {
        const word = event.currentTarget.getAttribute("name").replace(/[.,?]/g, "");

        setSelectedWord(word);

        let languageCode;

        if (singleData.language === "French") {
            languageCode = "FR";
        } else if (singleData.language === "Spanish") {
            languageCode = "ES";
        } else if (singleData.language === "German") {
            languageCode = "DE";
        } else {
            languageCode = "EN";
        }

        fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${word}&target_lang=EN&source_lang=${languageCode}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTranslatedWord(data.translations[0].text);
            })
            .catch((error) => {
                console.error(error);
            });

        setModalIsOpen(!modalIsOpen);
    };

    const getReadingsData = (event) => {
        setSingleData(event);

        const narrative = event.narrative;
        setSpeakNarrative(narrative);

        const divideNarrative = narrative.split(" ");
        setSplitNarrative(divideNarrative);
    };

    const startNarrative = () => {
        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();

        let languageVoice;

        if (singleData.language === "French") {
            languageVoice = voices.find((voice) => voice.name === "Google français");
        } else if (singleData.language === "Spanish") {
            languageVoice = voices.find((voice) => voice.name === "Google español");
        } else if (singleData.language === "German") {
            languageVoice = voices.find((voice) => voice.name === "Google Deutsch");
        } else {
            languageVoice = voices.find((voice) => voice.name === "Google US English");
        }

        msg.voice = languageVoice;
        msg.text = speakNarrative;
        speechSynthesis.speak(msg);
    };

    const cancelNarrative = () => {
        speechSynthesis.cancel();
    };

    const handleLanguageLevel = (languageLevel) => {
        setCurrentLanguageLevel(languageLevel);

        if (languageLevel === "None") {
            setFilteredLanguages(readingsData.filter((item) => item.language === currentLanguage));
        } else {
            setFilteredLanguages(
                readingsData.filter(
                    (item) => item.level === languageLevel && item.language === currentLanguage
                )
            );
        }
    };

    const handleSearch = (e) => {
        setFilteredLanguages(
            readingsData.filter((item) => {
                let includeItem;
                if (currentLanguageLevel === "" || currentLanguageLevel === "None") {
                    includeItem =
                        item.name.toLowerCase().includes(e.toLowerCase()) &&
                        item.language === currentLanguage;
                } else {
                    includeItem =
                        item.level === currentLanguageLevel &&
                        item.name.toLowerCase().includes(e.toLowerCase()) &&
                        item.language === currentLanguage;
                }
                return includeItem;
            })
        );
    };

    return (
        <>
            <div className="readings">
                <div className="readings__left">
                    <div className="readings__left-search">
                        <img src={searchImg} alt="" className="readings__left-search-img" />
                        <input
                            placeholder="Let's explore some stories..."
                            className="readings__left-search-input"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <div className="readings__left-languages">
                        <SelectLanguage
                            name="French"
                            flag={franceImg}
                            onClick={handleClick}
                            currentLanguage={currentLanguage}
                        />
                        <SelectLanguage
                            name="Spanish"
                            flag={spainImg}
                            onClick={handleClick}
                            currentLanguage={currentLanguage}
                        />
                        <SelectLanguage
                            name="German"
                            flag={germanyImg}
                            onClick={handleClick}
                            currentLanguage={currentLanguage}
                        />
                        <LanguageLevelDropdown handleLanguageLevel={handleLanguageLevel} />
                    </div>
                    <div className="readings__left-choose">
                        {filteredLanguages.length === 0 ? (
                            <p className="readings__left-choose-none">
                                Whoops! Seems like we still need to populate some stories here.
                            </p>
                        ) : (
                            filteredLanguages.map((item) => {
                                return (
                                    <SelectReadings
                                        data={item}
                                        onClick={getReadingsData}
                                        key={item.id}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="readings__right">
                    <div className="readings__right-header">
                        <p className="readings__right-header-indv">
                            {singleData.name ? singleData.name : "Let's get started...!"}
                        </p>
                        <div
                            className="readings__right-header-speak"
                            onMouseEnter={() => setHoverState("speak")}
                            onMouseLeave={() => setHoverState(null)}
                        >
                            <img
                                src={speakImg}
                                alt=""
                                className={
                                    hoverState === "speak"
                                        ? "readings__right-header-speak-img hover-state-speak"
                                        : "readings__right-header-speak-img"
                                }
                                onClick={startNarrative}
                            />
                        </div>
                        <div
                            className="readings__right-header-speak"
                            onMouseEnter={() => setHoverState("mute")}
                            onMouseLeave={() => setHoverState(null)}
                        >
                            <img
                                src={muteImg}
                                alt=""
                                className={
                                    hoverState === "mute"
                                        ? "readings__right-header-speak-img hover-state-speak"
                                        : "readings__right-header-speak-img"
                                }
                                onClick={cancelNarrative}
                            />
                        </div>
                    </div>
                    <div className="readings__right-narrative">
                        {splitNarrative.length !== 0 ? (
                            splitNarrative.map((item) => {
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
                    refreshList={refreshList}
                    setRefreshList={setRefreshList}
                    translatedWord={translatedWord}
                    selectedWord={selectedWord}
                    setModalIsOpen={setModalIsOpen}
                    modalIsOpen={modalIsOpen}
                    singleData={singleData}
                />
            </ReactModal>
        </>
    );
}
