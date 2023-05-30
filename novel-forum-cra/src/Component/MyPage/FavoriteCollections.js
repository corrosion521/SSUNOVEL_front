import Collection from "../CollectionPage/Collection";

const FavoritesCollections = ({collections}) => {
    return (
        <div className="my-contents-list" >
                {
                    collections
                        .map(
                            (collections) =>
                            (
                                <div style={{ fontSize: '0.6rem', width: '17%', height: '300px' }}>
                                    <Collection info={collections} key={collections} />
                                </div>
                            )
                        )
                }
            </div>
    );
}

export default FavoritesCollections;