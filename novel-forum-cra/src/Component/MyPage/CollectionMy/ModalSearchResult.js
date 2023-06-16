// 검색 결과 모달

import Novel from "../../NovelPage/Novel";
import React, { useState } from "react";
import ModalSearchNovelMy from "./ModalSearchNovelMy";
import ModalSearchAuthorMy from "./ModalSearchAuthorMy";

const ModalSearchResult = ({ setSearchModalOpen, searchTerm, novels, setNovels }) => {
    const [selectedBtn, setSelectedBtn] = useState("작품");
    const [checkedIds, setCheckedIds] = useState([]);
    const [checkedNovels, setCheckedNovels] = useState([]);

    const closeModal = () => {
        setSearchModalOpen(false);
    }

    const selectComplete = () => {
        if (checkedNovels.length > 0) {
            setNovels([...novels, ...checkedNovels]);
        }
        console.log("checkedNovels: ", checkedNovels);
        closeModal();
    }

    return (
        <div className="modalframe" style={{ position: 'fixed' }}>
            <div className="modal-contents" style={{ gap: '0', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', }}>
                    <div><strong className="search-text">
                        '{searchTerm}'
                    </strong>
                        에 대한 검색결과 입니다.</div>
                    <button type="button" className="select complete-btn" onClick={selectComplete}>선택완료</button>
                </div>
                <div>
                    <button
                        className={selectedBtn === "작품" ? "active-btn-style" : "deactive-btn-style"}
                        type="button"
                        onClick={() => setSelectedBtn("작품")}
                    >
                        작품명
                    </button>
                    <button
                        className={selectedBtn === "작가" ? "active-btn-style" : "deactive-btn-style"}
                        type="button"
                        onClick={() => setSelectedBtn("작가")}
                    >
                        작가명
                    </button>
                </div>
                <div className="line1"></div>
                {selectedBtn === "작품" &&
                    <ModalSearchNovelMy searchTerm={searchTerm} checkedIds={checkedIds} setCheckedIds={setCheckedIds} checkedNovels={checkedNovels} setCheckedNovels={setCheckedNovels} />
                }
                {selectedBtn === "작가" &&
                    <ModalSearchAuthorMy searchTerm={searchTerm} checkedIds={checkedIds} setCheckedIds={setCheckedIds} checkedNovels={checkedNovels} setCheckedNovels={setCheckedNovels} />
                }
            </div>
        </div>
    );
}
export default ModalSearchResult;