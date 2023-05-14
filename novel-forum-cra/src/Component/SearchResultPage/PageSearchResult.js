import { useNavigate, useLocation } from "react-router-dom";
import ContentsSearchResult from "./ContentsSearchResult";

const PageSearchResult = () => {
    // const navigate=useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get('data');

    const NovelResultCnt = 0;    // 작품 검색 결과 개수
    const AuthorResultCnt = 0;    // 작가 검색 결과 개수

    return (
        <div className="search-result page">
            <h2 className="search-result-title">
                <strong className="search-text">
                    '{searchTerm}'
                </strong>
                에 대한 검색결과 입니다.
            </h2>
            <div className="search-result-contents">
                <div className="contents">
                    <ContentsSearchResult title={"작품명"} resultCnt={NovelResultCnt} />
                    <ContentsSearchResult title="작가명" resultCnt={AuthorResultCnt} />
                </div>
            </div>

        </div>
    );
}
export default PageSearchResult;