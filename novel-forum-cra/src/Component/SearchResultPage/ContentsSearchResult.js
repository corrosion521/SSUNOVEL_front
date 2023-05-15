import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContentsSearchResult = ({ title, resultCnt, resultAry }) => {
    // console.log(title, resultCnt)
    
    const navigate = useNavigate();
    const [cnt, setCnt] = useState(resultCnt);

    // 검색결과 매개변수로 받아와서 하나씩 리스트에 담아서 출력
    const pushList = () => {
        const resultList = [];
        while (cnt != 0) {
            console.log(cnt);
            resultList.push(<li key={cnt}>
                {/* 검색 결과 하나씩 출력 */}
            </li>);
            setCnt(cnt - 1);
        }
    }

    const pushListTest = () => {
        const testList = [];
        if (resultCnt <= 5){
            for(const i = 0; i<resultCnt; i++){
                testList.push(<li key={i}>
                    {/* 검색 결과 하나씩 출력 */}
                    resultAry[i]
                </li>);
            }
        } else {
            for(const i = 0; i<5; i++) {
                testList.push(<li key={i}>
                    resultAry
                </li>);
            }
        }
        return testList;
    }

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
                        <button type="button" onClick={navigate("/search/plus")}>더보기 {'>'}</button>
                    </div>
            );
        }
    }

    return (
        <div className="contents-frame">
            {contentsHeader()}
            <ul className="contents-list">
                {pushListTest()}
            </ul>
        </div>
    );
}
export default ContentsSearchResult;