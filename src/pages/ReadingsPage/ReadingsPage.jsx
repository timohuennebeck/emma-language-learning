import "./ReadingsPage.scss";

// images
import spainImg from "../../assets/languages/spain.svg";
import unitedKingdomImg from "../../assets/languages/united kingdom.svg";
import germanyImg from "../../assets/languages/germany.svg";
import franceImg from "../../assets/languages/france.svg";
import SelectReadings from "../../components/SelectReadings/SelectReadings";
import searchImg from "../../assets/icons/search.svg";
import { getReadings } from "../../utils/api";
import { useState } from "react";
import { useEffect } from "react";

export default function ReadingsPage() {
    const [readingsData, setReadingsData] = useState([]);

    useEffect(() => {
        getReadings().then(({ data }) => {
            setReadingsData(data);
        });
    }, []);

    const filteredLanguages = readingsData.filter((item) => item.language === "Spanish");

    return (
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
                    <div className="readings__left-languages-indv">
                        <img
                            src={unitedKingdomImg}
                            alt=""
                            className="readings__left-languages-indv-flag"
                        />
                        <p>English</p>
                    </div>
                    <div className="readings__left-languages-indv">
                        <img src={spainImg} alt="" className="readings__left-languages-indv-flag" />
                        <p>Spanish</p>
                    </div>
                    <div className="readings__left-languages-indv">
                        <img
                            src={germanyImg}
                            alt=""
                            className="readings__left-languages-indv-flag"
                        />
                        <p>German</p>
                    </div>
                    <div className="readings__left-languages-indv">
                        <img
                            src={franceImg}
                            alt=""
                            className="readings__left-languages-indv-flag"
                        />
                        <p>French</p>
                    </div>
                </div>
                <div className="readings__left-choose">
                    {filteredLanguages.map((item) => {
                        return <SelectReadings data={item} />;
                    })}
                </div>
            </div>
            <div className="readings__right">
                <h2 className="readings__right-header">Exploring The Future of AI (B2)</h2>
                <p className="readings__right-paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis molestias
                    porro rerum quaerat explicabo voluptatem quas iste obcaecati officia ea ex
                    quisquam, est nisi temporibus aspernatur fugit tenetur placeat optio suscipit
                    praesentium ad exercitationem. Veritatis sit saepe maiores mollitia, delectus
                    repudiandae possimus ullam dolorum autem. Minima inventore doloremque odio quo
                    error sit quidem voluptas accusantium laudantium et cupiditate, culpa aliquam
                    vitae, consequuntur tempora explicabo aperiam modi voluptates? Sunt aspernatur,
                    repudiandae quo nihil exercitationem recusandae corrupti sapiente voluptatem,
                    officia deleniti quis! Tempore similique rem nisi repellat minus atque neque
                    mollitia, maiores officia officiis corporis dolorem nam, quos dicta sed!
                    Laudantium, ullam!
                </p>
            </div>
        </div>
    );
}
