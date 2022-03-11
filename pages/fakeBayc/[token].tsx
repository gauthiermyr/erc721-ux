import { useWeb3React } from '@web3-react/core';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { address, ABI } from '../../constants/FakeBAYC';
import { useEffect, useState } from 'react';
import { BigNumber } from "@ethersproject/bignumber";
import { useRouter } from 'next/router';
import axios from 'redaxios';

const ifpsGateway = 'https://ipfs.io/ipfs';

export default function fakeBaycToken() {
    const { query } = useRouter()
    const {token} = query;

    const {account, library} = useWeb3React(); 
    const [asset, setAsset] = useState<any>(undefined)
	const getData =async () => {
        if(account) {
            const signer = await library.getSigner();
            const contract = new Contract(address, ABI, signer);
            const uri = await contract.tokenURI(token);

            const {data} = await axios.get(uri);
            
            const imgCID = data.image.replace('ipfs://', '');
            const image = `${ifpsGateway}/${imgCID}`;

            setAsset({
                image,
                attributes: data.attributes
            });

        }
    }


    useEffect(() => {
        getData();
    }, [account]);

    if(!asset) return <>Loading: please wait, pinata is rekt</>
    return (
        <>
            <img src={asset.image}></img>
        </>
    );
}