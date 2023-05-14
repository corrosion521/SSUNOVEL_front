import React from "react";

const Review = ({ review }) => {
    return (
        <div style={{ border: '2px solid black', width: '100%', height: '130px', margin: 'auto', textAlign: 'center', fontSize: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexDirection: 'column' }}>
                {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                <div>
                    <h3 style={{ fontSize: '0.8rem' }}>{review[2]}</h3>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img src="IconStarOn.png" style={{ width: '0.5rem', height: '0.5rem' }} ></img><h3 style={{ fontSize: '0.5rem', marginRight: '5px' }}>{review[1]}</h3><h3 style={{ fontSize: '0.8rem', paddingBottom: '2px' }}>{review[0]}</h3>

                </div>

            </div>
        </div>
    )
}

export default Review;