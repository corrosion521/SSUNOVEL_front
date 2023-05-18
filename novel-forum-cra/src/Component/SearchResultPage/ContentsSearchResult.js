import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Novel from "../NovelPage/Novel";

const ContentsSearchResult = ({ title, resultCnt, resultAry }) => {
    // console.log(title, resultCnt)

    const navigate = useNavigate();
    const [cnt, setCnt] = useState(resultCnt);
    let testList = [];

    // 검색결과 매개변수로 받아와서 하나씩 리스트에 담아서 출력
    const pushList = () => {
        let resultList = [];
        while (cnt != 0) {
            console.log(cnt);
            resultList.concat(<li key={cnt}>
                {/* 검색 결과 하나씩 출력 */}
            </li>);
            setCnt(cnt - 1);
        }
    }

    const pushListTest = () => {

        console.log(testList);
        if (resultCnt <= 5) {
            for (let i = 0; i < resultCnt; i++) {
                testList.push(<li key={i}>
                    {/* 검색 결과 하나씩 출력 */}
                    {resultAry[i]}
                </li>);
            }
        } else {
            for (let i = 0; i < 5; i++) {
                testList.concat(<li key={i}>
                    {resultAry[i]}
                </li>);
            }
        }
        console.log(testList)
        // return testList;
    }

    const printContents = () => {
        if (title === "작품명") {
            return (
                resultAry
                    .slice(0, 5) // 5개만 출력
                    .map(
                        (novel) =>
                        (
                            <div style={{ width: '180px', height: '350px' }}>
                                <Novel info={novel} key={novel} />
                            </div>
                        )
                    )
            );
        } else {
            return (
                resultAry
                    .slice(0, 5)
                    .map(
                        (author) => (<div>{author}</div>)
                    )
            )
        }
    }

    const contentsHeader = () => {
        if (resultCnt >= 0 && resultCnt <= 5) {   // 검색결과 5개 이하 
            return (
                <div
                    className="contents-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "1.5rem",
                        marginBottom: "1rem",
                    }}
                >
                    <p className="title">{title} {'('}{resultCnt}{')'}</p>
                </div>
            );
        } else if (resultCnt > 5) {  // 검색결과 5개 초과 -> 더보기 버튼 추가
            return (
                <div
                    className="contents-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "1.5rem",
                        marginBottom: "1rem",
                    }}
                >
                    <p className="title">{title} {'('}{resultCnt}{')'}</p>
                    <button
                        type="button" onClick={navigate("/search/plus")}
                        style={{ background: "none", border: "none", cursor: "pointer", }}
                    >더보기 {'>'}</button>
                </div>
            );
        }
    }

    return (
        <div className="contents-frame"
            style={{ border: "solid 0.05rem #a3a3a3", padding: "1rem",}}>
            {contentsHeader()}
            <div
                className="contents-list"
                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-around' }}
            >
                {printContents()}
            </div>
        </div>
    );
}
export default ContentsSearchResult;