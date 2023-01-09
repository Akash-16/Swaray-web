import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const ConnectWallet = new WalletConnectConnector({
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org',
  rpc: {
    80001: 'https://rpc-mumbai.maticvigil.com/v1/64f795a11900e3e9c4c052bbb3cfde60f7311f55'
  }
});
