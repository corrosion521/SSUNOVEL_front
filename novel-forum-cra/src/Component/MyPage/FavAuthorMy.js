// 마이페이지_선호작가
import MyPageNav from "./MyPageNav";

const FavAuthorMy = () => {

    return(
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-fav-author my-container">
                <div className="my-container__title">선호작가</div>
                <div className='my-container__line'></div>
                {/* 클릭시 작가별 작품 페이지로 이동하게 수정 */}
                작가1
            </div>
        </div>
    )
}

export default FavAuthorMy;