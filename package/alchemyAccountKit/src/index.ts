import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { LocalAccountSigner, sepolia, Address } from '@alchemy/aa-core';

import { ALCHEMY_API_KEY, PRIVATE_KEY } from './envConfig';

const chain = sepolia;

// The private key of your EOA that will be the signer to connect with the Modular Account
const signer = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

// Create a smart account client to send user operations from your smart account
const client = await createModularAccountAlchemyClient({
  // get your Alchemy API key at https://dashboard.alchemy.com
  apiKey: ALCHEMY_API_KEY,
  chain,
  signer
});

(async () => {
  // Fund your account address with ETH to send for the user operations
  // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
  console.log('Smart Account Address: ', await client.getAddress()); // Log the smart account address -> 0x91279058F4021ecB1664534B1F1DC0c79dc0D3ab

  const vitalikAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' as Address;
  // Send a user operation from your smart account to Vitalik that does nothing
  const { hash: uoHash } = await client.sendUserOperation({
    uo: {
      target: vitalikAddress, // The desired target contract address
      data: '0x', // The desired call data
      value: 0n // (Optional) value to send the target contract address
    }
  });

  console.log('UserOperation Hash: ', uoHash); // Log the user operation hash -> 0x8688ee10ec5f529011092c6340b2ffb98b464fac9e7a9ae9ccfeca0afa57db30

  // Wait for the user operation to be mined
  const txHash = await client.waitForUserOperationTransaction({
    hash: uoHash
  });

  console.log('Transaction Hash: ', txHash); // Log the transaction hash -> 0x8a067e931a6811f5bfda668087bbfe7ea981c1a56d06ca18885c36ef9c519993
})();
