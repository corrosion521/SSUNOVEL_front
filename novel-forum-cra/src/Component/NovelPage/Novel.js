import React from "react";
import { useNavigate } from "react-router-dom";

function Novel({ info }) {
    {/*props.info로 데이터 리스트 받아옴(소설정보). api연동 전에도 이 정도 해둬야함. */ }
    {/*review_rating이 아니라 reivew임 이것만 좀 이상함 이름 */ }

    const navigate = useNavigate();
    console.log(info)
    const onClickNovelImage = (event) => {
        const data = [info.novelId || info.id, info.authorName, info.name]
        navigate(`/novel?data=${data}`);
        window.location.reload()

    }



    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', minWidth: '100px' }}>


            <img src={info.img_link || info.image_url || info.novelImage}
                style={{ backgroundColor: 'white', width: '100%', height: '70%', objectFit: 'contain' }} onClick={onClickNovelImage} alt="소설이미지 안나옴" />


            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
                {/*minHeight이용한 고정 크기 확보 */}
                <h3 style={{ minHeight: '3em', margin: '0', marginTop: '1%', fontSize: '1em' }}>{info.title || info.novelName}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                    <h3 style={{ fontSize: '0.7em', marginRight: '5px', fontWeight: 'normal' }}>{info.authorName}</h3><img src="../IconStarOn.png" style={{ width: '0.8rem', fontWeight: 'normal' }} ></img><h3 style={{ fontSize: '0.7em', paddingBottom: '2px' }}>
                        {info.reivew_rating != null ? (Math.round(info.reivew_rating * 10) / 10).toFixed(1) : (info.rating != null ? (Math.round(info.rating * 10) / 10).toFixed(1) : '')}
                    </h3>
                </div>
            </div>


        </div >


    )
}
export default Novel;