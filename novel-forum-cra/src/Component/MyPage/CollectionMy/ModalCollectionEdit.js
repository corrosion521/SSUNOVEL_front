// '보관함수정' 버튼 클릭시 열리는 모달

import { useEffect, useState } from "react";
import ModalEditNovel from "./ModalEditNovel";

const ModalCollectionEdit = ({ setModalOpen, data, content }) => {
    // 현재 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
    }

    // 작품목록 수정 모달
    const [editNovelOpen, setEditNovelOpen] = useState(false);
    // 작품목록 수정 모달 열기
    const showModal = () => {
        setEditNovelOpen(true);
    }



    const [title, setTitle] = useState(data.title);
    const [explanation, setExplanation] = useState(content);
    const [isPrivate, setIsPrivate] = useState(data.isPrivate);
    const [novels, setNovels] = useState(null);   // 작품 목록
    let novelIDs = [];  // 작품 ID 목록
    const [repNovelID, setRepNovelID] = useState(null); // 대표 작품

    // 작품 목록 초기화
    const novelsInit = () => {
        const totalPages = Math.ceil(data.itemCnt / 10);
        let novelList = []; // let으로 하기!!!!! const로 하면 push() 안먹음
        for (let i = 0; i < totalPages; i++) {
            fetch(`/box/info/${data.boxId}?page=${i + 1}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result.result.boxItemInfo);
                    // setNovels([...novels, ...result.result.boxItemInfo]);
                    novelList.push(...result.result.boxItemInfo);
                });
        console.log("novelList : ", novelList);

        }
        console.log("novelList : ", novelList);
        // novelList.map(
        //     (novel) => {
        //         console.log("isLeadItem:", novel.isLeadItem);
        //         if(novel.isLeadItem == 1){
        //             // setRepNovelID(novel.novelId);
        //             console.log("대표작품 :" , novel.novelId);
        //         }
        //     }
        // );
        return novelList;
    }

    // 작품 ID 목록 초기화
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

    if(novels===null){
        setNovels(novelsInit());
    }

    return (
        <div className="modalbackground">
            <div className="modalframe">
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <img onClick={closeModal} src="/IconCancel.png" style={{ width: '25px', height: '25px', border: 'none', background: 'none', position: 'absolute', right: '0' }}></img>
                </div>
                {console.log("novels 초기화 확인 :", novels)}
                <div className="modal-contents">
                    <button type="button" className="edit-novel-btn" onClick={showModal}>작품목록 수정</button>
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
            {editNovelOpen && <ModalEditNovel data={data} setModalOpen={setEditNovelOpen} novels={novels} setNovels={setNovels} repNovelID={repNovelID} setRepNovelID={setRepNovelID} />}
        </div >
    )
}

export default ModalCollectionEdit;