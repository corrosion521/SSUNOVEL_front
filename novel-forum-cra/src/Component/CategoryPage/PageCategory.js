import React from "react";
import Novel from "../NovelPage/Novel";
import CommunitySearchBox from "../CommunityPage/CommunitySearchBox"
import { useState } from "react";
import { useEffect } from "react";
import CategorySearchBox from "./CategorySearchBox";
import { useLocation } from "react-router-dom";

/**----------------------------------------------------------------------------------------------------------------------------------------------------------------
 유형 : 카테고리 페이지
 설계 : 
 1. ....
 2. api 연동 [카테고리]
 

----------------------------------------------------------------------------------------------------------------------------------------------------------------
 */


function PageCategory() {
    const Novel1 = [
        "https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2",
        "이말년시리즈",
        "이말년",
        "3.2",
        "222",
        "123",
        "네이버시리즈",
        "정통 무협 회귀 판타지!!",
    ];

    //검색어 받아오기
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery()
    const searchTerm = query.get('data')


    // 전체 아이템 리스트 (500개의 아이템 생성)
    const itemList = Array.from({ length: 500 }, (_, index) => [Novel1]);
    const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];




    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수
    const [resultCategoryNovel, setResultCategoryNovel] = useState([]);

    //전체 페이지 수 동적임
    const [totalPages, setTotalPages] = useState([10]);




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


    //완결

    const [selectedFnVal, setSelectedFnVal] = useState(0);
    const onClickSelectedFn = () => {
        if (selectedFnVal == 1)
            setSelectedFnVal(0);
        else {
            setSelectedFnVal(1);
        }


    };



    //장르 하나 정하기 
    const [selectedGenre, setSelectedGenre] = useState('로맨스');

    const onClickSelectedGr = (genre) => {
        if (selectedGenre == genre)
            setSelectedGenre("None");
        else {
            setSelectedGenre(genre);
        }

    };

    //플랫폼 하나 정하기 
    const [selectedFlp, setSelectedFlp] = useState('is_kakao');

    const onClickSelectedFlp = (flp) => {
        if (selectedFlp == flp)
            setSelectedFlp("");
        else {
            setSelectedFlp(flp);
        }

    };


    useEffect(() => console.log(selectedFnVal, selectedFlp, selectedGenre), [selectedFnVal, selectedGenre, selectedFlp]);


    //2.
    //fetch 요청이 완료된 후에 setResultMainNovel을 사용하여 resultMainNovel 상태를 업데이트하고, 이를 기반으로 랭킹 소설 목록을 렌더링하도록 수정하였습니다.



    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때(fetch 요청 전에) 한 번만 실행되도록 설정하였습니다. 
    //useEffect의 두 번째 인자로 빈 배열([])을 전달하여 의존성 배열이 비어있음을 나타내어, 효과는 마운트될 때만 실행되고, 업데이트될 때는 실행되지 않도록 했습니다.
    useEffect(() => {

        console.log(selectedFlp)
        fetch("/novel/category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isFinished: selectedFnVal,
                platform: selectedFlp,
                genre: selectedGenre,
                orderBy: "download_cnt",
                pageNum: currentPage - 1,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result.result.count)
                //useState이용하여 
                setResultCategoryNovel(result.result.dto);
                // 전체 페이지 수 계산
                setTotalPages(Math.ceil(result.result.count / itemsPerPage));

            });
    }, [selectedFnVal, selectedGenre, selectedFlp, currentPage]);



    return (
        <div >

            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>카테고리</h1>
            <hr style={{ width: '100%' }}></hr>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '7%' }}>




                <div style={{ marginRight: 'auto', marginBottom: '3%' }}>
                    {/* GNB1의 SearchBox랑은 다름. 다른 페이지이기에 버튼도 달리 지정. */}


                </div>
                <div  >
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
                        리뷰순
                    </button>
                    <button
                        style={{
                            border: 'none',
                            background: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        평점순
                    </button>
                </div>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%', gap: '5vh' }}>
                    <button
                        onClick={() => onClickSelectedFn()}
                        style={{
                            color: selectedFnVal === 1 ? 'green' : 'black',
                            border: '1px solid black',
                            background: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            width: '50%',
                            border: '1px dashed'
                        }}
                    >
                        완결
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '2%', width: '170px', height: '400px', border: '3px solid black', justifyContent: 'flex-start', alignItems: 'center', gap: '10%' }}>
                        <h3 style={{ fontSize: '2rem' }}>플랫폼</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <button
                                className="f1"
                                onClick={() => onClickSelectedFlp('is_kakao')}
                                style={{
                                    color: selectedFlp === 'is_kakao' ? 'green' : 'black',

                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='is_kakao'
                            >
                                카카오페이지
                            </button>
                            <button
                                onClick={() => onClickSelectedFlp('is_naver')} style={{
                                    color: selectedFlp === 'is_naver' ? 'green' : 'black',

                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='네이버시리즈'
                            >
                                네이버시리즈
                            </button>
                            <button
                                onClick={() => onClickSelectedFlp('is_ridi')}
                                style={{
                                    color: selectedFlp === 'is_ridi' ? 'green' : 'black',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='리디'
                            >
                                리디
                            </button>
                            <button
                                onClick={() => onClickSelectedFlp('is_munpia')}
                                style={{
                                    color: selectedFlp === 'is_munpia' ? 'green' : 'black',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',


                                }}
                                value='문피아'
                            >
                                문피아
                            </button>
                        </div>


                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '2%', width: '170px', height: '700px', border: '3px solid black', justifyContent: 'flex-start', alignItems: 'center', gap: '10%' }}>
                        <h3 style={{ fontSize: '2rem' }}>장르</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <button className="r1"
                                onClick={() => onClickSelectedGr('로맨스')}
                                style={{
                                    color: selectedGenre === '로맨스' ? 'green' : 'black',
                                    border: "none",
                                    background: "none",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                }}
                                value='로맨스'                    >로맨스</button>
                            <button
                                onClick={() => onClickSelectedGr('로판')}
                                style={{
                                    color: selectedGenre === '로판' ? 'green' : 'black',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='로판'>
                                로판
                            </button>
                            <button
                                onClick={() => onClickSelectedGr('판타지')}
                                style={{
                                    color: selectedGenre === '판타지' ? 'green' : 'black',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='판타지'
                            >
                                판타지
                            </button>
                            <button

                                onClick={() => onClickSelectedGr('현판')}
                                style={{
                                    color: selectedGenre === '현판' ? 'green' : 'black',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='현판'  >
                                현판
                            </button>
                            <button
                                onClick={() => onClickSelectedGr('무협')}
                                style={{
                                    color: selectedGenre === '무협' ? 'green' : 'black',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='무협'
                            >
                                무협
                            </button>
                            <button
                                onClick={() => onClickSelectedGr('미스터리')}
                                style={{
                                    color: selectedGenre === '미스터리' ? 'green' : 'black',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='미스터리'
                            >
                                미스터리
                            </button>
                            <button
                                onClick={() => onClickSelectedGr('라이트노벨')}
                                style={{
                                    color: selectedGenre === '라이트노벨' ? 'green' : 'black',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',

                                }}
                                value='라이트노벨'
                            >
                                라이트노벨
                            </button>

                        </div>


                    </div>

                </div>


                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3%', justifyContent: 'center', width: '100%', height: '100%' }}>
                    {resultCategoryNovel
                        .map((item) => (
                            <div style={{ display: 'flex', marginTop: '5%' }}>
                                <div style={{ fontSize: '0.5em', height: '600px', width: '250px' }}>
                                    <Novel info={item}></Novel>
                                </div>


                            </div>
                        ))
                    }
                </div>
            </div>



            <div style={{ marginTop: '10%', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    pageNumbers={pageNumbers}
                />
            </div>



        </div >
    )
}
export default PageCategory;