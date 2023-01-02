import "./StudentPrivateProfilePage.scss";

// components
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import Review from "../../components/Review/Review";
import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";
import ReferFriend from "../../components/ReferFriend/ReferFriend";
import PendingInvitation from "../../components/PendingInvitation/PendingInvitation";
import UpcomingLesson from "../../components/UpcomingLesson/UpcomingLesson";

export default function StudentPrivateProfilePage() {
    return (
        <div className="student-private">
            <div className="student-private__left">
                <TutorMinimised />
                <div className="student-private__left-pending">
                    <p className="student-private__left-pending-header">Invitations Pending</p>
                    <div className="student-private__left-container-pending">
                        <PendingInvitation />
                        <PendingInvitation />
                        <PendingInvitation />
                    </div>
                </div>
                <div className="student-private__left-lessons">
                    <p className="student-private__left-lessons-header">Upcoming Lessons</p>
                    <div className="student-private__left-container-lessons">
                        <UpcomingLesson />
                        <UpcomingLesson />
                        <UpcomingLesson />
                    </div>
                </div>
                <div className="student-private__left-tutors">
                    <p className="student-private__left-tutors-header">Your Language Tutors</p>
                    <div className="student-private__left-container-tutors">
                        <TutorMinimised />
                        <TutorMinimised />
                        <TutorMinimised />
                    </div>
                </div>
            </div>
            <div className="student-private__right">
                <ReferFriend />
                <LanguageLevel />
                <LanguageLevel />
                <LanguageLevel />
            </div>
        </div>
    );
}
