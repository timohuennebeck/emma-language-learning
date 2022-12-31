import "./CalendarElement.scss";

// images
import leftArrowImg from "../../assets/icons/chevron-left.svg";
import rightArrowImg from "../../assets/icons/chevron-right.svg";

export default function CalendarElement() {
    return (
        <div className="calendar">
            <p>View Full Schedule</p>
            <div className="calendar__nav">
                <p>August 2023</p>
                <div className="calendar__nav-arrows">
                    <img src={leftArrowImg} alt="" />
                    <img src={rightArrowImg} alt="" />
                </div>
            </div>
            <div className="calendar__date">
                <p className="calendar__date-indv">SUN</p>
                <p className="calendar__date-indv">MOE</p>
                <p className="calendar__date-indv">TUE</p>
                <p className="calendar__date-indv">WED</p>
                <p className="calendar__date-indv">THU</p>
                <p className="calendar__date-indv">FRI</p>
                <p className="calendar__date-indv">SAT</p>
            </div>
            <div className="calendar__week">
                <div className="calendar__week-one">
                    <p className="calendar__week-paragraph">30</p>
                    <p className="calendar__week-paragraph">30</p>
                    <p className="calendar__week-paragraph">30</p>
                    <p className="calendar__week-paragraph">30</p>
                    <p className="calendar__week-paragraph">30</p>
                    <p className="calendar__week-paragraph">30</p>
                    <p className="calendar__week-paragraph">30</p>
                </div>
                <div className="calendar__week-two">
                    <p className="calendar__week-paragraph">6</p>
                    <p className="calendar__week-paragraph">7</p>
                    <p className="calendar__week-paragraph">8</p>
                    <p className="calendar__week-paragraph">9</p>
                    <p className="calendar__week-paragraph">10</p>
                    <p className="calendar__week-paragraph">11</p>
                    <p className="calendar__week-paragraph">12</p>
                </div>
                <div className="calendar__week-three">
                    <p className="calendar__week-paragraph">13</p>
                    <p className="calendar__week-paragraph">14</p>
                    <p className="calendar__week-paragraph">15</p>
                    <p className="calendar__week-paragraph">16</p>
                    <p className="calendar__week-paragraph">17</p>
                    <p className="calendar__week-paragraph">18</p>
                    <p className="calendar__week-paragraph">19</p>
                </div>
                <div className="calendar__week-four">
                    <p className="calendar__week-paragraph">20</p>
                    <p className="calendar__week-paragraph">21</p>
                    <p className="calendar__week-paragraph">22</p>
                    <p className="calendar__week-paragraph">23</p>
                    <p className="calendar__week-paragraph">24</p>
                    <p className="calendar__week-paragraph">25</p>
                    <p className="calendar__week-paragraph">26</p>
                </div>
                <div className="calendar__week-five">
                    <p className="calendar__week-paragraph">27</p>
                    <p className="calendar__week-paragraph">28</p>
                    <p className="calendar__week-paragraph">29</p>
                    <p className="calendar__week-paragraph">30</p>
                    <p className="calendar__week-paragraph">1</p>
                    <p className="calendar__week-paragraph">2</p>
                    <p className="calendar__week-paragraph">3</p>
                </div>
            </div>
        </div>
    );
}
