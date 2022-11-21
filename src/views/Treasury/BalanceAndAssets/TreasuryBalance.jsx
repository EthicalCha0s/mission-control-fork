import { TreasuryLogo } from "../../../assets";
import Header from "../../../components/Header";
import { Line } from "../../../components/Layout";

const TreasuryBalance = ({ balance, loading }) => {
  return (
    <div className="flex flex-col">
      <TreasuryLogo />
      <div className="mt-2 xl:mt-0">
        <Header text={"Treasury"} />
      </div>
      <h2 className={`mt-4 xl:mt-7 truncate font-Montserrat text-[38px] font-extrabold opacity-70 dark:text-white dark:opacity-100 xl:text-5xl 2xl:text-6xl ${loading && "loading-line"}`}>${balance}</h2>
      <Line />
    </div>
  );
};

export default TreasuryBalance;
