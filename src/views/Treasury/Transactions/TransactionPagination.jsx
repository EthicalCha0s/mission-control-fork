const TransactionPagination = ({ currentPage, pageNumber, setPage, isLoaded }) => {
  const samePage = currentPage === pageNumber;
  return (
    <button
      disabled={samePage || !isLoaded}
      name={`Go to page ${pageNumber}`}
      className={` h-[40px] w-[40px] border border-blue-600 text-center text-xl font-semibold hover:scale-105 dark:border-indigo-100 ${
        samePage ? "scale-125 bg-blue-600 text-white dark:bg-slate-900 dark:text-white" : "bg-white text-slate-800 dark:bg-indigo-100 dark:text-slate-900"
      }`}
      onClick={() => {
        setPage(pageNumber);
      }}
    >
      {pageNumber}
    </button>
  );
};

export default TransactionPagination;
