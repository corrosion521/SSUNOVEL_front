import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContentsSearchResult = (title, resultCnt) => {
    console.log(title, resultCnt)
    const navigate = useNavigate();
    const [cnt,setCnt] = useState(resultCnt);
    const pushList = () => {
        const resultList = [];
        while (cnt != 0) {
            resultList.push(<li key={cnt}>
                {/* 검색 결과 하나씩 출력 */}
            </li>);
            setCnt(cnt - 1);
        }
    }
    console.log(cnt);

    const contentsHeader = () => {

        if (resultCnt >= 0 && resultCnt <= 5) {   // 검색결과 5개 이하 
            return (
                <div className="contents-header">
                    <p className="title">{title} {'('}{resultCnt}{')'}</p>
                </div>
            );
        } else if (resultCnt > 5) {  // 검색결과 5개 초과 -> 더보기 버튼 추가
            return (
                <div className="contents-header">
                    <p className="title">{title} {'('}{resultCnt}{')'}</p>
                    <button type="button" onClick={navigate()}>더보기 {'>'}</button>
                </div>
            );
        }
    }
    return (
        <div className="contents-frame">
            결과
            {contentsHeader}
            <ul className="contents-list">
                {pushList}
            </ul>
        </div>
    );
}
export default ContentsSearchResult;