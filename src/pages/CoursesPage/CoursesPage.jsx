import "./CoursesPage.scss";

// images
import spainImg from "../../assets/languages/spain.svg";
import unitedKingdomImg from "../../assets/languages/united kingdom.svg";
import germanyImg from "../../assets/languages/germany.svg";
import franceImg from "../../assets/languages/france.svg";
import SelectCourse from "../../components/SelectCourse/SelectCourse";
import searchImg from "../../assets/icons/search.svg";

export default function CoursesPage() {
    return (
        <div className="courses">
            <div className="courses__left">
                <div className="courses__left-search">
                    <img src={searchImg} alt="" className="courses__left-search-img" />
                    <input
                        placeholder="Let's explore some stories... (Beginner, Intermediate, or Advanced)!"
                        className="courses__left-search-input"
                    />
                </div>
                <div className="courses__left-languages">
                    <div className="courses__left-languages-indv">
                        <img
                            src={unitedKingdomImg}
                            alt=""
                            className="courses__left-languages-indv-flag"
                        />
                        <p>English</p>
                    </div>
                    <div className="courses__left-languages-indv">
                        <img src={spainImg} alt="" className="courses__left-languages-indv-flag" />
                        <p>Spanish</p>
                    </div>
                    <div className="courses__left-languages-indv">
                        <img
                            src={germanyImg}
                            alt=""
                            className="courses__left-languages-indv-flag"
                        />
                        <p>German</p>
                    </div>
                    <div className="courses__left-languages-indv">
                        <img src={franceImg} alt="" className="courses__left-languages-indv-flag" />
                        <p>French</p>
                    </div>
                </div>
                <div className="courses__left-choose">
                    <SelectCourse name="Exploring The Future of AI" />
                    <SelectCourse name="Exploring The Future of AI" />
                    <SelectCourse name="Exploring The Future of AI" />
                    <SelectCourse name="Exploring The Future of AI" />
                </div>
            </div>
            <div className="courses__right">
                <h2 className="courses__right-header">Exploring The Future of AI (B2)</h2>
                <p className="courses__right-paragraph">
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
