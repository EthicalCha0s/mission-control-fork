import ProposalList from "./ProposalList";
import {PageLayout} from "../../components/Layout";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const snapshotClient = new ApolloClient({
  uri: "https://hub.snapshot.org/graphql",
  cache: new InMemoryCache(),
});

const Proposals = () => {
  return (
    <ApolloProvider client={snapshotClient}>
      <PageLayout>
        <ProposalList />
      </PageLayout>
    </ApolloProvider>
  );
};

export default Proposals;
