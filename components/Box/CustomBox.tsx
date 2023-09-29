import { BoxHooksContextProvider } from "@decent.xyz/box-hooks";
import { ClientRendered } from "@decent.xyz/box-ui";
import MintButton from "./BoxHooks";
import SourceSelectors from "./BoxUi";
import { useSourceContext } from "./contexts/SourceContext";
import { useNetwork } from "wagmi";

const CustomBox = () => {
  const { srcChainId } = useSourceContext();
  const { chain } = useNetwork();

  return (
    <BoxHooksContextProvider apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}>
      <ClientRendered>
        Test
        <SourceSelectors />
        <MintButton />
      </ClientRendered>
    </BoxHooksContextProvider>
  )
}

export default CustomBox;