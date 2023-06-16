const BtnLogOut = ({setIsLogin}) => {
    const logout = () => {
        fetch("/member/logout", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        })
            .then((response) => response.json())
            .then((result) => { 
                if (result.code === "OK") {    // 로그아웃 성공시 
                    setIsLogin(false);              
                } else {
                    return alert(result.message);
                }
            });
    }

    return (
        <div className="BtnLoginSignup" >
            <button 
            style={{ border: 'none', background: 'none', fontSize: '0.8rem', fontWeight: 'bold' }}
            onClick={logout}
            >
                로그아웃</button>
        </div>
    )

}

export default BtnLogOut;