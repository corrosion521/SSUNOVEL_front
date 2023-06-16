import React, { useState } from "react";
import Collection from "./Collection";
import CollectionSearchBox from "./CollectionSearchBox";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies"
import { useEffect } from "react";

function PageCollection() {


    const Collection1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "판타지모음", "김김김", 422, 4];
    const Collection2 =
        ["https://imagescdn.gettyimagesbank.com/500/201908/jv11892682.jpg", "따뜻한 소", "정정", 420, 7];

    const Collection3 =
        ["https://imagescdn.gettyimagesbank.com/500/201908/jv11892682.jpg", "따뜻한", "정", 419, 9];

    const Collection4 =
        ["https://imagescdn.gettyimagesbank.com/500/201908/jv11892682.jpg", " 소설", "정1정", 427, 11];
    const Collection6 =
        ["https://imagescdn.gettyimagesbank.com/500/201908/jv11892682.jpg", "따소설", "정2정정", 422, 2];
    const Collection7 =
        ["https://imagescdn.gettyimagesbank.com/500/201908/jv11892682.jpg", "뜻한 소설", "정3정정", 424, 3];
    const itemList = [Collection1, Collection2, Collection3, Collection4, Collection6, Collection7,

        Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2,
        Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2,
        Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2,
        Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection2, Collection1, Collection1, Collection1,
        Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1,
        Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1,
        Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1,
        Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1,
        Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1,
        Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1,
        Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1,
        Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1, Collection1]



    //게시글 정렬 state
    const [order, setOrder] = useState('TIME_DESC');

    const onClickLatest = () => {
        setOrder("TIME_DESC")
    }

    const onClickOutdate = () => {
        console.log("..")
        setOrder("TIME_ASC")
    }
    const onClickLike = () => {
        setOrder("LIKE_DESC")
    }



    const [collections, setCollections] = useState([]);
    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수
    const [resultCategoryNovel, setResultCategoryNovel] = useState([]);

    //전체 페이지 수 동적임
    const [totalPages, setTotalPages] = useState([]);




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
                            처음
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
                            color: currentPage === totalPages ? 'red' : 'inherit',
                        }}
                        key={totalPages}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {currentPage === totalPages ? null : "마지막"}
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



    useEffect(() => {

        fetch(`/box/all?page=${currentPage}&filtering=${order}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result.result)
                // //useState이용하여 
                setCollections(result.result);
                // // 전체 페이지 수 계산
                setTotalPages(Math.ceil(result.result.length / itemsPerPage));
            });
    }, [order]);



    return (
        <div>

            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>보관함</h1>
            <hr style={{ width: '100%' }}></hr>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }} >
                <div style={{ marginRight: 'auto' }}>
                    {/*GNB1의 SearchBox랑은 다름. 다른 페이지이기에 버튼도 달리 지정.*/}
                    <CollectionSearchBox></CollectionSearchBox>
                </div>
                <div >
                    <button onClick={onClickLatest} style={{ fontSize: order === 'TIME_DESC' ? '1rem' : '0.9rem', border: 'none', background: 'none', fontWeight: order === 'TIME_DESC' ? 'bold' : 'normal' }}>최신순</button>
                    <button onClick={onClickOutdate} style={{ fontSize: order === 'TIME_ASC' ? '1rem' : '0.9rem', border: 'none', background: 'none', fontWeight: order === 'TIME_ASC' ? 'bold' : 'normal' }}>오래된순</button>
                    <button onClick={onClickLike} style={{ fontSize: order === 'LIKE_DESC' ? '1rem' : '0.9rem', border: 'none', background: 'none', fontWeight: order === 'LIKE_DESC' ? 'bold' : 'normal' }}>공감순</button>
                </div>
            </div>
            <div style={{ marginTop: '3%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '100px', justifyContent: 'center' }}>
                    {
                        collections
                            .map(
                                (collections) =>
                                (
                                    <div style={{ width: '180px', height: '350px' }}>
                                        <Collection data={collections} key={collections} />
                                    </div>

                                )
                            )
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                    }
                </div>
            </div>

            <div style={{ marginTop: '10%' }}>
                {
                    totalPages <= 1 ? null : <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        pageNumbers={pageNumbers}
                    />
                }
            </div>
        </div>
    )
}
export default PageCollection;