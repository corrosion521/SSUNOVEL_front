import React from "react";
import Collection from "./Collection";
import CollectionSearchBox from "./CollectionSearchBox";
import { useLocation } from "react-router-dom";

function PageCollection() {
    const Collection1 = [
        "https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2",
        "판타지모음",
        "김김김",
        "422",
    ];
    const collections = [
        Collection1,
        Collection1,
        Collection1,
        Collection1,
        Collection1,
        Collection1,
    ];

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery()
    const searchTerm = query.get('data')


    return (
        <div>
            <h1 style={{ fontSize: "2rem", textAlign: "center" }}>보관함</h1>
            <hr style={{ width: "100%" }}></hr>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "3%" }}>
                <div style={{ marginRight: "auto" }}>
                    <CollectionSearchBox></CollectionSearchBox>
                </div>
                <div>
                    <button
                        style={{
                            border: "none",
                            background: "none",
                            fontSize: "1rem",
                            fontWeight: "bold",
                        }}
                    >
                        최신순
                    </button>
                    <button
                        style={{
                            border: "none",
                            background: "none",
                            fontSize: "1rem",
                            fontWeight: "bold",
                        }}
                    >
                        공감순
                    </button>
                </div>
            </div>
            <div>
                <h3>'{searchTerm}'와 관련된 검색 결과입니다.</h3>
            </div>
            <div style={{ marginTop: "3%" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "100px",
                        justifyContent: "center",
                    }}
                >
                    {collections.map((collection) => (
                        <div style={{ width: "180px", height: "450px" }}>
                            <Collection info={collection} key={collection} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PageCollection;
