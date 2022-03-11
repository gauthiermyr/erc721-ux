import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector';

export default function Index() {

	const {activate, active, account} = useWeb3React();

	if(!active) {
		return (
			<button onClick={() => {
				activate(new InjectedConnector({
					supportedChainIds: [4],
				}))
			}}>
				Connect
			</button>
		)
	}
	else{
		return (
		<div>{account}</div>
		)
	}
	
}
