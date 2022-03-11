import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export default function ChainInfo() {
    const [block, setBlock] = useState(undefined);
	const {chainId, account, library} = useWeb3React();
    library?.eth.getBlockNumber().then((res: any) => setBlock(res));
    

    return (
        <>
            <p>Chain id: {chainId}</p>
            <p>Account: {account}</p>
            <p>Block number: {block ? block : 'Loading...'}</p>
        </>
    )
	
}