import React from "react";
import Novel from "../NovelPage/Novel";

function PageReview() {

    const Novel1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "재밌는 소설", "김진수", "4.2"]
    const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];

    return (
        <div >
            <div>
                <h1>전체 랭킹 TOP 10</h1>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>

                    {
                        novels.map(
                            (novels) =>
                            (<div style={{ width: '180px', height: '350px' }}>
                                <Novel info={novels} key={novels} />
                            </div>

                            )

                        )
                    }


                </div>

            </div>
        </div>
    )
}
export default PageReview;