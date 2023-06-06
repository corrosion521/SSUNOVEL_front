// '보관함 생성' 버튼 클릭시 열리는 모달

import { useState } from "react";
import ModalAddNovel from "./ModalAddNovel";

const ModalCollectionMy = ({ setModalOpen }) => {
    // 현재 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
    }

    // 작품추가 모달
    const [addModalOpen, setAddModalOpen] = useState(false);
    // 작품추가 모달 열기
    const showModal = () => {
        setAddModalOpen(true);
    }

    const [title, setTitle] = useState("");
    const [explanation, setExplanation] = useState("");
    const [visibility, setVisibility] = useState();
    // const novelList = [];

    // 생성완료버튼 누르면 --> 서버에 데이터 보내기
    const createComplete = () => {
        // 보낼 데이터 : 이름, 설명, 공개여부, 
        // 작품 목록, (대표 작품) --> 다른 창에서 보내도 됨
        console.log(title, explanation);
        closeModal();
    }


    return (
        <div className="modalbackground">
            <div className="modalframe">
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <img onClick={closeModal} src="/IconCancel.png" style={{ width: '25px', height: '25px', border: 'none', background: 'none', position: 'absolute', right: '0' }}></img>
                </div>
                <div className="modal-contents">
                    <button type="button" className="add-novel-btn" onClick={showModal}>작품추가</button>
                    <div className="collection-title">
                        <label htmlFor="title">보관함 이름</label>
                        <input
                            id="title"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div className="collection-explanation">
                        <label htmlFor="explanation">보관함 설명</label>
                        <textarea
                            id="explanation"
                            value={explanation}
                            onChange={(e) => { setExplanation(e.target.value) }}
                        >
                        </textarea>
                    </div>
                    <div style={{ display: 'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex', gap:'10px',}}>
                        <button
                            type="button"
                            className="visibility-btn"
                            onClick={() => { setVisibility(true) }}
                            style={{
                                backgroundColor: visibility === true ? 'black' : 'white',
                                color: visibility === true ? 'white' : 'black'
                            }}
                        >
                            공개
                        </button>
                        <button
                            type="button"
                            className="visibility-btn"
                            onClick={() => { setVisibility(false) }}
                            style={{
                                backgroundColor: visibility === false ? 'black' : 'white',
                                color: visibility === false ? 'white' : 'black'
                            }}
                        >
                            비공개
                        </button>
                        </div>
                        <button
                        type="button"
                        className="create complete-btn"
                        onClick={createComplete}
                        >
                            생성 완료
                        </button>
                    </div>
                </div>
            </div>
            {addModalOpen && <ModalAddNovel setAddModalOpen={setAddModalOpen} />}
        </div >
    )
}

export default ModalCollectionMy;