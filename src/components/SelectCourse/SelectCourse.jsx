import "./SelectCourse.scss";

// images
import intermediateImg from "../../assets/icons/intermediate.svg";
import emojiImg from "../../assets/images/emoji.jpg";
import { useState } from "react";

export default function SelectCourse({ name }) {
    const [selectText, setSelectText] = useState(false);

    return (
        <div className="select-course">
            <img src={emojiImg} alt="" className="select-course-img" />
            <div className="select-course__right">
                <h3>{name}</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam possimus
                    sapiente nemo illo accusamus ab...
                </p>
                <div
                    className="select-course__right-level"
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
                                className="select-course__right-level-img"
                            />
                            <p>Intermediate (B2)</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
