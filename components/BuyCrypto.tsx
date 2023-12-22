import { Address } from "viem"

const BuyCrypto = (props:any) => {

  return (
    <>
      <div className="bg-white drop-shadow-md font-medium py-2 px-4 rounded-md" style={{ display: 'flex', gap: 12 }}>
        <div
          style={{ display: 'flex', alignItems: 'center' }}
        >
            <img
              alt={'Chain icon'}
              src={'/op-icon.svg'}
              style={{ width: 24, height: 24 }}
            />
        </div>

        <a 
          href={`https://checkout.decent.xyz/?app=onramp&chain=10&wallet=${props.account}`}
          className="hover:opacity-80" 
          type="button" 
          target="_blank">
          Buy Crypto
        </a>
      </div>
    </>
  )
}

export default BuyCrypto