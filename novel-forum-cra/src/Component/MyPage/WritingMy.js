// 마이페이지_작성글
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageNav from './MyPageNav';
import './MyPageStyle.css';

const WritingMy = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수

    // 전체 아이템 리스트 (15개의 아이템 생성)
    const itemList = Array.from({ length: 15 }, (_, index) => [
        index + 1,
        "소설 제목좀 찾아주세요!!",
        "정지오",
        "04-09 12:11",
        "어렸을 때 읽었던 소설인데 마법사랑 전사랑 궁수랑 도적이랑 나오는 소설좀 찾아주세요"
    ]);

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

    const gotowrt = (item) => {
        navigate(`./writing?data=${item}`);
        console.log("!!");
    };

    //글 하나의 컴포넌트
    const Onewrt = ({ item }) => {
        return (
            <div
                style={{
                    borderBottom: '2px dotted gray',
                    backgroundColor: 'white',
                    display: 'flex',
                    width: '100%',
                    height: '80px',
                    fontSize: '1rem',
                    textAlign: 'center'
                }}
            >
                <div style={{ margin: '0', width: '10%', margin: 'auto' }}>
                    {item[0]}
                </div>

                <div
                    style={{ margin: '0', width: '50%', margin: 'auto', textAlign: 'left' }}
                    onClick={() => gotowrt(item)}
                >
                    {item[1]}
                </div>

                <div style={{ margin: '0', width: '15%', margin: 'auto' }}>
                    {item[2]}
                </div>

                <div style={{ margin: '0', width: '10%', margin: 'auto' }}>
                    {item[3]}
                </div>
            </div>
        );
    };

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
                        key={50}
                        onClick={() => onPageChange(50)}
                    >
                        50
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

    return (
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-writing container">
                <div className="container__title">작성글 {'('}{ }{')'}</div>
                <div className='container__line'></div>
            </div>
        </div>
    );
}

export default WritingMy;