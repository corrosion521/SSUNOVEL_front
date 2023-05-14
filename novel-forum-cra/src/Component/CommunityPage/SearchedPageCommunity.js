import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunitySearchBox from './CommunitySearchBox';
import { useLocation } from 'react-router-dom';

function SearchedPageCommunity() {

    //검색어 받아오기
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery()
    const searchTerm = query.get('data')



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // 한 페이지에 보여줄 아이템 개수

    // 전체 아이템 리스트 (500개의 아이템 생성)
    const itemList = Array.from({ length: 500 }, (_, index) => [
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
        navigate(`../community/writing?data=${item}`);
        console.log("!!");
    };

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

    function Pagination({ currentPage, totalPages, onPageChange, pageNumbers }) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'center' }}>
                <ul className="pagination">
                    {/* Display the previous button */}
                    {currentPage > 1 && (
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

                    {/* Display the 1st page button */}
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

                    {/* Render the page numbers */}
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

                    {/* Always display the 50th page button */}
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

                    {/* Display the next button */}
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
        <div style={{ position: 'relative' }}>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>커뮤니티</h1>
            <hr style={{ width: '100%' }}></hr>

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }}>
                <div style={{ marginRight: 'auto' }}>
                    {/* GNB1의 SearchBox랑은 다름. 다른 페이지이기에 버튼도 달리 지정. */}
                    <CommunitySearchBox></CommunitySearchBox>
                    <div >
                        <h3>'{searchTerm}'와 관련된 검색 결과입니다.</h3>
                    </div>
                </div>

                <div>
                    <button
                        style={{
                            border: 'none',
                            background: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        최신순
                    </button>
                    <button
                        style={{
                            border: 'none',
                            background: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        오래된순
                    </button>
                </div>
            </div>
            <button
                onClick={() => navigate('../community/write')}
                className="HomepageLogo"
                style={{
                    color: 'white',
                    width: '100px',
                    height: '40px',
                    marginTop: '20px',
                    position: 'absolute',
                    right: 0,
                }}
            >
                작성
            </button>

            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    height: '80px',
                    marginTop: '10%',
                    fontSize: '1rem',
                    textAlign: 'center',
                }}
            >
                <div style={{ margin: '0', width: '10%', margin: 'auto' }}>
                    번호
                </div>
                <hr style={{ marginLeft: 0 }}></hr>
                <div style={{ margin: '0', width: '50%', margin: 'auto' }}>
                    제목
                </div>
                <hr></hr>
                <div style={{ margin: '0', width: '15%', margin: 'auto' }}>
                    작성자
                </div>
                <hr></hr>
                <div style={{ margin: '0', width: '10%', margin: 'auto' }}>
                    작성일
                </div>
            </div>

            {itemList
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((item) => (
                    <Onewrt item={item} key={item[0]} />
                ))}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageNumbers={pageNumbers}
            />
        </div>
    );
}

export default SearchedPageCommunity;


