
import { FaStar } from 'react-icons/fa'
import { useState } from 'react';

function ModalReviewModify({ setModalOpen, reviewId, novelId, patch }) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    //리뷰 글자수용 useState
    let [inputCount, setInputCount] = useState(0);

    //리뷰 전송용 useState
    let [rpCount, setRpCount] = useState("");

    //3.2) 리뷰 글자수 제한 함수
    const onInputHandler = (e) => {
        const currentLength = e.target.value.length;

        //글자수
        setInputCount(currentLength);
        //리뷰 전송용
        setRpCount(e.target.value);


    };


    //3.1) 
    const ARRAY = [0, 1, 2, 3, 4];

    //3.1)
    const starScore = (index) => {
        let star = [...score];

        for (let i = 0; i < 5; i++) {
            star[i] = i <= index ? true : false;
        }
        setScore(star);


    }
    //3. 2) 리뷰 작성함수
    const onModifyRv = ({ rpCount, score }) => {
        const stars = score.filter((item) => item).length;



        // const floatScore = parseFloat(stars.toFixed(1)); // 소수 첫째자리로 반올림하여 문자열로 변환



        const requestBody = `{
    "rating": ${stars},
    "content": "${rpCount}"
}`;


        fetch(`/novel/review/${novelId}/${reviewId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((result) => {

                if (result.code === 'INTERNAL_SERVER_ERROR')
                    alert("본인이 작성한 리뷰만 수정할 수 있습니다.")
                else {
                    setResultNovel(result.result);
                    setResultNovelReviews(result.result.reviewInfos);

                    fetch(`/novel/${novelId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => response.json())
                        .then((result) => {

                            console.log("novelpage최초", result)




                            //4.2
                            patch(result.result.reviewInfos);
                            setModalOpen(false);


                        });


                }


            });




    }
    //4.1 , 4.2
    //fetch 요청이 완료된 후에 setResultMainNovel을 사용하여 resultMainNovel 상태를 업데이트하고, 이를 기반으로 랭킹 소설 목록을 렌더링하도록 수정하였습니다.
    const [resultNovel, setResultNovel] = useState([]);
    const [resultNovelReviews, setResultNovelReviews] = useState([]);
    //3.1)
    const [score, setScore] = useState([false, false, false, false, false]);

    return (
        <div className='modalBackground'>
            <div className='modalFrame'>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center ', border: '2px solid red', height: '260px', marginBottom: '5%' }}>
                    <img onClick={closeModal} src="/IconCancel.png" style={{ width: '15px', height: '15px', border: 'none', background: 'none', position: 'relative', marginLeft: '92%', marginTop: '2%' }}></img>
                    <textarea onChange={onInputHandler} maxLength="100" style={{ height: '100%', marginTop: '2%', width: '90%', resize: 'none', border: '2px solid black', fontSize: '0.8rem', fontWeight: 'bold' }}>

                    </textarea>
                    <p style={{ fontSize: '0.7rem', marginLeft: '80%' }}>
                        <span>{inputCount}</span>
                        <span>/100 자</span>
                    </p>
                    <div style={{ marginLeft: '5%' }} >
                        {/*3.1) */}
                        {ARRAY.map((index) => (
                            <FaStar
                                onClick={() => starScore(index)}
                                key={index}
                                size="27"
                                color={score[index] ? "yellow" : "gray"}
                            ></FaStar>
                        ))}
                    </div>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginRight: '12%' }}>

                        <button
                            className="HomepageLogo"
                            style={{
                                color: 'white',
                                width: '100px',
                                height: '40px',
                                marginLeft: '50%',
                                marginBottom: '2%'
                            }}
                            onClick={() => onModifyRv({ rpCount, score })}
                        >
                            수정완료
                        </button>

                    </div>

                </div>
            </div>

        </div>


    );

}
export default ModalReviewModify;