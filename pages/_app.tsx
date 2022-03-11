import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import MetamaskProvider from '../components/MetaMaskProvider';

function getLibrary(provider) {
  return new Web3(provider)
}



function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary} children={
		<MetamaskProvider>
              <Component {...pageProps} />
		</MetamaskProvider>
    } />
  );
}

export default MyApp