// 마이페이지_나의보관함
import MyPageNav from "./MyPageNav";

const CollectionMy = () => {

    return(
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-collection my-container">
                <div className="my-container__title">나의 보관함 {'('}{ }{')'}</div>
                <div className='my-container__line'></div>
                <button type="button" className="make-collection-btn">보관함 생성 {'>'}</button>
            </div>
        </div>
    )
}

export default CollectionMy;