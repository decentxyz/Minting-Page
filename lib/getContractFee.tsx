// Many contracts and protocols have mint fees that will not be included in the tokenPrice but must be added to the fully-weighted cost for txns to process. Recommend adding protocol fees to this page & swapping out the array in the lookup function based on contract type.  If your contract does not have a fee, just delete the addition of a fee from The Box's cost property.
const DecentFees = [
  {chainId: 1, fee: 0.00077},
  {chainId: 10, fee: 0.00044},
  {chainId: 137, fee: 0.81},
  {chainId: 42161, fee: 0.00044}
]

export function getContractFee(chainId: number) {
  let fee = DecentFees.find(fee => fee.chainId === chainId)?.fee;
  return fee;
}