import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ModalNotification from "./ModalNotification";

const ModalPortal = ({children, closePortal}) => {
    const ref = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
        if(document) {
            const dom = document.getElementById("modal-root");
            ref.current = dom;
        }
    },[]);

    console.log(mounted, document, ref.current);

    if(ref.current&&mounted){
        return createPortal(
            // <div className="modal-container">
            //     <div className="modal-background" role="presentation" onClick={closePortal} />
            //     {children}
            // </div>
            <ModalNotification reverseState={closePortal}/>,
            ref.current
        )
    }

    return null;
};

export default ModalPortal;