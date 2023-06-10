import React, { useEffect, useState } from "react";
import Collection from "./Collection";
import CollectionSearchBox from "./CollectionSearchBox";
import { useLocation } from "react-router-dom";

import SearchedPageCollectionTotal from "./SearchedPageCollectionTotal";
import SearchedPageCollectionMember from "./SearchedPageCollectionMember";
import SearchedPageCollectionCollection from "./SearchedPageCollectionCollection";

function SearchedPageCollection() {


    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery()
    const searchTerm = query.get('data')

    const [collectionsTitle, setCollectionsTitle] = useState([]);
    const [collectionsMember, setCollectionsMember] = useState([]);

    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수
    const [resultCategoryNovel, setResultCategoryNovel] = useState([]);

    //전체 페이지 수 동적임
    const [totalPages, setTotalPages] = useState([10]);



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

    //검색후 선택 버튼
    const [selectedBtn, setSelectedBtn] = useState("전체");

    //카운트(개수 각 카테고리별)
    const [totalCnt, setTotalCnt] = useState(0);
    const [novelCnt, setNovelCnt] = useState(0);
    const [authorCnt, setAuthorCnt] = useState(0);

    //페이지네이션
    function Pagination({ currentPage, totalPages, onPageChange, pageNumbers }) {




        return (
            //nav태그 사용
            <nav style={{ display: 'flex', justifyContent: 'center' }}>
                <ul className="pagination">
                    {/* Display the previous button */}
                    {currentPage > 1 && (// 현재 페이지가 1보다 큰지를 확인하는 조건문입니다. 현재 페이지가 1보다 크다면, 즉 이전 페이지가 존재한다면 이전 버튼을 표시합니다.
                        <button
                            style={{
                                border: 'none',
                                background: 'none', fontSize: '1rem',
                                fontWeight: 'bold',
                            }}
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            이전
                        </button>
                    )}

                    {/* Display the 1st page button . 1page가 아닌경우 1page보여주기*/}
                    {currentPage !== 1 && (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                color: currentPage === 1 ? 'red' : 'inherit',
                            }}
                            key={1}
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </button>
                    )}

                    {/* Render the page numbers . */}
                    {pageNumbers.map((pageNumber) => (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                color: pageNumber === currentPage ? 'red' : 'inherit',
                            }}
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {/* Always display the 50th page button . 50page가 아닌경우 50page보여주기*/}
                    <button
                        style={{
                            border: 'none',
                            background: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: currentPage === 50 ? 'red' : 'inherit',
                        }}
                        key={totalPages}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {currentPage !== totalPages && totalPages}
                    </button>

                    {/* Display the next button . 다음버튼*/}
                    {currentPage < totalPages && (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                fontSize: '1rem',
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
    console.log("서치", searchTerm)





    return (
        <div className="search-result">
            <div className="search-result-title" style={{ margin: "1rem 0" }}>
                <strong className="search-text">
                    '{searchTerm}'
                </strong>
                에 대한 검색결과 입니다.
            </div>
            <div>
                <button
                    className={selectedBtn === "전체" ? "active-btn-style" : "deactive-btn-style"}
                    type="button"
                    onClick={() => setSelectedBtn("전체")}
                >
                    전체{'('}{totalCnt}{')'}
                </button>
                <button
                    className={selectedBtn === "작품" ? "active-btn-style" : "deactive-btn-style"}
                    type="button"
                    onClick={() => setSelectedBtn("작품")}
                >
                    작품명{'('}{novelCnt}{')'}
                </button>
                <button
                    className={selectedBtn === "작가" ? "active-btn-style" : "deactive-btn-style"}
                    type="button"
                    onClick={() => setSelectedBtn("작가")}
                >
                    작가명{'('}{authorCnt}{')'}
                </button>
            </div>
            <div className="line1"></div>
            <div className="search-result-contents">
                <div className="contents">
                    {selectedBtn === "전체" &&
                        <SearchedPageCollectionTotal setSelectedBtn={setSelectedBtn} setTotalCnt={setTotalCnt} setNovelCnt1={setNovelCnt} setAuthorCnt1={setAuthorCnt} />
                    }
                    {selectedBtn === "작품" &&
                        <SearchedPageCollectionCollection />
                    }
                    {selectedBtn === "작가" &&
                        <SearchedPageCollectionMember />
                    }
                </div>
            </div>

        </div>
    )
}
export default SearchedPageCollection;
