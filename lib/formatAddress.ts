import { Address } from "viem";

export const formatAddress = (address: Address) => {
  if (address) {
    return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
  } else {
    return "Contract";
  }
}