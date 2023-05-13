import { useNavigate } from "react-router-dom";

const PageSignupSuccess = () => {
    const navigate = useNavigate();

    return (
        <div
        className="signup-success page"
        style={{ alignItems: "center", flexDirection: "column" }}
        >
            <div className="contents"
                style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"45px 50px", gap: "30px" }}
            >
                <div
                    className="success-title"
                    style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                >
                    회원가입이 완료되었습니다.
                </div>
                <div
                    className="success-contents"
                >
                    이제 NovelForum에서 다양한 웹소설을 만나보세요!
                </div>
            </div>
            <button
                onClick={() => navigate("/")}
                style={{ backgroundColor: "black", border: "solid 0.05rem black", color: "white", cursor: "pointer", fontSize: "1.2rem", margin: "1rem", padding:"30px 100px"}}
            >
                메인화면으로 {'>'}</button>
        </div>
    );
}

export default PageSignupSuccess;