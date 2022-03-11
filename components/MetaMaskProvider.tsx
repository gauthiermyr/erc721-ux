import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

function MetamaskProvider({ children }) {
	const injected = new InjectedConnector({}); //support all networks
	const { active: networkActive, error: networkError, activate: activateNetwork, chainId, library } = useWeb3React()
	const [loaded, setLoaded] = useState(false)

	const switchNetwork = async () => {
		try {
			await library?.provider.request({
			  method: "wallet_switchEthereumChain",
			  params: [{ chainId: "0x4" }]
			});
		  } catch (error) {
			alert(error.message);
		  }
	}

	useEffect(() => {
		injected
			.isAuthorized()
			.then((isAuthorized) => {
				setLoaded(true);
				if (isAuthorized && !networkActive && !networkError) {
					activateNetwork(injected)
				}
			})
			.catch(() => {
				setLoaded(true);
			})
	}, [activateNetwork, networkActive, networkError])

	if (loaded && chainId === 4) {
		return children
	}
	else if (loaded && chainId){
		return (<>
		Wrong chain
		<button onClick={() => {
			switchNetwork()
		}}>
			Switch to rinkeby
		</button>
		</>)
	}
	else if (loaded && !chainId){
		return (
		<button onClick={() => {
			activateNetwork(new InjectedConnector({
				supportedChainIds: [4],
			}))
		}}>
			Connect
		</button>)
	}
	return <>Loading</>
}

export default MetamaskProvider
