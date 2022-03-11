import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

function MetamaskProvider({ children }) {
	const injected = new InjectedConnector({
		supportedChainIds: [4],
	})
	const { active: networkActive, error: networkError, activate: activateNetwork, chainId } = useWeb3React()
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		injected
			.isAuthorized()
			.then((isAuthorized) => {
				setLoaded(true)
				if (isAuthorized && !networkActive && !networkError) {
				activateNetwork(injected)
		}
	})
	.catch(() => {
		setLoaded(true)
		})
		}, [activateNetwork, networkActive, networkError])
	if (loaded && chainId === 4) {
		return children
	}
	else if (loaded && chainId !== 4){
		return <div>Wrong chain</div>
	}
	return <>Loading</>
}

export default MetamaskProvider
