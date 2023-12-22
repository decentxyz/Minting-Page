import { ChainId } from "@decent.xyz/box-common";

export const defaultAvailableChains = [
  ChainId.ETHEREUM,
  ChainId.OPTIMISM,
  ChainId.ARBITRUM,
  ChainId.POLYGON,
  ChainId.BASE,
  ChainId.AVALANCHE,
];

export function getChainIcon(chainId: ChainId | number) {
  switch (chainId) {
    case (ChainId.ETHEREUM):
      return '/ethereum.svg';
    case (ChainId.OPTIMISM):
      return '/optimism.svg';
    case (ChainId.ARBITRUM):
      return '/arbitrum.svg';
    case (ChainId.POLYGON):
      return '/polygon.svg';
    case (ChainId.BASE):
      return '/base.png';
    case (ChainId.AVALANCHE):
      return '/avalanche.svg';
  }
}