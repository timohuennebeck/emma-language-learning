import "./CalendarElement.scss";

// images
import leftArrowImg from "../../assets/icons/chevron-left.svg";
import rightArrowImg from "../../assets/icons/chevron-right.svg";
import ButtonLinkTransparent from "../ButtonLinkTransparent/ButtonLinkTransparent";
import { useState } from "react";

export default function CalendarElement() {
    const [showSchedule, setShowSchedule] = useState(false);

    return (
        <div className="calendar">
            <div className="calendar__left">
                <p>View Full Schedule</p>
                <div className="calendar__left-nav">
                    <p>August 2023</p>
                    <div className="calendar__left-nav-arrows">
                        <img src={leftArrowImg} alt="" />
                        <img src={rightArrowImg} alt="" />
                    </div>
                </div>
                <div className="calendar__left-date">
                    <p className="calendar__left-date-indv">SUN</p>
                    <p className="calendar__left-date-indv">MOE</p>
                    <p className="calendar__left-date-indv">TUE</p>
                    <p className="calendar__left-date-indv">WED</p>
                    <p className="calendar__left-date-indv">THU</p>
                    <p className="calendar__left-date-indv">FRI</p>
                    <p className="calendar__left-date-indv">SAT</p>
                </div>
                <div className="calendar__left-week">
                    {/* map through each element */}
                    <p
                        className="calendar__left-week-paragraph"
                        onMouseEnter={() => setShowSchedule(true)}
                    >
                        30
                    </p>
                    <p className="calendar__left-week-paragraph">31</p>
                    <p className="calendar__left-week-paragraph">1</p>
                    <p className="calendar__left-week-paragraph">2</p>
                    <p className="calendar__left-week-paragraph">3</p>
                    <p className="calendar__left-week-paragraph">4</p>
                    <p className="calendar__left-week-paragraph">5</p>
                    <p className="calendar__left-week-paragraph">6</p>
                    <p className="calendar__left-week-paragraph">7</p>
                    <p className="calendar__left-week-paragraph">8</p>
                    <p className="calendar__left-week-paragraph">9</p>
                    <p className="calendar__left-week-paragraph">10</p>
                    <p className="calendar__left-week-paragraph">11</p>
                    <p className="calendar__left-week-paragraph">12</p>
                    <p className="calendar__left-week-paragraph">13</p>
                    <p className="calendar__left-week-paragraph">14</p>
                    <p className="calendar__left-week-paragraph">15</p>
                    <p className="calendar__left-week-paragraph">16</p>
                    <p className="calendar__left-week-paragraph">17</p>
                    <p className="calendar__left-week-paragraph">18</p>
                    <p className="calendar__left-week-paragraph">19</p>
                    <p className="calendar__left-week-paragraph">20</p>
                    <p className="calendar__left-week-paragraph">21</p>
                    <p className="calendar__left-week-paragraph">22</p>
                    <p className="calendar__left-week-paragraph">23</p>
                    <p className="calendar__left-week-paragraph">24</p>
                    <p className="calendar__left-week-paragraph">25</p>
                    <p className="calendar__left-week-paragraph">26</p>
                    <p className="calendar__left-week-paragraph">27</p>
                    <p className="calendar__left-week-paragraph">28</p>
                    <p className="calendar__left-week-paragraph">29</p>
                    <p className="calendar__left-week-paragraph">30</p>
                    <p className="calendar__left-week-paragraph">1</p>
                    <p className="calendar__left-week-paragraph">2</p>
                    <p className="calendar__left-week-paragraph">3</p>
                </div>
            </div>
            {showSchedule && (
                <div className="calendar__right">
                    <p>August 23, 2023</p>
                    <div className="calendar__right-choose">
                        <ButtonLinkTransparent text="9:30 PM" />
                        <ButtonLinkTransparent text="10:00 PM" />
                        <ButtonLinkTransparent text="10:30 PM" />
                    </div>
                </div>
            )}
        </div>
    );
}
