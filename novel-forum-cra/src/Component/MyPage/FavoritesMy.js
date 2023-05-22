// 마이페이지_즐겨찾기
import MyPageNav from "./MyPageNav";

const FavoritesMy = () => {

    return(
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-writing container">
                <div className="container__title">즐겨찾기</div>
                <div className='container__line'></div>
            </div>
        </div>
    )
}

export default FavoritesMy;