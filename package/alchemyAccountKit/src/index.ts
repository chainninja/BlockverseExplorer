import { LightSmartContractAccount, getDefaultLightAccountFactoryAddress } from '@alchemy/aa-accounts';
import { AlchemyProvider } from '@alchemy/aa-alchemy';
import { LocalAccountSigner } from '@alchemy/aa-core';
import { sepolia, Chain } from 'viem/chains';
import { ALCHEMY_API_KEY, PRIVATE_KEY } from './envConfig';

const chain = sepolia as Chain;

// PRIVATE_KEY is the operator's pk
const owner = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

// Create a provider to send user operations from your smart account
const provider = new AlchemyProvider({
  // get your Alchemy API key at https://dashboard.alchemy.com
  apiKey: ALCHEMY_API_KEY,
  chain
}).connect(
  (rpcClient) =>
    new LightSmartContractAccount({
      rpcClient,
      owner,
      chain,
      factoryAddress: getDefaultLightAccountFactoryAddress(chain)
    })
);

(async () => {
  // Fund your account address with ETH to send for the user operations
  // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
  console.log('Smart Account Address: ', await provider.getAddress()); // Log the smart account address -> 0xd0D6bbC929E4B66c6D8990183afBEafC823Ef0bc

  // // Example: Send a user operation to Vitalik Buterin
  // const vitalikAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' as Address;
  // // Send a user operation from your smart account to Vitalik that does nothing
  // const { hash: uoHash } = await provider.sendUserOperation({
  //   target: vitalikAddress, // The desired target contract address
  //   data: '0x', // The desired call data
  //   value: 0n // (Optional) value to send the target contract address
  // });

  // console.log('UserOperation Hash: ', uoHash); // Log the user operation hash -> 0x6f1da4c0d867b2397e5d5bf0928192dbc35b352f22453673d3fa3e6610196e34
  // const txHash = await provider.waitForUserOperationTransaction(uoHash);
  // console.log('Transaction Hash: ', txHash); // Log the transaction hash -> 0xfbec63e67e99c590fb7bdeb44b4f3f38ef57ce002272d1014ccbc1f3ba34a20b
})();
