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
  "" = 1,
  "api-optimism" = 10,
  "api-polygon" = 137,
  "api-arbitrum" = 42161,
  "api-base" = 8453
};

export const getNftDetails = async (chainId: number, address: string) => {
  let nftDetails: NftDetails;
  try {
    const url = `https://${Endpoint[chainId]}.reservoir.tools/collections/v6`;
    const { data: contractData } = await axios.get(url, {
      headers: {
        "x-api-key": process.env.RESERVOIR_API_KEY as string,
      },
      params: {
        contract: address
      }
    });
    
    const data = contractData.collections[0];
    console.log(data)

    nftDetails = {
      contract:{
        address: data.primaryContract,
        type: data.contractKind
      },
      metadata: {
        title: data.name,
        description: data.description,
        image: data.image, 
      },
      creator: {
        address: data.creator,
      },
      data: {
        totalSupply: data.tokenCount,
        dateCreated: data.mintedTimestamp
      }
    };
    return nftDetails;
  } catch (e) {
    console.log("error fetching contract data ", e)
  };
};    