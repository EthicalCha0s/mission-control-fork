import { coinDictionary } from "../../../utilities/coinDictionary";

const Asset = ({ name, amount, usd, address, loading }) => {
  const assetLink = address ? `https://etherscan.io/address/${address}` : "";
  const image = coinDictionary[name] ? `/coins/${name}.${coinDictionary[name]}` : "/coins/DEFAULT.png"

  return (
    <div className={`mt-5  component-background flex xl:mt-6 w-[336px] flex-col xl:flex-row items-center xl:justify-between xl:px-7 py-1 xl:py-2 rounded-sm border-[0.5px] border-gray-300  sm:w-[400px] lg:w-[336px] xl:w-full  ${loading && "loading-component"}`}>

<div className="rounded-sm -z-10 blur-background"></div>

      
      <div className="mt-1 flex items-center relative">
        {loading? <div className="rounded-full loading-line w-8 h-8"></div> : <img className="w-7 xl:w-8 h-auto" src={image} alt="Asset Logo."/>}
      <a href={assetLink} className={`ml-3 xl:ml-4 font-Montserrat text-lg xl:text-xl font-semibold text-amber-600 dark:text-moon-gold hover:scale-110 ${loading && "loading-line"}`}>{name}</a>
      </div>

      <div className="mt-3 text-center xl:mt-0 xl:text-right">
        <p className={`text-[24px] font-bold text-transparent opacity-80 dark:from-purple-100 dark:to-indigo-100 dark:opacity-100 ${loading ? "loading-line" : "bg-clip-text bg-gradient-to-r from-slate-900  to-stone-900"}`}>
          {amount}
        </p>
        <p className={`mt-2 xl:mt-3 opacity-70 dark:text-white dark:opacity-80 ${loading && "loading-line"}`}>${usd}</p>
      </div>


    </div>
  );
};

export default Asset;
