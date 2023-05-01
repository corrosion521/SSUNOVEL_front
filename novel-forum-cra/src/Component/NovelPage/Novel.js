import React from "react";

function Novel(props) {
    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={props.img}
                style={{ width: "170px", height: '260px' }} alt="소설이미지 안나옴" />
            <h3 style={{ margin: '0', marginTop: '13px' }}>작품이름 1</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                <h3 style={{ fontSize: '0.8rem', marginRight: '5px' }}>정지오</h3><img src="iconStar.png" ></img><h3 style={{ fontSize: '0.8rem', paddingBottom: '2px' }}>4.5</h3>
            </div>

        </div>


    )
}
export default Novel;