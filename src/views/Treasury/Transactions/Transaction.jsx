import { ArrowDown, ArrowUp, GoldPaperArrow } from "../../../assets";
import { getHumanTime } from "../../../utilities/getHumanTime";
import { transactionTokenDict as dict } from "../../../utilities/transactionTokenDict";

const MULTISIG_ADDRESS = "0xce4a1E86a5c47CD677338f53DA22A91d85cab2c9";

const Transaction = ({ data, loading }) => {
  const transactionLink = `https://etherscan.io/tx/${data.hash}`;
  const timeStr = getHumanTime((Math.floor(Date.now() / 1000) - data.timeStamp) * 1000);
  const token = data.value / 10 ** data.tokenDecimal;
  const sent = data.from == MULTISIG_ADDRESS.toLocaleLowerCase();
  const value = `${token
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${dict[data.tokenName] ? dict[data.tokenName] : data.tokenSymbol}`;

  return (
    <div
      className={`component-background relative mt-5 flex w-[336px] flex-col items-center rounded-[15px] border-[0.5px] border-gray-300 py-2 shadow-md shadow-blue-300 hover:scale-105 dark:shadow-indigo-200 sm:w-[400px]  xl:w-full xl:flex-row xl:justify-between xl:px-5 xl:py-3 ${
        loading && "loading-component"
      }`}
    >
      <div className="relative right-3 flex items-center">
        <span className={`${loading && "loading-line"}`}>{loading ? "" : sent ? <ArrowUp /> : <ArrowDown />}</span>
        <p className={`text ml-3 font-Montserrat text-xl font-semibold text-amber-600 dark:text-moon-gold ${loading && "loading-line"}`}>{sent ? "Sent" : "Received"}</p>
      </div>

      <p
        className={`mt-2 block truncate bg-gradient-to-r from-slate-900 to-stone-900 bg-clip-text text-lg font-bold text-transparent opacity-80 dark:from-purple-100 dark:to-indigo-100 dark:opacity-100 xl:mt-0 xl:max-w-[43%] xl:hover:overflow-visible xl:hover:whitespace-pre xl:hover:text-center 2xl:text-xl`}
      >
        <span className={`${loading && "loading-line"}`}>{value}</span>
      </p>

      <div className="mt-2 flex items-center xl:mt-0">
        <p className={`font-semibold opacity-80 dark:text-gray-100 dark:opacity-70 ${loading && "loading-line"}`}>{timeStr} ago</p>
        {!loading && (
          <a aria-label="Link to transaction information on Etherscan" className={`ml-2 block`} href={transactionLink} target="_blank">
            <GoldPaperArrow loading={loading} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Transaction;
