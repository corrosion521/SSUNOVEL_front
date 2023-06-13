// '작품 추가' 버튼 클릭시 열리는 모달

import CollectionMySearchBox from "./CollectionMySearchBox";
import Novel from "../../NovelPage/Novel";
import React, { useState } from "react";

const ModalAddNovel = ({ setAddModalOpen, novelIDs, setNovelIDs, setRepNovelIDs }) => {
    // *수정* novels에 선택한 작품들 계속 추가되도록 수정하기
    const [novels, setNovels] = useState([]);   // 작품 목록
    const [repNovel, setRepNovel] = useState(); // 대표 작품

    const closeModal = () => {
        setAddModalOpen(false);
    }

    const handleChange = (e) => {
        console.log(`*****handleChange*****`);
        console.log(`선택한 값 : ${e.target.value}`);

        setRepNovel(e.target.value);
    };


    const selectComplete = () => {
        novels.map(
            (novel) => {
                setNovelIDs([...novelIDs, novel[6]]);
                console.log(novelIDs);
            }
        )
        closeModal();
    }

    const itemList = novels;

    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수


    // 전체 페이지 수 계산
    const totalPages = Math.ceil(itemList.length / itemsPerPage);

    // 페이지 변경 이벤트 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이지 번호 배열 생성
    //최대 페이지넘버 10개 보이게 동적 조정중. (보이는 페이지 번호에 대한 리스트)
    const pageNumbers = [];
    if (totalPages <= 10) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        const maxPage = Math.min(currentPage + 9, totalPages);
        for (let i = currentPage; i <= maxPage; i++) {
            pageNumbers.push(i);
        }
    }



    //페이지네이션
    function Pagination({ currentPage, totalPages, onPageChange, pageNumbers }) {
        return (
            //nav태그 사용
            <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30px', }}>
                <ul className="pagination">
                    {/* Display the previous button */}
                    {currentPage > 1 && (// 현재 페이지가 1보다 큰지를 확인하는 조건문입니다. 현재 페이지가 1보다 크다면, 즉 이전 페이지가 존재한다면 이전 버튼을 표시합니다.
                        <button
                            style={{
                                border: 'none',
                                background: 'none', fontSize: '0.8rem',
                                fontWeight: 'bold',
                            }}
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            이전
                        </button>
                    )}

                    {/* Render the page numbers . */}
                    {pageNumbers.map((pageNumber) => (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                color: pageNumber === currentPage ? 'red' : 'inherit',
                            }}
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {/* Display the next button . 다음버튼*/}
                    {currentPage < totalPages && (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                            }}
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            다음
                        </button>
                    )}
                </ul>
            </nav>
        );
    }

    return (
        <div>
            <div className="modalframe" style={{ position: 'fixed' }}>
                <div className="modal-contents">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', }}>
                        <CollectionMySearchBox novels={novels} setNovels={setNovels} />
                        <button type="button" className="select complete-btn" onClick={selectComplete}>선택완료</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '3%', gap: '3%', justifyContent: 'flex-start', width: '700px', height: '470px', }} >
                            {novels.map((value, i) => (
                                value.length > 0 &&
                                <div style={{ display: 'flex', marginTop: '5%' }}>
                                    <div style={{ fontSize: '0.5em', height: '200px', width: '120px' }}>
                                        <React.Fragment key={i}>
                                            <label>
                                                <input
                                                    id={value}
                                                    value={value}
                                                    name="platform"
                                                    type="radio"
                                                    checked={repNovel === value[6]} // 대표작품 선택
                                                    onChange={handleChange} />
                                                <Novel info={value} key={value} />
                                            </label>
                                        </React.Fragment>
                                    </div>
                                </div>
                            ))
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                            }
                        </div>
                    </div>
                    {
                        itemList.length > itemsPerPage &&
                        <div style={{ display: 'flex', justifyContent: 'center', }}>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                pageNumbers={pageNumbers}
                            />
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}


export default ModalAddNovel;