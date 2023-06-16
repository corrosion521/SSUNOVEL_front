import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContentsSearchResult from "./ContentsSearchResult";

const SearchTotal = ({ setSelectedBtn, setTotalCnt, setNovelCnt1, setAuthorCnt1 }) => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get('data');
    const [orderBy, setOrderBy] = useState("download_cnt");

    const [novels, setNovels] = useState([]);
    const [novelCnt, setNovelCnt] = useState(0);
    const [authors, setAuthors] = useState([]);
    const [authorCnt, setAuthorCnt] = useState(0);
    const [novelFlag, setNovelFlag] = useState(false); //작품 아무 것도 없는 것 생각
    const [authorFlag, setAuthorFlag] = useState(false); //작가 아무 것도 없는 것 생각

    useEffect(() => {

        fetch(`/novel/search?search=${searchTerm}&orderBy=${orderBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result.result.forNovel.count);
                // console.log("작품명 검색에 대한 결과", result.result.forNovel)

                //useState이용하여 작품, 작가 배열 초기화
                if (result.message === "성공") {
                    if (result.result.forNovel.count > 0) {
                        setNovelFlag(true);
                        setNovels(result.result.forNovel.dto);
                        setNovelCnt(result.result.forNovel.count);
                    } else {
                        setNovelFlag(false);
                        setNovels([]);
                        setNovelCnt(0);
                    }
                    if (result.result.forAuthor.count > 0) {
                        setAuthorFlag(true);
                        setAuthors(result.result.forAuthor.dto);
                        setAuthorCnt(result.result.forAuthor.count);
                        // result.result.forAuthor.dto
                        // .map(
                        //     (author) =>
                        //     {
                        //         if(!authors.includes(author.authorName)) {
                        //             setAuthors([...authors,author.authorName]);
                        //         }
                        //     }
                        // )                        
                    } else {
                        setAuthorFlag(false);
                        setAuthors([]);
                        setAuthorCnt(0);
                    }
                }
                else {  // 성공하지 못한 경우 ==> 코드 잘 안먹는듯.. 수정필요
                    setNovelFlag(false);
                    setNovels([]);
                    setNovelCnt(0);
                    setAuthorFlag(false);
                    setAuthors([]);
                    setAuthorCnt(0);
                }
            });
    }, [searchTerm]);

    setTotalCnt(novelCnt + authorCnt);
    setNovelCnt1(novelCnt);
    setAuthorCnt1(authorCnt);

    return (
        <div>
            <ContentsSearchResult title="작품명"
                resultCnt={novelCnt}
                resultAry={novels}
                setSelectedBtn={setSelectedBtn}
            />
            {!novelFlag &&
                <div className="noresult">작품 검색 결과가 없습니다.</div>}
            <div className="line1"></div>
            <ContentsSearchResult title="작가명"
                resultCnt={authorCnt}
                resultAry={authors}
                setSelectedBtn={setSelectedBtn}
            />
            {!authorFlag &&
                <div className="noresult">작가 검색 결과가 없습니다.</div>}
        </div>
    );
}

export default SearchTotal;