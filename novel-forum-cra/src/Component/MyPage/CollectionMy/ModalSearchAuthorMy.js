// 검색 결과 모달 - 작가명

import Novel from "../../NovelPage/Novel";
import React, { useState, useEffect } from "react";

const ModalSearchAuthorMy = ({ searchTerm, checkedIds, setCheckedIds, checkedNovels, setCheckedNovels }) => {

    //--------------Checkbox-----------------
    // 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
    const onCheckedElement = (checked, id, item) => {
        if (checked) {
            setCheckedIds([...checkedIds, id]);
            setCheckedNovels([...checkedNovels, item]);
        } else if (!checked) {
            setCheckedIds(checkedIds.filter(el => el !== id));
            setCheckedNovels(checkedNovels.filter(el => el !== item));
        }
    };
    // 2️⃣ x를 누르면 리스팅 목록에서 카테고리가 삭제되며 체크도 해제 된다
    const onRemove = item => {
        setCheckedNovels(checkedNovels.filter(el => el !== item));
    };


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
                                background: 'none', fontSize: '0.8rem',
                                fontWeight: 'normal',
                            }}
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            이전
                        </button>
                    )}

                    {/* Display the 1st page button . 전체 페이지가 10페이지 이상이고 현재 1page가 아닌경우 1page보여주기*/}
                    {currentPage !== 1 && totalPages>=10 && (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                color: currentPage === 1 ? '#4e8cc9' : 'inherit',
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

                    {/* 전체페이지가 10페이지 이상이면 마지막페이지 보여주기 */}
                    {totalPages >= 10 && (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                color: currentPage === totalPages ? '#4e8cc9' : 'inherit',
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
                                fontSize: '0.8rem',
                                fontWeight: 'normal',
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

    // api로 가져온 데이터 내에서 검색 기능 구현


    const [itemList, setItemList] = useState([]);
    const [orderBy, setOrderBy] = useState("download_cnt");
    const [novelFlag, setNovelFlag] = useState(false); //작품 아무 것도 없는 것 생각

    // 소설 정보 가져오기
    useEffect(() => {

        fetch(`/novel/search/author?search=${searchTerm}&pageNum=${currentPage - 1}&orderBy=${orderBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                // console.log(result.result["count"]);
                // console.log("작품명 검색에 대한 결과", result.result["dto"])

                // UseState이용하여 작품, 작가 배열 초기화
                if (result.message === "성공") {
                    if (result.result.count > 0) {
                        setNovelFlag(true);
                        setItemList(result.result.dto);
                    }
                }
                else {
                    setNovelFlag(false);
                }
                // 전체 페이지 수 계산
                setTotalPages(Math.ceil(result.result.count / itemsPerPage))
            });
    }, [currentPage]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '3%', marginLeft: '3%', justifyContent: 'flex-start', width: '700px', height: '470px', }}
                >
                    {novelFlag == true ? (
                    itemList.map((item) => {
                        return (
                            <div style={{ display: 'flex', }}>
                                <div style={{ fontSize: '0.5em', height: '200px', width: '120px' }}>
                                    {/* 소설 하나씩 value로 보내줌 */}
                                    <input
                                        type="checkbox"
                                        // 이때 value값으로 data를 지정해준다.
                                        value={item}
                                        // onChange이벤트가 발생하면 check여부와 value(data)값을 전달하여 배열에 data를 넣어준다.
                                        onChange={e => {
                                            onCheckedElement(e.target.checked, item.novelId, item);
                                            // onCheckedElement(e.target.checked, e.target.value);
                                        }}
                                        // 3️⃣ 체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
                                        checked={checkedIds.includes(item.novelId) ? true : false}
                                        style={{marginLeft:'8px', }}
                                    />
                                    <Novel info={item} key={item} />
                                </div>
                            </div>
                        );
                    })
                    ) : (
                        <div className="noresult">작품 검색 결과가 없습니다.</div>
                    )
                    }
                </div>
            </div>
            {
                totalPages > 1 &&
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
    );
}
export default ModalSearchAuthorMy;