import Novel from "../NovelPage/Novel";
import { useEffect, useState } from "react";

const ModalCollection = ({ setModalOpen, data }) => {

    //모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    }

    //컬렉션 내 소설들 
    // //api로 가져올 예정
    // const Novel1 =
    //     ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "재밌는 소설", "김진수", "4.2", "200", "120", "네이버시리즈", "정통 무협 회귀 판타지!!"]
    // const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];


    console.log("박스아이템인포", data.boxId)


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


    // 즐겨찾기 상태와 이미지 상태
    const [star, setStar] = useState(false);
    const [starimg, setStarimg] = useState("../IconStarOff.png");
    const [page, setPage] = useState(1)

    // 즐겨찾기 함수
    const onClickStar = () => {
        if (star === false) {
            setStar(true);
            setStarimg("../IconStarOn.png");
            console.log("클릭1");

            fetch(`/favorite/box/${data.boxId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {

                    console.log("즐겨찾기 결과", result.result)
                    if (result.message === "이미 등록된 즐겨찾기")
                        alert("이미 즐겨찾기 하셨습니다")
                });



        } else {
            setStar(false);
            setStarimg("../IconStarOff.png");
            console.log("클릭2");

            fetch(`/favorite/box/${data.boxId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {

                    console.log("즐겨찾기 결과", result.result)
                    if (result.message === "이미 등록된 즐겨찾기")
                        alert("이미 즐겨찾기 하셨습니다")
                });
        }
    };

    // 공감 상태와 이미지 상태
    const [like, setLike] = useState(false);
    const [likeimg, setLikeimg] = useState("../IconLike.png");

    // // 공감(좋아요) 함수
    // const onClickLike = () => {
    //     if (like === false) {
    //         setLike(true);
    //         setLikeimg("../IconLikeOn.png");
    //         console.log("클릭1");


    //     } else {
    //         setLike(false);
    //         setLikeimg("../IconLike.png");
    //         console.log("클릭2");
    //     }
    // };
    // 2. 공감(좋아요) 함수

    const [likeCnt, setLikeCnt] = useState(data.likeCnt != null ? data.likeCnt : "에러")


    const onClickLike = () => {
        if (like === false) { // 
            setLike(true);
            setLikeimg("../IconLikeOn.png");
            setLikeCnt(data.likeCnt != null ? likeCnt + 1 : data.likeCnt + 1)

            //실질적 반영 
            //[!!] 리뷰 페이지에서는 review_id를 아직 안줘서 에러남. 월요일 이후 고칠 것. 
            fetch(`/like/box/${data.boxId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("결과:", result)
                    if (result.code == "BAD_REQUEST") {
                        alert("좋아요는 한 번만 누를 수 있습니다.")
                        setLikeimg("../IconLike.png");
                        setLike(false)
                    }

                });

            console.log("클릭1");

        } else {

            setLike(false);
            setLikeimg("../IconLike.png");
            setLikeCnt(data.likeCnt != null ? likeCnt - 1 : data.like_cnt)


            //실질적 반영 
            fetch(`/like/box/${data.boxId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("결과:", result)
                    // if (result.code == "BAD_REQUEST") {
                    //     alert("좋아요는 한 번만 누를 수 있습니다.")
                    //     setLikeimg("IconLike.png");
                    //     setLikeCnt(review.like_cnt)
                    // }

                });


            console.log("클릭2");

        }
    };

    //novel 지정
    const [novels, setNovels] = useState([])

    useEffect(() => {

        fetch(`/box/info/${data.boxId}?page=${currentPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result)
                // //useState이용하여 
                setNovels(result.result.boxItemInfo);
                if (result.result.isFavorite == true) {// 좋아요 이미 했는지
                    setStar(true)
                    setStarimg("../IconStarOn.png")
                }
                if (result.result.isLike == true) {// 좋아요 이미 했는지
                    setLike(true)
                    setLikeimg("../IconLikeOn.png")
                }
                // // // 전체 페이지 수 계산
                //setTotalPages(Math.ceil(result.result.itemCnt / itemsPerPage));
                setTotalPages(Math.ceil(data.itemCnt / itemsPerPage));
            });
    }, [currentPage]);

    return (
        <div className="modalbackground" >
            <div className="modalframe" style={{ height: '62%' }}>
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <h3>{data.title}</h3>
                    <div style={{ display: 'flex', position: 'absolute', right: '30%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '40px', gap: '5px' }}>
                            <img onClick={onClickStar} src={starimg} style={{ width: '1.8rem', objectFit: 'cover' }}></img>
                            <h3 style={{ fontSize: '1rem' }}>즐겨찾기</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <img onClick={onClickLike} src={likeimg} style={{ width: '1.8rem', objectFit: 'cover' }}></img>
                            <h3 style={{ fontSize: '1rem' }}>공감</h3>
                        </div>
                    </div>
                    <img onClick={closeModal} src="../IconCancel.png" style={{ width: '25px', height: '25px', border: 'none', background: 'none', position: 'absolute', right: '0' }}></img>

                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                </div>

                <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '5%', height: '80%' }}>
                    {
                        novels
                            //.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//얘낸 한방에 보내줌. 한페이지에
                            .map
                            (
                                (novels) =>
                                (<div style={{ width: '140px', height: '270px' }}>
                                    <Novel info={novels} key={novels} />
                                </div>

                                )

                            )
                    }
                </div>
                <div style={{ marginTop: '3%', display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        pageNumbers={pageNumbers}
                    />
                </div>

            </div>
        </div >
    )
}

export default ModalCollection;