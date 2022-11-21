import AssetSkeletons from "../../../components/Skeletons/AssetSkeletons";
import Assets from "./Assets";
import TreasuryBalance from "./TreasuryBalance";
import { errorToast } from "../../../utilities/errorToast";
import { useAssets } from "../../../api/useAssets";

const BalanceAssets = () => {
  const { tokens, isLoaded, balanceSum, error } = useAssets();

  if (error) errorToast("Connection with Etherscan failed. Click the link below to see MoonDAO assets.");

  return (
    <section className="xl:w-[40%] xl:max-w-[600px]">
      {!isLoaded || error ? (
        <AssetSkeletons />
      ) : (
        <>
          <TreasuryBalance balance={balanceSum} />
          <Assets tokens={tokens} />
        </>
      )}

      <a
        className="mt-10 inline-block font-Montserrat text-xl text-slate-800 underline decoration-amber-600 decoration-2 hover:text-black hover:decoration-[3px] dark:text-moon-gold dark:decoration-moon-gold dark:hover:text-amber-200 xl:text-[22px]"
        href="https://etherscan.io/address/0xce4a1E86a5c47CD677338f53DA22A91d85cab2c9"
        target="_blank"
      >
        View MoonDAO on Etherscan
      </a>
    </section>
  );
};

export default BalanceAssets;
