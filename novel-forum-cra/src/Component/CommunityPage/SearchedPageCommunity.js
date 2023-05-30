import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunitySearchBox from './CommunitySearchBox';
import { useLocation } from 'react-router-dom';

function SearchedPageCommunity() {

    /**
     유형 : 검색된 페이지
     기능 : 
     1. ..
     2.[api연동] 가져온 data이용해서 해당 페이지들 보여줌.
       - 정렬함(postId큰 것(최신)부터)
     */


    //검색어 받아오기
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery()
    const searchTerm = query.get('data')


    function nowToday() {
        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1);  // 월
        let date = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());  // 날짜

        let hours = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
        let minutes = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
        let seconds = (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds());
        // console.log(year + '' + month + '' + date + '' + hours + '' + minutes + '' + seconds);
        return month + '/' + date + '\n' + hours + ':' + minutes;

    }
    let now = nowToday()
    console.log(now)



    const navigate = useNavigate();

    const gotowrt = (item) => {
        console.log("실제로는", now);
        //navigate(`./writing?data=${item.postId}&data2=${now}`);

        const data = item.postId;
        const data2 = encodeURIComponent(now);
        const url = `../community/writing?data=${data}&data2=${data2}`;

        navigate(url);
    };


    //글 하나의 컴포넌트
    const Onewrt = ({ item }) => {

        console.log(nowToday())

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
                    {item.postId}
                </div>

                <div
                    style={{ margin: '0', width: '50%', margin: 'auto', textAlign: 'left' }}
                    onClick={() => gotowrt(item)}
                >
                    {item.title}
                </div>

                <div style={{ margin: '0', width: '15%', margin: 'auto' }}>
                    {item.nickName}
                </div>

                <div style={{ margin: '0', width: '10%', margin: 'auto' }}>
                    {now}
                </div>
            </div>
        );
    };



    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수
    const [resultCategoryNovel, setResultCategoryNovel] = useState([]);

    //전체 페이지 수 동적임
    const [totalPages, setTotalPages] = useState([10]);


    // 전체 아이템 리스트 (500개의 아이템 생성)
    const itemList = Array.from({ length: 500 }, (_, index) => [
        index + 1,
        "소설 제목좀 찾아주세요!!",
        "정지오",
        "04-09 12:11",
        "어렸을 때 읽었던 소설인데 마법사랑 전사랑 궁수랑 도적이랑 나오는 소설좀 찾아주세요"
    ]);



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

    //2.
    const [writings, setWritings] = useState([])
    useEffect(() => {

        //쿼리 
        fetch(`./search?keyword=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                //정렬
                result.result.sort((a, b) => b.postId - a.postId);
                console.log("결과:", result)
                setWritings(result.result)
                // 전체 페이지 수 계산
                setTotalPages(Math.ceil(result.result.length / itemsPerPage));
            });
    }, []);



    return (
        <div style={{ position: 'relative' }}>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>커뮤니티</h1>
            <hr style={{ width: '100%' }}></hr>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }}>
                <div style={{ marginRight: 'auto' }}>
                    {/* GNB1의 SearchBox랑은 다름. 다른 페이지이기에 버튼도 달리 지정. */}
                    <CommunitySearchBox />
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
                onClick={() => navigate('../write')}
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

            {writings
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                .map((item) => (
                    <Onewrt item={item} key={item} />
                ))}


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    pageNumbers={pageNumbers}
                />
            </div>



        </div>
    );
}

export default SearchedPageCommunity;


