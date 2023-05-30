const ModalNotification = ({ reverseState }) => {
    return (
        // <div className="">
        <div className="modal-frame"
            style={{
                border: '1px solid #dee2e6',
                borderRadius: "5px",
                padding: "10px",
                width: "200px",
                fontSize: "15px",
                overflowY: "scroll",
            }}>
            <div className="modal-header"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "20px",
                }}>
                <p>알림 제목</p>
                <button
                    type="button"
                    onClick={reverseState}
                    style={{ background: "none", border: "none" }}
                >X</button>
            </div>

            <p>알림내용</p>
        </div>
        // </div>
    )
}

export default ModalNotification;