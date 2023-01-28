import "./SelectReadings.scss";

// images
import intermediateImg from "../../assets/icons/intermediate.svg";
import emojiImg from "../../assets/images/emoji.jpg";
import { useState } from "react";

export default function SelectReadings({ data }) {
    const [selectText, setSelectText] = useState(false);

    console.log(data);

    return (
        <div className="select-readings">
            <img src={emojiImg} alt="" className="select-readings-img" />
            <div className="select-readings__right">
                <h3>{data.name}</h3>
                <p className="select-readings__right-narrative">{data.narrative}</p>
                <div
                    className="select-readings__right-level"
                    onMouseEnter={() => setSelectText(true)}
                    onMouseLeave={() => setSelectText(false)}
                >
                    {selectText ? (
                        <p>Yes, I want to read this.</p>
                    ) : (
                        <>
                            <img
                                src={intermediateImg}
                                alt=""
                                className="select-readings__right-level-img"
                            />
                            <p>{data.level}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
