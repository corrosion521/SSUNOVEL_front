// 마이페이지_선호작가
import MyPageNav from "./MyPageNav";

const FavAuthorMy = () => {

    return(
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-fav-author my-container">
                <div className="my-container__title">선호작가</div>
                <div className='my-container__line'></div>
            </div>
        </div>
    )
}

export default FavAuthorMy;