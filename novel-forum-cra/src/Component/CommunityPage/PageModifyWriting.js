import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PageModifyWriting() {
    /**
     유형 : 글 수정 페이지
     기능 : 
     1. ...
     2. 기존 글 내용 가져오기 (수정 위해) 
     */

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const dataString = query.get("data");
    const data = dataString ? dataString.split(",") : [];
    console.log("수정데이터", data);



    const navigate = useNavigate();

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const WriteWriting = () => {
        console.log(title, content);//API적용 여기에 + 사용자ID?

        fetch(`/community/${data}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content,
            }),

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result)
                navigate('/community')
                if (result.result == null)
                    alert("본인의 게시물만 수정할 수 있습니다")

            });



    };

    //2. 기존 글 내용 가져와야 함.
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
            });
    }, []);


    return (
        <div style={{ position: "relative" }}>
            <h1 style={{ fontSize: "2rem", textAlign: "start" }}>
                <textarea
                    maxLength={23}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        border: "none",
                        backgroundSize: "cover",
                        outline: "none",
                        cursor: "text",
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        fontSize: "1.8rem",
                        width: "94%",
                        height: "38px",
                        resize: "none",
                        padding: '3%',
                        overflow: 'hidden'
                    }}
                    placeholder="제목을 입력하세요"
                ></textarea>
                <h3>{data[1]}</h3>
            </h1>
            <hr style={{ width: "100%" }}></hr>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ marginRight: "0" }}>{data[2]}</div>
                <hr style={{ margin: "0 10px" }}></hr>
                {data[3]}
            </div>

            <textarea
                value={content}
                maxLength={1000}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    border: "none",
                    backgroundSize: "cover",
                    outline: "none",
                    cursor: "text",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    fontSize: "1.6rem",
                    width: "94%",
                    height: "800px",
                    resize: "none",
                    padding: '3%'
                }}
                placeholder="내용을 입력하세요"
            ></textarea>

            <div
                style={{
                    position: "absolute",
                    right: "45%",
                    marginTop: "4%",
                    display: "flex",
                }}
            >
                <button
                    onClick={WriteWriting}
                    className="HomepageLogo"
                    style={{
                        color: "white",
                        width: "120px",
                        height: "50px",
                    }}
                >
                    수정 완료
                </button>

            </div>
        </div>
    );
}

export default PageModifyWriting;
