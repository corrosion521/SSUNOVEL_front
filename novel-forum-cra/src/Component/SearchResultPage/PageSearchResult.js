import { useNavigate, useLocation, NavLink, Routes, Route } from "react-router-dom";
import SearchTotal from "./SearchTotal";
import SearchNovel from "./SearchNovel";
import { useState } from "react";
import SearchAuthor from "./SearchAuthor";
import './searchResult.css';

const PageSearchResult = () => {
    const [selectedBtn, setSelectedBtn] = useState("전체");

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get('data');

    const [totalCnt, setTotalCnt] = useState(0);
    const [novelCnt, setNovelCnt] = useState(0);
    const [authorCnt, setAuthorCnt] = useState(0);

    return (
        <div className="search-result">
            <div className="search-result-title" style={{ margin: "1rem 0" }}>
                <strong className="search-text">
                    '{searchTerm}'
                </strong>
                에 대한 검색결과 입니다.
            </div>
            <div>
                <button
                    className={selectedBtn === "전체" ? "active-btn-style" : "deactive-btn-style"}
                    type="button"
                    onClick={() => setSelectedBtn("전체")}
                >
                    전체{'('}{totalCnt}{')'}
                </button>
                <button
                    className={selectedBtn === "작품" ? "active-btn-style" : "deactive-btn-style"}
                    type="button"
                    onClick={() => setSelectedBtn("작품")}
                >
                    작품명{'('}{novelCnt}{')'}
                </button>
                <button
                    className={selectedBtn === "작가" ? "active-btn-style" : "deactive-btn-style"}
                    type="button"
                    onClick={() => setSelectedBtn("작가")}
                >
                    작가명{'('}{authorCnt}{')'}
                </button>
            </div>
            <div className="line1"></div>
            <div className="search-result-contents">
                <div className="contents">
                    {selectedBtn === "전체" &&
                        <SearchTotal setSelectedBtn={setSelectedBtn} setTotalCnt={setTotalCnt} setNovelCnt1={setNovelCnt} setAuthorCnt1={setAuthorCnt} />
                    }
                    {selectedBtn === "작품" &&
                        <SearchNovel />
                    }
                    {selectedBtn === "작가" &&
                        <SearchAuthor />
                    }
                </div>
            </div>

        </div>
    );
}
export default PageSearchResult;