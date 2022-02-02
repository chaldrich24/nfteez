import React from "react";
import Nft from '../components/Nft';
import { useQuery } from '@apollo/client';
import { QUERY_NFTS } from "../utils/queries";





const Home = () => {
    const { loading, data } = useQuery(QUERY_NFTS);
    const nfts = data?.nfts || [];
    console.log(nfts);




    function getRandomPair() {
        const nftIndexes = [];

        const first = (Math.floor(Math.random() * nfts.length));
        let second = (Math.floor(Math.random() * nfts.length));

        if (first === second) {
            second = (Math.floor(Math.random() * nfts.length));
        }

        nftIndexes.push(first, second);

        return nftIndexes;
    }

    

    const generatedIndexes = getRandomPair();

    

    return (
        <main>
            <div className='container'>
                <h2 className='row display-3 justify-content-center mb-5'>Which is better?</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="row">
                        <div className="col" >
                            <Nft nft={nfts[generatedIndexes[0]]} />
                        </div>
                        <div className="col">
                            <Nft nft={nfts[generatedIndexes[1]]} />
                        </div>
                    </div>
    
                )}
                <p className='mt-4 new-pair' onClick={() => window.location.reload(false)}>Generate New Pair</p>
            </div>
        </main>
    )
}

export default Home;