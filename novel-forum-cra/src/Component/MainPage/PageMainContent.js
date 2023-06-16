import React, { useState, useEffect } from "react";
import Novel from "../NovelPage/Novel";

function PageMainContent() {


    //fetch 요청이 완료된 후에 setResultMainNovel을 사용하여 resultMainNovel 상태를 업데이트하고, 이를 기반으로 랭킹 소설 목록을 렌더링하도록 수정하였습니다.
    const [resultMainNovel, setResultMainNovel] = useState([]);


    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때(fetch 요청 전에) 한 번만 실행되도록 설정하였습니다. 
    //useEffect의 두 번째 인자로 빈 배열([])을 전달하여 의존성 배열이 비어있음을 나타내어, 효과는 마운트될 때만 실행되고, 업데이트될 때는 실행되지 않도록 했습니다.
    useEffect(() => {
        fetch("/novel/main", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                //useState이용하여 
                setResultMainNovel(result.result["rankingNovel"]);

            });
    }, []);

    return (
        <div>
            <div>
                <h1
                style={{fontFamily:'Noto Sans KR, sans-serif', fontSize:'32px', fontWeight:'normal', }}
                >전체 랭킹 TOP 20</h1>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: '3%', rowGap: '40px', justifyContent: 'center' }}>
                    {
                        resultMainNovel.map((novel, i) => (
                            <div style={{ width: '17%', border: 'none', marginTop: '15px', fontSize: '1rem' , position:'relative', }} >
                                <Novel info={novel} />
                                <i style={{ position: 'absolute', top: '-15px', left:'-15px', }}>
                                    <img width="auto" height="70" src={require(`../../numberIMG/${i+1}.png`)} alt="number"
                                        // style={{ position: 'relative'}} 
                                        />
                                </i>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default PageMainContent;
