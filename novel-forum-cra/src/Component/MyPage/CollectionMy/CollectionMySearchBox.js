import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import ModalSearchResult from "./ModalSearchResult";

const CollectionMySearchBox = ({ novels, setNovels }) => {
    // const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(""); // 입력 값 상태
    const [searchTerm, setSearchTerm] = useState("");   // 검색어

    // 검색결과 모달
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    // 검색결과 모달 열기
    const showModal = () => {
        setSearchModalOpen(true);
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            setSearchTerm(inputValue);
            showModal();
            setInputValue("");  // 검색창 지우기
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <div className="SearchBox" style={{ display: 'flex' }}>
            <img src="/BtnSearchBox.png" style={{ padding: '7px' }}></img>
            <input
                type="text"
                style={{
                    border: 'none',
                    background: 'transparent',
                    backgroundSize: 'cover',
                    outline: 'none',
                    cursor: 'text',
                    fontSize: '0.8rem',
                    margin: "auto",
                    padding: "revert",
                }}
                value={inputValue} // 입력 값 설정
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {searchModalOpen && <ModalSearchResult setSearchModalOpen={setSearchModalOpen} searchTerm={searchTerm} novels={novels} setNovels={setNovels} />}
        </div>
    );
};

export default CollectionMySearchBox;
