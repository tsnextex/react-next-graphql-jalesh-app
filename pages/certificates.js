import React from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import scrollTo from "../utils/scrollTo";
import apolloClient, {
  GET_ALL_ROUTES,
  serverApolloClient,
} from "../store/ApolloClient";
import UserContext from "../store/UserContext";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import FooterView from "../components/Footer/Footer";
import View from "../components/View/View";
import SelectorButton from "../components/Button/SelectorButton";
import Button, { ArrowLinkButton } from "../components/Button/Button";
import RoutesView from "../components/RoutesView/RoutesView";
import goTo from "../utils/goTo";

export default function CertificatesPage({ routes, itinerariesList }) {
  const router = useRouter();
  const [user, setUser] = React.useContext(UserContext);
  const [nightCount, setNightCount] = React.useState(0);
  const [jurisdiction, setJurisdiction] = React.useState(null);

  const onFlexiClick = () => {
    setUser(
      Object.assign({}, user, {
        booking: {
          itinerary: null,
          route: null,
          nightCount,
          jurisdiction,
        },
      })
    );
    goTo(router, "/booking")();
  };

  const byNight = {};
  itinerariesList.forEach((i) => {
    // block
    if (!byNight[i.nightCount]) byNight[i.nightCount] = {};
    const block = byNight[i.nightCount];

    // Route
    if (!block[i.routeID])
      block[i.routeID] = Object.assign({}, routes[i.routeID], {
        itineraries: [],
      });

    block[i.routeID].itineraries.push(i);
  });

  const keys = Object.keys(byNight);
  keys.sort();

  return (
    <Layout title="Jalesh Cruises">
      <Header
        style={{
          backgroundImage: 'url("/images/calendar.jpg")',
          height: 285,
        }}
        light
      />
      <main className="bg-auto">
        <View
          title={
            <>
              <b>Flexibility</b> when you need it
            </>
          }
        >
          <h2 className="text-j-gray mb-4">What do you need?</h2>
          <SelectorButton
            fullWidth
            bordered
            className="mb-5 text-j-magenta"
            onClick={() => scrollTo("flexi-cruise")}
          >
            Flexible cruise route and date
          </SelectorButton>
          <SelectorButton
            fullWidth
            bordered
            className="mb-32 text-j-magenta"
            onClick={() => scrollTo("flexi-date")}
          >
            Flexible cruise date
          </SelectorButton>
        </View>
        <View
          theme="magenta"
          description="cruise certificate"
          title="Flexi Cruise"
          id="flexi-cruise"
        >
          <h4>
            Save by purchasing a{" "}
            <b className="font-medium">Flexi Cruise certificate</b> now.
          </h4>
          <p className="leading-6">
            With Flexi Cruise, you can decide your{" "}
            <b className="font-medium">cruise route</b> and{" "}
            <b className="font-medium">cruise date</b> later.
          </p>
          <ArrowLinkButton className="my-10 text-j-white">
            Terms & Conditions
          </ArrowLinkButton>

          <div className="rounded-big px-5 py-12 bg-j-blue-lighter text-j-black">
            <h4 className="text-j-gray pb-4">Choose cruise duration</h4>

            <SelectorButton
              fullWidth
              bordered
              className="mb-5"
              inverted={nightCount === 2}
              onClick={() => setNightCount(2)}
            >
              Any 2-night cruise
            </SelectorButton>
            <SelectorButton
              fullWidth
              bordered
              className="mb-5"
              inverted={nightCount === 3}
              onClick={() => setNightCount(3)}
            >
              Any 3-night cruise
            </SelectorButton>
            <SelectorButton
              fullWidth
              bordered
              className="mb-5"
              inverted={nightCount === 5}
              onClick={() => setNightCount(5)}
            >
              Any 5-night cruise
            </SelectorButton>

            <h4 className="text-j-gray py-4">Choose cruise jurisdiction</h4>

            <SelectorButton
              fullWidth
              bordered
              className="mb-5"
              inverted={jurisdiction === "domestic"}
              onClick={() => setJurisdiction("domestic")}
            >
              Any domestic route
            </SelectorButton>
            <SelectorButton
              fullWidth
              bordered
              className="mb-5"
              inverted={jurisdiction === "international"}
              onClick={() => setJurisdiction("intl.")}
            >
              Any international route
            </SelectorButton>
            <Button
              disabled={!(nightCount && jurisdiction)}
              center
              className={cx("w-full text-j-white mt-10", {
                "bg-j-magenta": nightCount && jurisdiction,
                "bg-j-gray-lighter": !(nightCount && jurisdiction),
              })}
              onClick={onFlexiClick}
            >
              Calculate Price
            </Button>
          </div>
        </View>
        <View
          description="cruise certificate"
          title="Flexi Date"
          id="flexi-date"
        >
          <h4>
            Save by purchasing a{" "}
            <b className="font-medium">Flexi Date certificate</b> now.
          </h4>
          <p className="leading-6">
            With Flexi Date, you can decide your{" "}
            <b className="font-medium text-j-magenta">cruise date</b> later.
          </p>
          <ArrowLinkButton className="my-10 text-j-magenta">
            Terms & Conditions
          </ArrowLinkButton>
          <h4 className="text-j-gray pb-10">Choose a cruise route</h4>
          {keys.map((key) => (
            <RoutesView
              key={key}
              nightCount={key}
              routes={byNight[key]}
              light
            />
          ))}
        </View>
      </main>
      <footer>
        <FooterView />
      </footer>
    </Layout>
  );
}

CertificatesPage.getInitialProps = async () => {
  const client =
    typeof window === "undefined" ? serverApolloClient : apolloClient;

  // Get routes
  const {
    data: { routes: routesList },
  } = await client.query({
    query: GET_ALL_ROUTES,
  });
  const routes = {};
  routesList.forEach((r) => (routes[r.id] = r));

  // Get itineraries
  const itineraries = {};
  routesList.forEach((route) =>
    route.itineraries.forEach((i) => (itineraries[i.id] = i))
  );

  return {
    routes,
    routesList,
    itineraries,
    itinerariesList: Object.values(itineraries),
  };
};
