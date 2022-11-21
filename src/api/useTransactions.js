import { useState, useEffect } from "react";

export const useTransactions = (page = 1) => {
  // MoonDAO Multsig Wallet address.
  const MULTISIG_ADDRESS = "0xce4a1E86a5c47CD677338f53DA22A91d85cab2c9";
  const ETHERSCAN_API_BASE = "https://api.etherscan.io/api";
  const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const url = ETHERSCAN_API_BASE + `?module=account&action=tokentx&address=${MULTISIG_ADDRESS}` + `&page=${page}` + `&offset=10` + `&sort=desc` + `&apikey=${ETHERSCAN_API_KEY}`;

  useEffect(() => {
    setIsLoaded(false)
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTransactions(result.result);
        },
        (error) => setError(error)
      );
  }, [page]);

  return { transactions, isLoaded, error };
};
