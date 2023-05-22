// 마이페이지_나의보관함
import MyPageNav from "./MyPageNav";

const CollectionMy = () => {

    return(
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-writing container">
                <div className="container__title">나의 보관함 {'('}{ }{')'}</div>
                <div className='container__line'></div>
            </div>
        </div>
    )
}

export default CollectionMy;