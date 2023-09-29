import { ChainId } from "@decent.xyz/box-hooks";

// For: https://optimistic.etherscan.io/address/0x82bC85aAC5B8192D1EF835A9ae9e4bDb299a57eA
// REMINDER: Need to update the max # NFTs that can be minted per wallet to be unlimited.  More info in the Considerations section of our project spec here: https://decentxyz.notion.site/Unlock-9-1-23-0347ea8f61c64df2991f724bc4ed6c62
export const nftInfo = {
  decentNft: false,
  address: '0x82bC85aAC5B8192D1EF835A9ae9e4bDb299a57eA',
  dstChainId: ChainId.OPTIMISM,
  mintPrice: "0.001",
  maxCap: 1000,
  sellOutDate: 4294967295,
  signature: "function purchase(uint256[] _values, address[] _recipients, address[] _referrers, address[] _keyManagers, bytes[] _data) payable returns (uint256[] tokenIds)"
};