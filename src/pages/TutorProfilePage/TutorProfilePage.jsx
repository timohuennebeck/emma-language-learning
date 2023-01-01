import "./TutorProfilePage.scss";

// components
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import Review from "../../components/Review/Review";
import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";
import ReferFriend from "../../components/ReferFriend/ReferFriend";
import PendingInvitation from "../../components/PendingInvitation/PendingInvitation";
import UpcomingLesson from "../../components/UpcomingLesson/UpcomingLesson";

export default function TutorProfilePage() {
    return (
        <div className="tutor-editable">
            <div className="tutor-editable__left">
                <TutorMinimised />
                <div className="tutor-editable__left-pending">
                    <p className="tutor-editable__left-pending-header">Invitations Pending</p>
                    <div className="tutor-editable__left-container-pending">
                        <PendingInvitation />
                        <PendingInvitation />
                        <PendingInvitation />
                    </div>
                </div>
                <div className="tutor-editable__left-lessons">
                    <p className="tutor-editable__left-lessons-header">Upcoming Lessons</p>
                    <div className="tutor-editable__left-container-lessons">
                        <UpcomingLesson />
                        <UpcomingLesson />
                        <UpcomingLesson />
                    </div>
                </div>
                <div className="tutor-editable__left-reviews">
                    <p className="tutor-editable__left-reviews-header">11 Reviews</p>
                    <div className="tutor-editable__left-container-reviews">
                        <Review />
                        <Review />
                        <Review />
                    </div>
                </div>
            </div>
            <div className="tutor-editable__right">
                <ReferFriend />
                <LanguageLevel />
                <LanguageLevel />
                <LanguageLevel />
            </div>
        </div>
    );
}
