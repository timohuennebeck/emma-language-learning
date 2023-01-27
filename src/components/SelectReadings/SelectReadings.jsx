import "./SelectReadings.scss";

// images
import intermediateImg from "../../assets/icons/intermediate.svg";
import emojiImg from "../../assets/images/emoji.jpg";
import { useState } from "react";

export default function SelectReadings({ name }) {
    const [selectText, setSelectText] = useState(false);

    return (
        <div className="select-readings">
            <img src={emojiImg} alt="" className="select-readings-img" />
            <div className="select-readings__right">
                <h3>{name}</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam possimus
                    sapiente nemo illo accusamus ab...
                </p>
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
                            <p>Intermediate (B2)</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
