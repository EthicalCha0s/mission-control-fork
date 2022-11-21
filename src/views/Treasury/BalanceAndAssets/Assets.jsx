import Asset from "./Asset";
import ArticleTitle from "../../../components/ArticleTitle";
import {allowedAssets} from '../../../utilities/allowedAssets'
const Assets = ({ tokens }) => {
  return (
    <section className="mt-3 xl:mt-5 flex flex-col">
      <ArticleTitle text={"DAO Assets"} />

      {tokens.filter(token => allowedAssets[token.symbol]).map((token, i) => (
        <Asset key={i} name={token.symbol} amount={token.balance.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          usd={token.usd.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} address={token.address}/>
      ))}
      
    </section>
  );
};

export default Assets;
