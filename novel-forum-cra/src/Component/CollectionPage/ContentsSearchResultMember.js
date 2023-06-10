
import Collection from "./Collection";

const ContentsSearchResultMember = ({ title, resultCnt, resultAry, setSelectedBtn }) => {
    // 더보기 버튼 클릭시 수행
    const handleClick = () => {
        if (title === "작품명") {
            setSelectedBtn("작품");
        }
        else {
            setSelectedBtn("작가");
        }
    }

    const contentsHeader = () => {
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
                {/* 검색결과 5개 초과 -> 더보기 버튼 추가 */}
                {
                    resultCnt > 5 &&
                    <button
                        type="button"
                        onClick={handleClick}
                        style={{ background: "none", border: "none", cursor: "pointer", }}
                    >더보기 {'>'}</button>
                }
            </div>
        );
    }

    const printContents = () => {
        if (title === "작품명") {
            return (
                resultAry
                    .slice(0, 5) // 5개만 출력
                    .map(
                        (collection) =>
                        (
                            <div style={{ width: '17%', height: '300px', fontSize: '0.8rem', }}>
                                <Collection data={collection} key={collection} />
                            </div>
                        )
                    )
            );
        } else {
            console.log(resultAry);
            return (
                resultAry
                    .slice(0, 5)
                    .map(
                        (author) =>
                        (
                            <div style={{ width: '17%', height: '300px', fontSize: '0.8rem' }}>
                                <Collection data={author} key={author} />
                            </div>
                        )
                    )
            )
        }
    }

    return (
        <div className="contents-frame">
            {contentsHeader()}
            <div
                className="contents-list"
                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: '3%', rowGap: '15px', justifyContent: 'flex-start', marginLeft: '3%', }}
            >
                {printContents()}
            </div>
        </div>
    );
}
export default ContentsSearchResultMember;