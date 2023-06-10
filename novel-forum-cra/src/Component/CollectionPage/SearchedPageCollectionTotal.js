import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContentsSearchResultCollection from "./ContentsSearchResultCollection";
import ContentsSearchResultMember from "./ContentsSearchResultMember";


const SearchedPageCollectionTotal = ({ setSelectedBtn, setTotalCnt, setNovelCnt1, setAuthorCnt1 }) => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get('data');
    const [orderBy, setOrderBy] = useState("download_cnt");

    const [collections, setCollections] = useState([]);
    const [collectionCnt, setCollectionCnt] = useState(0);
    const [authors, setAuthors] = useState([]);
    const [authorCnt, setAuthorCnt] = useState(0);
    const [collectionFlag, setCollectionFlag] = useState(false); //작품 아무 것도 없는 것 생각
    const [authorFlag, setAuthorFlag] = useState(false); //작가 아무 것도 없는 것 생각

    useEffect(() => {

        fetch(`/box/search?item=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("SearchedPageCollectionTotal결과", result);
                // console.log("작품명 검색에 대한 결과", result.result.forNovel)

                //useState이용하여 작품, 작가 배열 초기화
                if (result.message === "성공") {
                    if (result.result.boxCntByTitle > 0) {
                        setCollectionFlag(true);
                        setCollections(result.result.searchByTitle);
                        setCollectionCnt(result.result.boxCntByTitle);
                    } else {
                        setCollectionFlag(false);
                        setCollections([]);
                        setCollectionCnt(0);
                    }
                    if (result.result.boxCntByMember > 0) {
                        setAuthorFlag(true);
                        setAuthors(result.result.searchByMember);
                        setAuthorCnt(result.result.boxCntByMember);
                        // result.result.forAuthor.dto
                        // .map(
                        //     (author) =>
                        //     {
                        //         if(!authors.includes(author.authorName)) {
                        //             setAuthors([...authors,author.authorName]);
                        //         }
                        //     }
                        // )                        
                        // console.log(result.result.forAuthor.dto[0].authorName);
                    } else {
                        setAuthorFlag(false);
                        setAuthors([]);
                        setAuthorCnt(0);
                    }
                }
                else {  // 성공하지 못한 경우 ==> 코드 잘 안먹는듯.. 수정필요
                    setCollectionFlag(false);
                    setCollections([]);
                    setCollectionCnt(0);
                    setAuthorFlag(false);
                    setAuthors([]);
                    setAuthorCnt(0);
                }
            });
    }, [searchTerm]);

    setTotalCnt(collectionCnt + authorCnt);
    setNovelCnt1(collectionCnt);
    setAuthorCnt1(authorCnt);

    return (
        <div>
            <ContentsSearchResultCollection title="작품명"
                resultCnt={collectionCnt}
                resultAry={collections}
                setSelectedBtn={setSelectedBtn}
            />
            {!collectionFlag &&
                <div className="noresult">작품 검색 결과가 없습니다.</div>}
            <hr style={{ marginTop: "11%", marginBottom: "3%" }}></hr>

            <ContentsSearchResultMember title="작가명"
                resultCnt={authorCnt}
                resultAry={authors}
                setSelectedBtn={setSelectedBtn}
            />
            {!authorFlag &&
                <div className="noresult">작가 검색 결과가 없습니다.</div>}
        </div>
    );
}

export default SearchedPageCollectionTotal;