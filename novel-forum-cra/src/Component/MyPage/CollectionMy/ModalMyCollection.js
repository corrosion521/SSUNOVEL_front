import Novel from "../../NovelPage/Novel";
import { useEffect, useState } from "react";
import ModalCollectionEdit from "./ModalCollectionEdit";

const ModalMyCollection = ({ setModalOpen, data }) => {

    //모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    }

    // 보관함 수정 모달
    const [editModalOpen, setEditModalOpen] = useState(false);
    // 작품추가 모달 열기
    const showModal = () => {
        setEditModalOpen(true);
    }

    // 보관함 삭제
    const deleteCollection = () => {
        fetch(`/box/${data.boxId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result)
                if(result.result="삭제 성공"){
                    closeModal();
                }
            });
    }

    console.log("박스아이템인포", data.boxId)

    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 개수

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
            <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30px', }}>
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
                setNovels(result.result.boxItemInfo)
                setTotalPages(Math.ceil(data.itemCnt / itemsPerPage));
            });
    }, [currentPage, editModalOpen]);


    return (
        <div className="modalbackground" >
            <div className="modalframe">
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <img onClick={closeModal} src="/IconCancel.png" style={{ width: '25px', height: '25px', border: 'none', background: 'none', position: 'absolute', right: '0' }}></img>
                </div>
                <div className="modal-contents">
                    <div className="ModalMyCollection-header">
                        {data.title}
                        <div className="collection-edit">
                        {/* <button type="button" className="collection-edit-btn" onClick={showModal}>보관함수정</button> */}
                        <button type="button" className="collection-edit-btn" onClick={deleteCollection}>보관함삭제</button>
                    </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '3%', gap: '3%', justifyContent: 'flex-start', width: '700px', height: '470px', }} >
                            {novels.map((value) => {
                                return (
                                    <div style={{ display: 'flex', }}>
                                        <div style={{ fontSize: '0.5em', height: '200px', width: '120px' }}>
                                            <Novel info={value} key={value} />
                                        </div>
                                    </div>
                                );
                            })
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
            </div>
            {/* {editModalOpen && <ModalCollectionEdit setModalOpen={setEditModalOpen} data={data} />} */}
        </div>
    )
}

export default ModalMyCollection;