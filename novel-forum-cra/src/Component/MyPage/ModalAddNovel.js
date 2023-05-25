const ModalAddNovel = ({ setAddModalOpen }) => {
    const closeModal = () => {
        setAddModalOpen(false);
    }

    return (
        <div>
            <div className="modalframe" style={{position:'fixed'}}>
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <img onClick={closeModal} src="../IconCancel.png" style={{ width: '25px', height: '25px', border: 'none', background: 'none', position: 'absolute', right: '0' }}></img>

                </div>


            </div>
        </div >
    );
}


export default ModalAddNovel;