// 검색 결과 모달

import Novel from "../../NovelPage/Novel";
import React, { Children, useState } from "react";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";

const ModalSearchResult = ({ setSearchModalOpen, searchTerm, setNovels }) => {

    // api로 가져온 데이터 내에서 검색 기능 구현
    const Novel1 = [
        "https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2",
        "이말년시리즈",
        "이말년",
        "3.2",
        "222",
        "123",
        "네이버시리즈",
        "정통 무협 회귀 판타지!!",
    ];
    const Novel2 = [
        "https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2",
        "이말년시리즈2",
        "이말년",
        "3.2",
        "222",
        "123",
        "네이버시리즈",
        "정통 무협 회귀 판타지!!",
    ];
    const itemList = [Novel1, Novel2, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];
    // const itemList = [Novel1, Novel1, Novel1];

    const closeModal = () => {
        setSearchModalOpen(false);
    }

    // Checkbox
    const [selectNovels, setSelectNovels] = useState([]);



    const selectComplete = () => {        
        setNovels(selectNovels);
        // console.log(novels);
        console.log(selectNovels);
        closeModal();
        // console.log(novels);

    }


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
        <div className="modalframe" style={{ position: 'fixed' }}>
            <div className="modal-contents">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', }}>
                    <div><strong className="search-text">
                        '{searchTerm}'
                    </strong>
                        에 대한 검색결과 입니다.</div>
                    <button type="button" className="select complete-btn" onClick={selectComplete}>선택완료</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <CheckboxGroup
                        values={selectNovels}
                        onChange={setSelectNovels}>
                        <div
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '3%', justifyContent: 'center', width: '700px', height: '470px', }}
                        >
                            {itemList
                                .map(
                                    (novel) =>
                                    (
                                        <div style={{ display: 'flex', marginTop: '5%' }}>
                                            <div style={{ fontSize: '0.5em', height: '200px', width: '120px' }}>
                                                {/* 소설 하나씩 value로 보내줌 */}
                                                <Checkbox value={[novel]}>
                                                    <Novel info={novel} key={novel} />
                                                </Checkbox>
                                            </div>
                                        </div>
                                    )
                                )
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                            }
                        </div>
                    </CheckboxGroup>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        pageNumbers={pageNumbers}
                    />
                </div>
            </div>
        </div>
    );
}
export default ModalSearchResult;