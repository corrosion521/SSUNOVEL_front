const ModalBackground = ({reverseState}) => {
    return (
        <div
        className="modal-background"
        onClick={reverseState}
        style={{width:"100%", height:"100%", zIndex: "1010", background:"none",
        position:"fixed", left:"50%", right:"50%", transform:"translate(-50%, -50%)",}}
        ></div>
    )
}
export default ModalBackground;