// 마이페이지_나의보관함

import React, { useEffect, useState } from "react";
import './CollectionMy.css';
import MyCollection from "./MyCollection";
import MyPageNav from "../MyPageNav";
import ModalCollectionMy from "./ModalCollectionMy";

const CollectionMy = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    }


    // 보관함 모달
    // const [collectionOpen, setCollectionOpen] = useState(false);

    // 보관함 수정/삭제 여부
    const [isEdit, setIsEdit] = useState(false);

    // 생성한 보관함 리스트
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        fetch(`/member/mypage/box`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("생성한 보관함:", result)
                if (result.message === "성공") {
                    setCollections(result.result.memberBoxInfoList);
                }
            });
    }, [modalOpen, isEdit])

    // 전체 아이템 리스트
    // const itemList = Array.from({ length: 10 }, (_, index) => [Collection1]);
    const itemList = collections;


    //------페이지네이션-----------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // 한 페이지에 보여줄 아이템 개수


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
                                fontSize: '0.8rem',
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
                                fontSize: '0.8rem',
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
            <div className="my-collection my-container">
                <div className="my-container__title">나의 보관함 {'('}{collections.length}{')'}</div>
                <div className='my-container__line'></div>
                <button type="button" className="create-collection-btn" onClick={showModal} style={{ cursor: 'pointer' }}>보관함 생성 {'>'}</button>
                {modalOpen && <ModalCollectionMy setModalOpen={setModalOpen} />}
                <div style={{ marginTop: '3%' }}>
                    <div className="my-contents-list" >
                        {
                            itemList.map(
                                (collections) =>
                                (
                                    <div style={{ width: '17%', fontSize: '0.6rem' }}>
                                        <MyCollection data={collections} key={collections} setIsEdit={setIsEdit} />
                                    </div>
                                )
                            )
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)//페이지 슬라이싱 1~15
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', }}>
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
            </div>
        </div>
    )
}

export default CollectionMy;