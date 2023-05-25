// 마이페이지_나의보관함

import React, { useState } from "react";
import Collection from "../CollectionPage/Collection";
import MyPageNav from "./MyPageNav";
import ModalCollectionMy from "./ModalCollectionMy";

const CollectionMy = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const Collection1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "판타지모음", "김김김", "422"];
    const collections = [Collection1, Collection1, Collection1, Collection1, Collection1, Collection1];

    const showModal = () => {
        setModalOpen(true);
    }

    return(
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-collection my-container">
                <div className="my-container__title">나의 보관함 {'('}{ collections.length }{')'}</div>
                <div className='my-container__line'></div>
                <button type="button" className="create-collection-btn" onClick={showModal}>보관함 생성 {'>'}</button>
                {modalOpen && <ModalCollectionMy setModalOpen={setModalOpen} />}
                <div style={{ marginTop: '3%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '100px', justifyContent: 'space-evenly' }}>
                    {
                        collections.map(
                            (collections) =>
                            (
                                <div style={{ width: '180px', height: '450px' }}>
                                    <Collection info={collections} key={collections} />
                                </div>

                            )

                        )
                    }
                </div>
            </div>
            </div>
        </div>
    )
}

export default CollectionMy;