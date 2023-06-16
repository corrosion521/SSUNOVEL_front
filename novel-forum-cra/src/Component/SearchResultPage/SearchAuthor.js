import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Novel from "../NovelPage/Novel";

const SearchAuthor = () => {
    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수 (dto의 length가 10임)




    // 페이지 변경 이벤트 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    //전체 페이지 수 동적임
    const [totalPages, setTotalPages] = useState([10]);

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

    const navigate = useNavigate();


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

                    {/* Display the 1st page button . 전체 페이지가 10페이지 이상이고 현재 1page가 아닌경우 1page보여주기*/}
                    {currentPage !== 1 && totalPages >= 10 && (
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

                    {/* 전체페이지가 10페이지 이상이면 마지막페이지 보여주기 */}
                    {totalPages >= 10 && (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                color: currentPage === totalPages ? 'red' : 'inherit',
                            }}
                            key={totalPages}
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    )}

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


    // 작가명 검색결과 가져오기
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get('data');

    const [orderBy, setOrderBy] = useState("download_cnt");

    const [authors, setAuthors] = useState([]);
    const [authorCnt, setAuthorCnt] = useState(0);
    const [authorFlag, setAuthorFlag] = useState(false); //작가 아무 것도 없는 것 생각

    useEffect(() => {

        fetch(`/novel/search/author?search=${searchTerm}&pageNum=${currentPage - 1}&orderBy=${orderBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                // UseState이용하여 작품, 작가 배열 초기화
                if (result.message === "성공") {
                    if (result.result.count > 0) {
                        setAuthorFlag(true);
                        setAuthors(result.result["dto"]);
                    }
                }
                else {
                    setAuthorFlag(false);
                }
                // 전체 페이지 수 계산
                setTotalPages(Math.ceil(result.result.count / itemsPerPage))
            });
    }, [searchTerm, currentPage]);

    return (
        <div className="contents-frame">
            <div
                className="contents-list"
                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: '3%', rowGap: '30px', justifyContent: 'flex-start', marginLeft: '3%', }}
            >
                {authorFlag == true ? (
                    authors
                        .map((item) => (
                            <div style={{ width: '17%', height: '300px', fontSize: '0.8rem', }}>
                                <Novel info={item} key={item}></Novel>
                            </div>
                        ))
                )
                    : (
                        <div className="noresult">작가 검색 결과가 없습니다.</div>
                    )}
            </div>
            <div style={{ margin: '30px', }}></div>
            {totalPages > 1 &&
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    pageNumbers={pageNumbers}
                />
            }
        </div>
    )
}

export default SearchAuthor;