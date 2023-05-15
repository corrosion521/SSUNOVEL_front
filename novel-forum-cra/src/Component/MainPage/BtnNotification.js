import ModalNotification from "../Notification/ModalNotification";
import ModalBackground from "../Notification/ModalBackground";
import { useState } from "react";
import ModalPortal from "../Notification/ModalPortal";

const BtnNotification = () => {
    const [isModalOn, setIsModalOn] = useState(false);

    const reverseState = () => {
        setIsModalOn(!isModalOn);
    }

    return (
        <div className="notification">
            <button
                className="notification-btn"
                type="button" onClick={reverseState}
                style={{ background: "none", border: "none", }}>
                <img src="../BtnNotification.png" />
            </button>
            {/* {isModalOn && (
                <ModalPortal closePortal={reverseState}>
                    <ModalNotification reverseState={reverseState} />
                </ModalPortal>
            )} */}
            <div className="notification-modal">
                {isModalOn && (<ModalBackground reverseState={reverseState}/>)}
                {isModalOn && (<ModalNotification reverseState={reverseState} />)}
            </div>
        </div>
    )
}

export default BtnNotification;