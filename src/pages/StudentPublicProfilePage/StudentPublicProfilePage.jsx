import "./StudentPublicProfilePage.scss";

// components
import StudentMinimised from "../../components/StudentMinimised/StudentMinimised";
import TutorMinimised from "../../components/TutorMinimised/TutorMinimised";
import Review from "../../components/Review/Review";
import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";
import ReferFriend from "../../components/ReferFriend/ReferFriend";
import PendingInvitation from "../../components/PendingInvitation/PendingInvitation";
import UpcomingLesson from "../../components/UpcomingLesson/UpcomingLesson";
import RemainingBalance from "../../components/RemainingBalance/RemainingBalance";
import AddNewLanguage from "../../components/AddNewLanguage/AddNewLanguage";

export default function StudentPrivatePublicPage() {
    return (
        <div className="student-public">
            <div className="student-public__left">
                <ReferFriend />
                <RemainingBalance />
                <StudentMinimised />
                <div className="student-public__left-pending">
                    <p className="student-public__left-pending-header">Invitations Pending</p>
                    <div className="student-public__left-container-pending">
                        <PendingInvitation />
                        <PendingInvitation />
                        <PendingInvitation />
                    </div>
                </div>
                <div className="student-public__left-lessons">
                    <p className="student-public__left-lessons-header">Upcoming Lessons</p>
                    <div className="student-public__left-container-lessons">
                        <UpcomingLesson />
                        <UpcomingLesson />
                        <UpcomingLesson />
                    </div>
                </div>
                <div className="student-public__left-tutors">
                    <p className="student-public__left-tutors-header">Your Language Tutors</p>
                    <div className="student-public__left-container-tutors">
                        <TutorMinimised />
                        <TutorMinimised />
                    </div>
                </div>
            </div>
            <div className="student-public__right">
                <ReferFriend />
                <LanguageLevel />
                <LanguageLevel />
                <LanguageLevel />
                <AddNewLanguage />
            </div>
        </div>
    );
}