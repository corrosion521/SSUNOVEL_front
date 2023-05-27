import React from "react"
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

/*
유형 : 글 게시물 페이지
기능 : 
1. 
2. [api 연동] 세부 게시물


*/




//컴포넌트
function PageWriting() {
    //2. 
    //글 제목
    const [title, setTitle] = useState("")
    //내용 
    const [content, setContent] = useState("")
    //닉네임
    const [nickName, setNickName] = useState("")
    //댓글 하나 컴포넌트
    const Onerp = ({ item }) => {

        return (
            <div
                style={{
                    borderBottom: '2px dotted gray',
                    backgroundColor: 'white',
                    display: 'flex',
                    width: '100%',
                    height: '120px',
                    fontSize: '1rem',
                    textAlign: 'center'
                }}
            >

                <div style={{ width: '10%', margin: 'auto', fontWeight: 'bold', marginLeft: '0' }}>
                    {title}
                </div>

                <div
                    style={{ width: '50%', margin: 'auto', marginLeft: '0', textAlign: 'left' }}
                >
                    {content}
                </div>

                <div style={{ margin: '0', width: '15%', margin: 'auto', marginRight: 0, fontSize: '0.9em' }}>
                    {item[2]
                    }
                </div>


            </div>
        );
    };
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery();
    const data = query.get('data');
    console.log("data", data)
    //const data2 = query.get('data2');
    //const decodeddata2 = decodeURIComponent(data2);
    //console.log("data2", decodeddata2)

    //댓글 글자수용 useState
    let [inputCount, setInputCount] = useState(0);

    //댓글 전송용 useState
    let [rpCount, setRpCount] = useState("");


    const onInputHandler = (e) => {
        const currentLength = e.target.value.length;

        if (currentLength < inputCount) { // 글자 수가 줄어들 때
            // 마지막 문자가 개행이 아니면 추가로 개행을 하지 않음
            if (e.target.value[currentLength - 1] !== '\n') {
                setInputCount(currentLength);
                return;
            }
        }
        setInputCount(currentLength);

        // 현재 글자 수가 30의 배수일 때 개행을 추가
        if (currentLength % 32 === 0) {
            e.target.value += '\n';
        }

        //댓글 전송용
        setRpCount(e.target.value);


    };



    //임시 댓글
    // 전체 댓글 리스트 (500개의 아이템 생성)
    const item = Array.from({ length: 100 }, (_, index) => ["아무개", index + 1 + "잘모르겠네", "04-09 12:11"]
    );

    // 삭제, 수정시 페이지 이동
    const navigate = useNavigate();

    //삭제 함수
    const DeleteWriting = ({ data }) => {
        console.log(data[0])//나중에 이 글 번호가지고 api호출함. 글 번호로 글삭제

        fetch(`/community/${data[0]}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },


        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result)
                if (result.result == "잘못된 유저 아이디입니다.")
                    alert("본인의 게시물만 삭제할 수 있습니다")

            });


        navigate("../community")//뒷페이지 이동.
    }
    //수정 함수
    const ModifyWriting = ({ data }) => {
        console.log("이게맞나?", data[0])//얘도 나중에 이 글 번호가지고 api호출함. 글 번호 + 입력 데이터로 글 수정.
        navigate(`./modify/?data=${data[0]}`)// 이동.
    }

    //댓글 작성함수
    const onSubmitRp = ({ rpCount }) => {
        console.log(rpCount);
        // API 호출 및 데이터 저장 코드 작성
        // 완료된 후 페이지 새로고침
        window.location.reload();
    }




    useEffect(() => {


        fetch(`/community/${data}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result)
                setTitle(result.result.title)
                setContent(result.result.content)
                setNickName(result.result.nickname)
                console.log("음", result.result.title)

            });
    }, []);


    return (
        <div style={{ position: 'relative' }}>
            <h1 style={{ fontSize: '2rem', textAlign: 'start' }}>  <h3>{title}</h3></h1>
            <hr style={{ width: '100%' }}></hr>


            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ marginRight: '0' }}>{nickName}</div>
                <hr style={{ margin: '0 10px' }}></hr>
                ..
            </div>
            <div style={{ marginTop: '10%', height: '400px' }}>
                {content}
            </div>
            <div style={{ position: 'absolute', right: 0, display: 'flex', gap: '5%' }}>
                <button
                    onClick={() => ModifyWriting({ data })}
                    className="HomepageLogo"
                    style={{
                        color: 'white',
                        width: '120px',
                        height: '50px',

                    }}
                >
                    글 수정
                </button>
                <button
                    onClick={() => DeleteWriting({ data })}
                    className="HomepageLogo"
                    style={{
                        background: 'red',
                        borderColor: 'red',
                        color: 'white',
                        width: '120px',
                        height: '50px',
                    }}
                >
                    글 삭제
                </button>

            </div>
            <hr style={{ marginTop: '10%' }}></hr>
            {/*useState사용해서,  작성 중 댓글 글자수 실시간 표시*/}

            <p>
                <span>{inputCount}</span>
                <span>/100 자</span>
            </p>
            <textArea style={{
                padding: '2%',
                border: 'none',
                backgroundSize: 'cover',
                outline: 'none',
                cursor: 'text',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                fontSize: '1.2rem',
                width: '83%',
                height: '115px',
                resize: 'none',
            }} onChange={onInputHandler} maxLength="100" />
            <button
                onClick={() => onSubmitRp({ rpCount })}
                className="HomepageLogo"
                style={{

                    color: 'white',
                    width: '120px',
                    height: '160px',
                    position: 'absolute',
                    right: 0

                }}
            >
                작성
            </button>
            {
                item.map(
                    (item) =>
                    (
                        <Onerp item={item} key={item} />

                    )

                )
            }
            <Onerp item={item[0]}></Onerp>
        </div>
    )




}

export default PageWriting;
