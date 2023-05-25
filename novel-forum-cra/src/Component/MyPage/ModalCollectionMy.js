import { useState } from "react";
import ModalAddNovel from "./ModalAddNovel";
import Novel from "../NovelPage/Novel";

const ModalCollectionMy = ({ setModalOpen }) => {
    // 현재 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    }
    // 작품추가 모달
    const [addModalOpen, setAddModalOpen] = useState(false);
    // 작품추가 모달 켜기
    const showModal = () => {
        setAddModalOpen(true);
    }

    const [collectionName, setCollectionName] = useState("");


    return (
        <div className="modalbackground">
            <div className="modalframe">
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <img onClick={closeModal} src="../IconCancel.png" style={{ width: '25px', height: '25px', border: 'none', background: 'none', position: 'absolute', right: '0' }}></img>
                </div>
                <div className="modal-contents">
                    <button type="button" className="add-novel-btn" onClick={showModal}>작품추가</button>
                    <label htmlFor="collectionName">보관함 이름</label>
                    <input
                    name="collectionName"
                    id="collectionName"
                    type="text"
                    required
                    value={collectionName}
                    // onChange={handleChange}
></input>
                </div>
            </div>
            {addModalOpen && <ModalAddNovel setAddModalOpen={setAddModalOpen} />}
        </div >
    )
}

export default ModalCollectionMy;