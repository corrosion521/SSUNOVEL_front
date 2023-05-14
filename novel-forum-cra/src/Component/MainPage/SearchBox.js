import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(""); // 입력 값 상태

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            navigate(`../search?data=${inputValue}`);
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <div className="SearchBox" style={{ display: 'flex' }}>
            <img src="../BtnSearchBox.png" style={{ padding: '7px' }}></img>
            <input
                type="text"
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

export default SearchBox;
