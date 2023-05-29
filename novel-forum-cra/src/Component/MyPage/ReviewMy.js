// 마이페이지_작성리뷰

import MyPageNav from "./MyPageNav";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Review from "../ReviewPage/Review";
import Novel from '../NovelPage/Novel';

const ReviewMy = () => {
    const Novel1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "이말년시리즈", "이말년", "3.2", "222", "123", "네이버시리즈", "정통 무협 회귀 판타지!!"]

    //리뷰작성자
    const review1 = ["김김김", "4.3", "234", "아주아주아주아중주아주아주 재밌었습니다."];


    // 전체 아이템 리스트 (10개의 아이템 생성)
    const itemList = Array.from({ length: 10 }, (_, index) => [Novel1, review1]);

    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 개수


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

    return (
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-review my-container">
                <div className="my-container__title">작성리뷰 {'('}{itemList.length}{')'}</div>
                <div className='my-container__line'></div>
                {itemList
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                    .map((item) => (
                        <div style={{ display: 'flex', marginTop: '5%' }}>
                            <div style={{ fontSize: '0.5em', height: '230px', width: '150px' }}>
                                <Novel info={item[0]}></Novel>
                            </div>
                            <div style={{ height: '170px', width: '500px', marginLeft: '20px' }}>
                                <Review review={item[1]}></Review>
                            </div>

                        </div>
                    ))
                }
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
    )
}

export default ReviewMy;