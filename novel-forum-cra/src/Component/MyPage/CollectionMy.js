// 마이페이지_나의보관함
import MyPageNav from "./MyPageNav";

const CollectionMy = () => {

    return(
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-collection my-container">
                <div className="my-container__title">나의 보관함 {'('}{ }{')'}</div>
                <div className='my-container__line'></div>
            </div>
        </div>
    )
}

export default CollectionMy;