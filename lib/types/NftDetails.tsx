import { BigNumber } from "ethers";

export interface NftDetails {
  contract: {
    address: string,
    type?: string,
  },
  metadata: {
    title: string,
    symbol?: string,
    description: string,
    media?: string,
    image: string,
    mimeType?: string
  },
  creator?: {
    address: string,
    ensName?: string
  },
  saleTimes?: { // Only fulfilled by Decent API request
    presaleStart?: string, // timestamp
    presaleEnd?: string, // timestamp
    saleStart?: string, // timestamp
    saleEnd?: string, // timestamp
    presaleMerkleRoot?: string
  },
  data: {
    maxTokens?: number,
    totalSupply?: number,
    dateCreated: string // timestamp
  };
};