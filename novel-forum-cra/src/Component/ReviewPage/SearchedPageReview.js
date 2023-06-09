import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewSearchBox from './ReviewSearchBox';
import Review from './Review';
import Novel from '../NovelPage/Novel';
import { useLocation } from 'react-router-dom';


function PageReview() {

    /*-------------------------------------------------------------------------------------------------------------------------------------
    * 유형 : 리뷰 페이지
    * 기능 :
     1. ....
     2. 리뷰 가져오기 
    *
    -------------------------------------------------------------------------------------------------------------------------------------*/

    const Novel1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "이말년시리즈", "이말년", "3.2", "222", "123", "네이버시리즈", "정통 무협 회귀 판타지!!"]

    const Novel2 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "이말년시리즈2", "이말년", "3.2", "222", "123", "네이버시리즈", "정통 무협 회귀 판타지!!"]

    const Novel3 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "이말년시리즈3", "이말년", "3.2", "222", "123", "네이버시리즈", "정통 무협 회귀 판타지!!"]

    const Novel4 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "이말년시리즈4", "이말년", "3.2", "222", "123", "네이버시리즈", "정통 무협 회귀 판타지!!"]


    const novels = [Novel1, Novel2, Novel3, Novel4];

    //리뷰작성자
    const review1 = ["김김김", "https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfNjIg/MDAxNjEyNDA4OTk5NDQ4.6UGs399-0EXjIUwwWsYg7o66lDb-MPOVQ-zNDy1Wnnkg.m-WZz0IKKnc5OO2mjY5dOD-0VsfpXg7WVGgds6fKwnIg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D2.jpg?type=w800", 234, "아주아주아주아중주아\n주아주 재밌었습니다."];
    const review2 = ["김김2", "https://ts2.mm.bing.net/th?q=%EC%9B%83%EA%B8%B4+%EA%B3%A0%EC%96%91%EC%9D%B4+%EC%A7%A4%EB%AA%A8%EC%9D%8C", 234, "아주아주아주아중주아\n주아주 재밌었습니다."];
    const review3 = ["김김3", "https://blog.kakaocdn.net/dn/dKZ1M0/btrI6qogsWx/lMyrgPOHXuYgvqPzfByTpk/img.jpg", 234, "아주아주아주아중주아\n주아주 재밌었습니다."];
    const review4 = ["김김4", "https://mblogthumb-phinf.pstatic.net/MjAyMjA3MzFfNzIg/MDAxNjU5MjAyMjM4ODc4.eqpoMuq1tT37LwAlUxwWyKCbb__AB0D1GGEbs1kbO_kg.JqH8yprgOAhqRtXQmUf6rUiaKoDRWkpISvBfurQWObYg.JPEG.grw04035/IMG_8516.JPG?type=w800", 234, "아주아주아주아중주아\n주아주 재밌었습니다."];

    const reviews = [review1, review2, review3, review4];


    // 전체 아이템 리스트 (500개의 아이템 생성)
    const itemList = Array.from({ length: 3 }, (_, index) => [novels, reviews]);




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


    //장르
    // const onClickSelectedGr = (event) => {
    //     const targetButton = event.target;
    //     const currentColor = targetButton.style.color;

    //     if (currentColor === "black" || currentColor === "") {
    //         targetButton.style.color = "green";
    //         setSelectedGenreVal((prevGenreVal) => [...prevGenreVal, targetButton.value]);

    //     } else {
    //         targetButton.style.color = "black";
    //         setSelectedGenreVal((prevGenreVal) =>
    //             prevGenreVal.filter((val) => val !== targetButton.value)
    //         );

    //     }
    // };

    // const [selectedGenreVal, setSelectedGenreVal] = useState([]);




    //장르 하나 정하기 
    const [selectedGenre, setSelectedGenre] = useState('로맨스');

    const onClickSelectedGr = (genre) => {
        if (selectedGenre == genre)
            setSelectedGenre("");
        else {
            setSelectedGenre(genre);
        }

    };

    //검색어 받아오기
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery()
    const searchTerm = query.get('data')

    //useEffect(() => console.log(selectedGenre), [selectedGenre]);

    //2. 카테고리 따른 리뷰 
    const [resultCategoryReview, setResultCategoryReview] = useState(["."]);
    const [flag, setFlag] = useState(false);//리뷰 아무 것도 없는 것 생각
    useEffect(() => {
        console.log(searchTerm)
        fetch(`/novel/review?title=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("/search에 대한 결과", result.result)
                // //useState이용하여 
                if (result.message == "성공") {
                    setFlag(true);

                    setResultCategoryReview(result.result);
                }
                else {
                    setFlag(false)
                }
                // // 전체 페이지 수 계산
                setTotalPages(Math.ceil(result.result.length / itemsPerPage));

            });

    }, [searchTerm]);

    return (

        <div style={{ position: 'relative' }}>

            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>리뷰</h1>
            <hr style={{ width: '100%' }}></hr>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }}>
                <div style={{ marginRight: 'auto' }}>
                    {/* GNB1의 SearchBox랑은 다름. 다른 페이지이기에 버튼도 달리 지정. */}
                    <ReviewSearchBox />
                    <div style={{ marginTop: '5%' }}>
                        <strong style={{ fontSize: '0.9rem' }}>'{searchTerm}'</strong><strong style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>와 관련된 검색 결과입니다.</strong>
                    </div>
                </div>

            </div>

            <div style={{ display: 'flex', marginTop: '10%', gap: '4%', justifyContent: 'flex-start' }}>

                <div style={{ width: '70%', display: 'flex', flexDirection: 'column', margin: 'auto', justifyContent: 'center' }}>
                    {flag == true ? (
                        resultCategoryReview
                            // .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((item, index) => (
                                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', border: '1px solid #686868', padding: '3%', borderRadius: '5px' }}>
                                    <div style={{ fontSize: '0.8em', width: '150px' }}>
                                        <Novel info={item}></Novel>
                                    </div>
                                    <div style={{ height: '170px', width: '80%', marginLeft: '20px' }}>
                                        <Review review={item} lflag={0}></Review>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div>리뷰가 없습니다.</div>
                    )}
                </div>





            </div>





            {totalPages <= 1 ? null : <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageNumbers={pageNumbers}
            />
            }
        </div >
    );
}

export default PageReview;


