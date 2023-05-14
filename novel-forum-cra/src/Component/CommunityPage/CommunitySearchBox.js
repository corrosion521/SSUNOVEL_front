import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunitySearchBox = () => {

    {/*리액트훅 : useNavigate : 원하는 도메인 접근. 
    이 때 데이터도 전달가능 (Router의 Link 와 유사. Link는 정적, navigate는 동적) */ }
    const navigate = useNavigate();


    const [inputValue, setInputValue] = useState(""); // 입력 값 상태

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            {/*data싣자 */ }
            navigate(`../community/search?data=${inputValue}`);
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="SearchBox" style={{ display: 'flex' }}>
            <img src="../BtnSearchBox.png" style={{ padding: '7px' }}></img>
            <input
                type="text"
                maxLength={40}
                style={{
                    border: 'none',
                    background: 'transparent',
                    backgroundSize: 'cover',
                    outline: 'none',
                    cursor: 'text',
                    fontSize: '0.8rem'
                }}
                value={inputValue} // 입력 값 설정
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
        </div>
    );
};

export default CommunitySearchBox;
