import axios from "axios";
import { NftDetails } from "./types/NftDetails";
import getIpfsLink from "./getIpfsLink";

export const getDecentNftDetails = async (chainId: number, address: string) => {
  let nftDetails: NftDetails;
  try {
    const url = `https://hq.decent.xyz/api/1.0/contracts/${chainId}/${address}`;
    const { data: contractData } = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_DECENT_API_KEY}`
      }
    });
    nftDetails = {
      contract:{
        address: contractData.address,
        type: contractData.type
      },
      metadata: {
        title: contractData.data.name,
        symbol: contractData.data.symbol,
        description: contractData.metadata.description,
        media: getIpfsLink(contractData.metadata?.animation_url) || "",
        image: getIpfsLink(contractData.metadata.image),
        mimeType: contractData.mimeType 
      },
      creator: {
        address: contractData.creator.address,
        ensName: contractData.creator.ensName,
      },
      saleTimes: {
        presaleStart: contractData.data.presaleStart,
        presaleEnd: contractData.data.presaleEnd,
        saleStart: contractData.data.saleStart,
        saleEnd: contractData.data.saleEnd,
      },
      data: {
        maxTokens: contractData.data.MAX_TOKENS,
        totalSupply: contractData.data.totalSupply,
        dateCreated: contractData.timestamp
      }
    };
    return nftDetails;
  } catch (e) {
    console.log("error fetching contract data ", e);
  }
}

enum Endpoint {
  "eth" = 1,
  "opt" = 10,
  "polygon" = 137,
  "arb" = 42161
}

export const getNftDetails = async (chainId: number, address: string) => {
  let nftDetails: NftDetails;
  try {
    const url = `https://${Endpoint[chainId]}-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${address}&tokenId=0`;
    const { data: contractData } = await axios.get(url, {
      headers: {
        accept: 'application/json',
      }
    });
    nftDetails = {
      contract:{
        address: contractData.contract.address,
        type: contractData.id.tokenMetadata.tokenType
      },
      metadata: {
        title: contractData.title,
        symbol: contractData.contractMetadata.symbol || null,
        description: contractData.description,
        image: contractData.media[0].gateway || null,
        media: contractData.media[0].gateway || null,
        mimeType: contractData.media[0].format || null
      },
      data: {
        totalSupply: contractData.contractMetadata.totalSupply || null,
        dateCreated: contractData.timeLastUpdated
      }
    };
    return nftDetails;
  } catch (e) {
    console.log("error fetching contract data ", e)
  };
};  