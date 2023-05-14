import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PageWriteWriting() {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const dataString = query.get("data");
    const data = dataString ? dataString.split(",") : [];

    const navigate = useNavigate();

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const WriteWriting = () => {
        console.log(title, content);//API적용 여기에 + 사용자ID?
        navigate('../community')
    };

    return (
        <div style={{ position: "relative" }}>
            <h1 style={{ fontSize: "2rem", textAlign: "start" }}>
                <textarea
                    maxLength={25}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        border: "none",
                        backgroundSize: "cover",
                        outline: "none",
                        cursor: "text",
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        fontSize: "1.5rem",
                        width: "94%",
                        height: "40px",
                        resize: "none",
                        padding: '3%'

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
                onChange={(e) => setContent(e.target.value)}
                maxLength={1000}
                style={{
                    border: "none",
                    backgroundSize: "cover",
                    outline: "none",
                    cursor: "text",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    fontSize: "1.5rem",
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
                    marginTop: "4%",
                    display: "flex",
                    width: '100%',
                    justifyContent: 'center',
                    gap: '25%'
                }}
            >
                <div>
                    <button
                        onClick={WriteWriting}
                        className="HomepageLogo"
                        style={{
                            color: "white",
                            width: "120px",
                            height: "50px",
                        }}
                    >
                        작성 완료
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => navigate("../community")}
                        className="HomepageLogo"
                        style={{
                            background: "red",
                            borderColor: "red",
                            color: "white",
                            width: "120px",
                            height: "50px",
                        }}
                    >
                        작성 취소
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PageWriteWriting;
