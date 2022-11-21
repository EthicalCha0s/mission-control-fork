import TransactionSkeletons from "../../../components/Skeletons/TransactionSkeletons";
import Transaction from "./Transaction";
import TransactionCaret from "./TransactionCaret";
import { PaginationContainer, Line } from "../../../components/Layout";
import LinkButton from "../../../components/LinkButton";
import Header from "../../../components/Header";
import { errorToast } from "../../../utilities/errorToast";
import { useTransactions } from "../../../api/useTransactions";
import TransactionPagination from "./TransactionPagination";

import { useState } from "react";

const WalletTransactions = () => {
  const [page, setPage] = useState(1);
  const pageMax = 697;
  const { transactions, isLoaded, error } = useTransactions(page);

  if (error) errorToast("Connection with Etherscan failed. Contact MoonDAO if the problem persists 🚀");

  return (
    <section className="mt-12 lg:mt-0 xl:w-[45%] xl:max-w-[700px]">
      <div className="flex flex-row items-center justify-between">
        <Header text="Transactions" noStar />
        <div className="hidden treasury:block">
          <LinkButton text={"Gnosis"} link={"https://gnosis-safe.io/app/eth:0xce4a1E86a5c47CD677338f53DA22A91d85cab2c9/home"} img={"/coins/SAFE.png"} />
        </div>
      </div>

      <Line />

      <div className="mt-10">{!isLoaded || error ? <TransactionSkeletons /> : transactions.map((e, i) => <Transaction key={i} data={e} />)}</div>

      <PaginationContainer>
        <TransactionCaret left page={page} pageMax={pageMax} setPage={setPage} isLoaded={isLoaded} />
        {page <= 3
          ? [1, 2, 3, 4, 5].map((e, i) => <TransactionPagination key={i} currentPage={page} pageNumber={e} setPage={setPage} pageMax={pageMax} isLoaded={isLoaded} />)
          : page >= pageMax - 2
          ? [pageMax - 4, pageMax - 3, pageMax - 2, pageMax - 1, pageMax].map((e, i) => (
              <TransactionPagination key={i} currentPage={page} pageNumber={e} setPage={setPage} pageMax={pageMax} isLoaded={isLoaded} />
            ))
          : [page - 2, page - 1, page, page + 1, page + 2].map((e, i) => (
              <TransactionPagination key={i} currentPage={page} pageNumber={e} setPage={setPage} pageMax={pageMax} isLoaded={isLoaded} />
            ))}
        <TransactionCaret page={page} pageMax={pageMax} setPage={setPage} isLoaded={isLoaded} />
      </PaginationContainer>
    </section>
  );
};

export default WalletTransactions;
