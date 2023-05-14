import React from "react";
import Collection from "./Collection";
import CollectionSearchBox from "./CollectionSearchBox";


function PageCollection() {

    const Collection1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "판타지모음", "김김김", "422"];
    const collections = [Collection1, Collection1, Collection1, Collection1, Collection1, Collection1];

    return (
        <div>

            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>보관함</h1>
            <hr style={{ width: '100%' }}></hr>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%' }} >
                <div style={{ marginRight: 'auto' }}>
                    {/*GNB1의 SearchBox랑은 다름. 다른 페이지이기에 버튼도 달리 지정.*/}
                    <CollectionSearchBox></CollectionSearchBox>
                </div>
                <div >
                    <button style={{ border: 'none', background: 'none', fontSize: '1rem', fontWeight: 'bold' }}>최신순</button>
                    <button style={{ border: 'none', background: 'none', fontSize: '1rem', fontWeight: 'bold' }}>공감순</button>
                </div>
            </div>
            <div style={{ marginTop: '3%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '100px', justifyContent: 'center' }}>
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
    )
}
export default PageCollection;