// 마이페이지_작성리뷰
import MyPageNav from "./MyPageNav";

const ReviewMy = () => {

    return (
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-writing container">
                <div className="container__title">작성리뷰 {'('}{ }{')'}</div>
                <div className='container__line'></div>
            </div>
        </div>
    )
}

export default ReviewMy;