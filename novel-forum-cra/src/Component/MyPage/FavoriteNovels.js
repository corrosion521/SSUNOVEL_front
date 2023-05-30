import Novel from "../NovelPage/Novel";

const FavoriteNovels = ({novels}) => {

    return (
        <div className="my-contents-list" >
                {
                    novels
                        .map(
                            (novel) =>
                            (
                                <div style={{ fontSize: '0.6rem', width: '17%', height: '230px' }}>
                                    <Novel info={novel} key={novel} />
                                </div>
                            )
                        )
                }
            </div>
    );
}

export default FavoriteNovels;