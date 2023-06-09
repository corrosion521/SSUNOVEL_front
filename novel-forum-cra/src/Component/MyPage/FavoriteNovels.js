import { useState } from "react";
import Novel from "../NovelPage/Novel";

const FavoriteNovels = ({ novels }) => {
    const itemList = novels;

    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // 한 페이지에 보여줄 아이템 개수


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
                                color: pageNumber === currentPage ? '#4e8cc9' : 'inherit',
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
            <div className="my-contents-list" >
                {itemList.length > 0 ? (
                    itemList
                        .map(
                            (novel) =>
                            (
                                <div style={{ fontSize: '0.9rem', width: '17%'}}>
                                    <Novel info={novel} key={novel} />
                                </div>
                            )
                        )
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                ) : (
                    <div style={{color:'#686868', marginLeft:0, }}>즐겨찾기한 작품이 없습니다.</div>
                )}

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', }}>
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
    );
}

export default FavoriteNovels;