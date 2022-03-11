import { useWeb3React } from '@web3-react/core';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { address, ABI } from '../../constants/FakeBAYC';
import { useEffect, useState } from 'react';
import { BigNumber } from "@ethersproject/bignumber";



export default function fakeBayc() {

    const {account, library} = useWeb3React(); 
    const [collection, setCollection] = useState<any>(undefined)
	const getData =async () => {
        if(account) {
            const signer = await library.getSigner();
            const contract = new Contract(address, ABI, signer);
            const name = await contract.name();
            const supply = await contract.totalSupply();
            setCollection({name, supply: supply.toString()})
        }
    }

    const mint = async () => {
        try{
            if(account) {
                const signer = await library.getSigner();
                const contract = new Contract(address, ABI, signer);
               
                await (await contract.claimAToken()).wait();
                alert('Success')
                getData();
            }
        }
        catch(err){}
    }

    useEffect(() => {
        getData();
    }, [account]);

    if(! collection) return <>Loading</>
    return (
        <>
        <div>{collection.name}: {collection.supply} tokens</div>
        <button onClick={mint}>Mint</button>
        </>
    );
}