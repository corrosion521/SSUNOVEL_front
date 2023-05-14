import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            //event.preventDefault(); // 기본 엔터 동작 방지
            navigate("/search");
        }
    };

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
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default SearchBox;
