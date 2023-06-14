// '보관함수정' 버튼 클릭시 열리는 모달

import { useEffect, useState } from "react";
import ModalAddNovel from "./ModalAddNovel";

const ModalCollectionEdit = ({ setModalOpen, data }) => {
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

    const [title, setTitle] = useState(data.title);
    const [explanation, setExplanation] = useState(data.content);
    const [isPrivate, setIsPrivate] = useState(1);
    const [novels, setNovels] = useState([]);   // 작품 목록
    let novelIDs = [];  // 작품 ID 목록
    const [repNovelID, setRepNovelID] = useState(); // 대표 작품

    const setID = () => {
        novelIDs = novels.map(
            (novel) => 
                novel.novelId            
        );
    }

    // 수정완료버튼 누르면 --> 서버에 데이터 보내기
    const editComplete = () => {
        setID();    // 작품 ID 목록 초기화
        console.log(title, explanation, isPrivate, novelIDs, repNovelID);
        fetch(`/box`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: explanation,
                is_private: isPrivate,
                boxItems: novelIDs,
                leadItemId: repNovelID,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("ModalCollectionMy:", result)
                if (result.message === "성공") {
                    closeModal();
                }
                else {
                    alert(result.message);
                }
            });
    }



    return (
        <div className="modalbackground">
            <div className="modalframe">
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <img onClick={closeModal} src="/IconCancel.png" style={{ width: '25px', height: '25px', border: 'none', background: 'none', position: 'absolute', right: '0' }}></img>
                </div>
                {console.log(novels)}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '10px', }}>
                            <button
                                type="button"
                                className="visibility-btn"
                                onClick={() => { setIsPrivate(0) }}
                                style={{
                                    backgroundColor: isPrivate === 0 ? 'black' : 'white',
                                    color: isPrivate === 0 ? 'white' : 'black'
                                }}
                            >
                                공개
                            </button>
                            <button
                                type="button"
                                className="visibility-btn"
                                onClick={() => { setIsPrivate(1) }}
                                style={{
                                    backgroundColor: isPrivate === 1 ? 'black' : 'white',
                                    color: isPrivate === 1 ? 'white' : 'black'
                                }}
                            >
                                비공개
                            </button>
                        </div>
                        <button
                            type="button"
                            className="create complete-btn"
                            onClick={editComplete}
                        >
                            수정 완료
                        </button>
                    </div>
                </div>
            </div>
            {addModalOpen && <ModalAddNovel setAddModalOpen={setAddModalOpen} novels={novels} setNovels={setNovels} setRepNovelID={setRepNovelID} />}
        </div >
    )
}

export default ModalCollectionEdit;