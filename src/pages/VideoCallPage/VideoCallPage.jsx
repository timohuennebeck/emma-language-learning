import "./VideoCallPage.scss";

// images
import micMutedImg from "../../assets/icons/microphone-mute.svg";
import micUnmuteddImg from "../../assets/icons/microphone.svg";

// components
import VCNavigation from "../../components/VCNavigation/VCNavigation";

// libraries
import { useState } from "react";

export default function VideoCallPage() {
    return (
        <div className="emma-video">
            <VCNavigation />
        </div>
    );
}
