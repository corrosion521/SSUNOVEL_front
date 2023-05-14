import React from "react";
import { useNavigate } from "react-router-dom";

function Novel({ info }) {
    {/*props.info로 데이터 리스트 받아옴(소설정보). api연동 전에도 이 정도 해둬야함. */ }

    const navigate = useNavigate();

    const onClickNovelImage = () => {
        //console.log(info)
        navigate(`/novel?data=${info}`);
    }
    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
            <img src={info[0]}
                style={{ width: '100%', height: '100%' }} onClick={onClickNovelImage} alt="소설이미지 안나옴" />
            <h3 style={{ margin: '0', marginTop: '13px' }}>{info[1]}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                <h3 style={{ fontSize: '0.8em', marginRight: '5px' }}>{info[2]}</h3><img src="../IconStarOn.png" style={{ width: '0.8rem' }} ></img><h3 style={{ fontSize: '0.8em', paddingBottom: '2px' }}>{info[3]}</h3>

            </div>

        </div>


    )
}
export default Novel;