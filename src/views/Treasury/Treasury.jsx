import Transactions from "./Transactions/Transactions";
import BalanceAssets from "./BalanceAndAssets/BalanceAssets";
import PageLayout from "../../components/Layout/PageLayout";
import { SectionLayout } from "../../components/Layout";
//Icons for assets have to be handled manually, consider that.
const Treasury = () => {
  return (
    <PageLayout>
      <SectionLayout twoSection>
        <div className="lg:flex lg:justify-around">
          <BalanceAssets />
          <Transactions />
        </div>
      </SectionLayout>
    </PageLayout>
  );
};

export default Treasury;
