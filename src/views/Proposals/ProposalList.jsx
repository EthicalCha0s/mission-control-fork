import Proposal from "./Proposal";
import ProposalSkeletons from "../../components/Skeletons/ProposalSkeletons";
import Header from "../../components/Header";
import LinkButton from "../../components/LinkButton";
import { SectionLayout, Line, PaginationContainer } from "../../components/Layout";
import { useQuery } from "@apollo/client";
import { PROPOSALS_QUERY } from "../../api/proposalsGQL";
import { errorToast } from "../../utilities/errorToast";
import { useState } from "react";
import PaginationButton from "./PaginationButton";
import CaretButton from "./CaretButton";

const ProposalList = () => {
  const [skip, setSkip] = useState(0);
  const pages = [...Array(5)];
  const { data, loading, error } = useQuery(PROPOSALS_QUERY, {
    variables: { skip: skip },
  });

  if (error) errorToast("Connection failed. Contact MoonDAO discord if the problem persists 🚀");

  return (
    <SectionLayout>
      <div className="flex flex-row justify-between items-center">
        <Header text={"Proposals"} id="top" />
        <div className="hidden lg:block">
          <LinkButton text={"Snapshot"} img={"/snapshot-icon.png"} link={"https://snapshot.org/#/tomoondao.eth"} />
        </div>
      </div>

      <Line />
      <div className="my-3 lg:hidden">
        <p className="text-lg font-semibold text-emerald-900 dark:text-gray-100">Click the proposal's title to read more.</p>
      </div>

      {loading || error ? (
        <ProposalSkeletons />
      ) : (
        data?.proposals.map((e, i) => (
          <Proposal key={e.id} idx={i} proposalId={e.id} title={e.title} author={e.author} state={e.state} startTime={e.start} endTime={e.end} body={e.body} />
        ))
      )}

      <PaginationContainer>
        <CaretButton left skip={skip} setSkip={setSkip} scrollUp />
        {pages.map((e, i) => (
          <PaginationButton page={i} key={i} skip={skip} setSkip={setSkip} scrollUp />
        ))}
        <CaretButton skip={skip} setSkip={setSkip} total={(pages.length - 1) * 10} scrollUp />
      </PaginationContainer>
    </SectionLayout>
  );
};

export default ProposalList;
