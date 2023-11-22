import { ethers } from 'ethers';
import { signTypedData, Address } from '@wagmi/core';

export const signMultiWriteToDisc = async (
  contract: Address,
  tokenIds: bigint[],
  songSelections: bigint[],
  nonce: bigint,
  chainId: bigint
): Promise<string | null> => { 
  const salt = ethers.solidityPacked(['uint256'], [chainId]) as any;

  const domain = {
    name: 'songcamp',
    version: '1',
    salt: salt, 
    verifyingContract: contract,
  } as const;

  console.log('generated domain', domain);

  const types = {
    MultiWriteToDiscSignature: [
      { name: 'tokenIds', type: 'uint256[]' },
      { name: 'songSelections', type: 'uint256[]' },
      { name: 'nonce', type: 'uint256' },
    ],
  } as const;

  console.log('nonce', nonce);

  const message = {
    tokenIds: tokenIds,
    songSelections: songSelections,
    nonce: nonce,
  };

  try {
    const sig = await signTypedData({
      domain,
      message,
      primaryType: 'MultiWriteToDiscSignature',
      types,
    })
    console.log('made sig', sig); 
    return sig;
  } catch (e) {
    console.log('error signing', e);
    return null;
  }
};
