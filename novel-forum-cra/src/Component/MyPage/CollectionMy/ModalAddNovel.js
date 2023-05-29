// '작품 추가' 버튼 클릭시 열리는 모달

import CollectionMySearchBox from "./CollectionMySearchBox";
import Novel from "../../NovelPage/Novel";
import { useState } from "react";

const ModalAddNovel = ({ setAddModalOpen }) => {
    // *수정* novels에 선택한 작품들 계속 추가되도록 수정하기
    const [novels, setNovels] = useState([]);   // 작품 목록
    const [repNovel, setRepNovel] = useState(); // 대표 작품

    const closeModal = () => {
        setAddModalOpen(false);
    }

    const selectComplete = () => {
        closeModal();
        // 서버에 작품 목록, 대표 작품 데이터 보내기 
        console.log(novels, repNovel);
    }

    return (
        <div>
            <div className="modalframe" style={{ position: 'fixed' }}>
                <div className="modal-contents">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', }}>
                        <CollectionMySearchBox setNovels={setNovels} />
                        <button type="button" className="select complete-btn" onClick={selectComplete}>선택완료</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', }}>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3%', justifyContent: 'center', width: '700px', height: '470px', }} >
                            {novels
                                .map(
                                    (novel) =>
                                    (
                                        <div style={{ display: 'flex', marginTop: '5%' }}>
                                            <div style={{ fontSize: '0.5em', height: '200px', width: '120px' }}>
                                                <Novel info={novel} key={novel} />
                                            </div>
                                        </div>
                                    )
                                )
                                // .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}


export default ModalAddNovel;