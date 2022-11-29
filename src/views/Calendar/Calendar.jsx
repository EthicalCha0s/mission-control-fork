import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import EventCalendar from "./EventCalendar";

const snapshotClient = new ApolloClient({
  uri: "https://hub.snapshot.org/graphql",
  cache: new InMemoryCache(),
});

const Calendar = () => {
  return (
    <ApolloProvider client={snapshotClient}>
      {/* Calendar here? */}
      <EventCalendar />
    </ApolloProvider>
  );
};

export default Calendar;
