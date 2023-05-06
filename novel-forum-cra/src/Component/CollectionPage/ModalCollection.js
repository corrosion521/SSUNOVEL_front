import Novel from "../NovelPage/Novel";
import { useState } from "react";

const ModalCollection = ({ setModalOpen, info }) => {

    //모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    }

    //컬렉션 내 소설들 
    //api로 가져올 예정
    const Novel1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "재밌는 소설", "김진수", "4.2", "200", "120", "네이버시리즈", "정통 무협 회귀 판타지!!"]
    const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];





    // 즐겨찾기 상태와 이미지 상태
    const [star, setStar] = useState(false);
    const [starimg, setStarimg] = useState("../IconStarOff.png");

    // 즐겨찾기 함수
    const onClickStar = () => {
        if (star === false) {
            setStar(true);
            setStarimg("../IconStarOn.png");
            console.log("클릭1");
        } else {
            setStar(false);
            setStarimg("../IconStarOff.png");
            console.log("클릭2");
        }
    };

    // 공감 상태와 이미지 상태
    const [like, setLike] = useState(false);
    const [likeimg, setLikeimg] = useState("../IconLike.png");

    // 공감(좋아요) 함수
    const onClickLike = () => {
        if (like === false) {
            setLike(true);
            setLikeimg("../IconLikeOn.png");
            console.log("클릭1");
        } else {
            setLike(false);
            setLikeimg("../IconLike.png");
            console.log("클릭2");
        }
    };


    return (
        <div className="modalbackground">
            <div className="modalframe">
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <h3>{info}</h3>
                    <div style={{ display: 'flex', position: 'absolute', right: '30%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '40px', gap: '5px' }}>
                            <img onClick={onClickStar} src={starimg} style={{ width: '1.8rem', objectFit: 'cover' }}></img>
                            <h3 style={{ fontSize: '1rem' }}>즐겨찾기</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <img onClick={onClickLike} src={likeimg} style={{ width: '1.8rem', objectFit: 'cover' }}></img>
                            <h3 style={{ fontSize: '1rem' }}>공감</h3>
                        </div>
                    </div>
                    <img onClick={closeModal} src="../IconCancel.png" style={{ width: '25px', height: '25px', border: 'none', background: 'none', position: 'absolute', right: '0' }}></img>

                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                </div>

                <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '5%' }}>
                    {
                        novels.map(
                            (novels) =>
                            (<div style={{ width: '140px', height: '270px' }}>
                                <Novel info={novels} key={novels} />
                            </div>

                            )

                        )
                    }
                </div>

            </div>
        </div >
    )
}

export default ModalCollection;