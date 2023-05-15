import { useNavigate, useLocation } from "react-router-dom";
import ContentsSearchResult from "./ContentsSearchResult";

const PageSearchResult = () => {
    // const navigate=useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get('data');

    // apif로 가져온 데이터 내에서 검색 기능 구현
    const Novel1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "재밌는 소설", "김진수", "4.2", "200", "120", "네이버시리즈", "정통 무협 회귀 판타지!!"]
    const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];
    const authors = ["작가1", "작가2", "작가3", "작가4"]

    const NovelResultCnt = novels.length;    // 작품 검색 결과 개수
    const AuthorResultCnt = authors.length;    // 작가 검색 결과 개수

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
                    <ContentsSearchResult title="작품명"
                        resultCnt={NovelResultCnt}
                        resultAry={novels}
                    />
                    <ContentsSearchResult title="작가명"
                        resultCnt={AuthorResultCnt}
                        resultAry={authors}
                    />
                </div>
            </div>

        </div>
    );
}
export default PageSearchResult;