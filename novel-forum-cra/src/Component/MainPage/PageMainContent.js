import React from "react"
import Novel from "../NovelPage/Novel";

function PageMainContent() {


    const Novel1 =
        "https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2"
    const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];

    return (
        <div >
            <div>
                <h1>전체 랭킹 TOP 10</h1>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }}>
                    {
                        novels.map(
                            (novel) =>
                            (
                                <Novel img={novel} key={novel} />
                            )

                        )
                    }
                </div>

            </div>
        </div>
    )

}


export default PageMainContent;