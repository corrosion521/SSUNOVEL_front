// 마이페이지_작성글
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageNav from './MyPageNav';

const WritingMy = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수

    // 전체 작성글 리스트
    // const itemList = Array.from({ length: 15 }, (_, index) => [
    //     index + 1,
    //     "소설 제목좀 찾아주세요!!",
    //     "정지오",
    //     "04-09 12:11",
    //     "어렸을 때 읽었던 소설인데 마법사랑 전사랑 궁수랑 도적이랑 나오는 소설좀 찾아주세요"
    // ]);
    const [itemList, setItemList] = useState([]);
    const [flag, setFlag] = useState(false);    //작성글 아무 것도 없는 것 생각
    useEffect(() => {
        fetch(`/member/mypage/post`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result.result);
                console.log("결과:", result);
                // if(result.message === "로그인 필요"){
                //     navigate("/member/login")
                // }
                if (result.message == "성공") {
                    if (result.result.memberPostCnt > 0) {
                        setFlag(true);
                        setItemList(result.result.memberPostList);
                        console.log("result.result:", result.result);
                        // console.log("result.result.memberReviewInfoList:", result.result.memberReviewInfoList);
                    }
                    else {
                        setFlag(flag);
                    }
                }
                else {
                    setFlag(false)
                }
            });
    }, []);

   
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

    const navigate = useNavigate();

    const gotowrt = (item) => {
        const data = item.postId;
        const data2 = encodeURIComponent(now);
        const url = `/community/writing?data=${data}&data2=${data2}`;

        navigate(url);
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
                    height: '70px',
                    fontSize: '0.8rem',
                    textAlign: 'center'
                }}
            >
                <div style={{ margin: '0', width: '10%', margin: 'auto' }}>
                    {item.postId}
                </div>

                <div
                    style={{ margin: '0', width: '50%', margin: 'auto', textAlign: 'left', cursor:'pointer' }}
                    onClick={() => gotowrt(item)}
                >
                    {item.title}
                </div>

                <div style={{ margin: '0', width: '15%', margin: 'auto' }}>
                    {item.nickName}
                </div>

                <div style={{ margin: '0', width: '10%', margin: 'auto' }}>
                    {item.writeAt.replace('T', '\n')}
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
                                background: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 'normal',
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

    return (
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-writing my-container">
                <div className="my-container__title">작성글 {'('}{itemList.length}{')'}</div>
                <div className='my-container__line'></div>
                {itemList
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                    .map((item) => (
                        <Onewrt item={item} key={item[0]} />
                    ))}
                {
                    totalPages>1 &&
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

export default WritingMy;