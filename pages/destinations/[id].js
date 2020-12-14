import React, { useState } from "react";
import moment from "moment";
import cx from "classnames";
import apolloClient, {
  GET_DESTINATION,
  GET_DESTINATIONS,
  GET_ITINERARIES,
  GET_ROUTES,
  serverApolloClient,
} from "../../store/ApolloClient";
import scrollTo from "../../utils/scrollTo";
import CDN from "../../utils/cdn";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import FooterView from "../../components/Footer/Footer";
import View from "../../components/View/View";
import RangeCalendar from "../../components/RangeCalendar/RangeCalendar";
import Button from "../../components/Button/Button";
import GroupsView from "../../components/views/Groups";
import QuickDestinationsView from "../../components/views/QuickDestinations";
import HistoryView from "../../components/views/History";
import ExcursionsView from "../../components/views/Excursions";
import CultureView from "../../components/views/Culture";
import FoodView from "../../components/views/Food";
import RoutesView from "../../components/RoutesView/RoutesView";

import styles from "./index.module.scss";

export default function Destination({ destination, routes, itinerariesList }) {
  if (!destination) {
    return <div></div>;
  }

  const {
    destination: { details, history, culture, foods, excursions },
  } = destination;

  const itineraries = itinerariesList.map((i) =>
    Object.assign({}, i, {
      startTime: moment(i.startTime).startOf("day"),
      endTime: moment(i.endTime).startOf("day"),
    })
  );

  return (
    <Layout title="Jalesh Cruises">
      <Header
        className="bg-j-magenta text-j-white"
        style={{
          height: "60vh",
          backgroundImage: `url("${CDN(details.imageUrl)}")`,
          textShadow: "text-shadow: 0px 3px 6px #00000080",
        }}
      >
        <div className="flex flex-col justify-center pt-32 pb-4">
          <h1>{destination.city}</h1>
          <h2>{details.slogan}</h2>
        </div>
      </Header>
      <main className="bg-auto">
        <ItinerariesView itineraries={itineraries} routes={routes} />
        <HistoryView {...history} />
        <ExcursionsView excursions={excursions} />
        <CultureView {...culture} />
        <FoodView {...foods} />
        {/*
        // TODO: Missing content
        <GroupsView />
        */}
        <QuickDestinationsView />
      </main>
      <footer>
        <FooterView showPromoBanner />
      </footer>
    </Layout>
  );
}

export async function getStaticProps({ params: { id } }) {
  const client =
    typeof window === "undefined" ? serverApolloClient : apolloClient;

  // Get Destination
  const {
    data: { destination },
  } = await client.query({
    query: GET_DESTINATION,
    variables: {
      portCode: id,
    },
  });

  // Get itineraries
  const {
    data: { itineraries: itinerariesList },
  } = await client.query({
    query: GET_ITINERARIES,
    variables: {
      portCode: id,
    },
  });

  // Get routes
  const {
    data: { routes: routesList },
  } = await client.query({
    query: GET_ROUTES,
    variables: {
      portCode: id,
    },
  });
  const routes = {};
  routesList.forEach((r) => (routes[r.id] = r));

  return {
    props: { destination, routes, routesList, itinerariesList },
  };
}

export async function getStaticPaths() {
  const client =
    typeof window === "undefined" ? serverApolloClient : apolloClient;

  // Get Destinations
  const {
    data: { destinations },
  } = await client.query({
    query: GET_DESTINATIONS,
    variables: {
      coordinates: [0, 0],
    },
  });

  return {
    paths: destinations.map((d) => ({ params: { id: `${d.code}` } })),
    fallback: false,
  };
}

const ItinerariesView = ({ itineraries, routes }) => {
  const [selected, setSelected] = useState([]);
  const [newSelected, setNewSelected] = useState([]);
  const [applicable, setApplicable] = useState(false);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const shownItineraries = selected.length > 0 ? selected : itineraries;

  if (!itineraries.length) return null;

  if (calenderOpen) {
    return (
      <View id="calendar" theme="blue">
        <h2 className="flex justify-between" id="cruises">
          <span className="pt-1">Cruise calendar</span>
          <i
            className="fal fa-times cursor-pointer text-j-orange text-3xl"
            onClick={() => {
              setCalenderOpen(false);
              setNewSelected([]);
            }}
          ></i>
        </h2>
        <RangeCalendar
          ranges={itineraries}
          selected={selected}
          onSelectionChanged={(sel) => {
            setNewSelected(sel);
            setApplicable(true);
          }}
        />
        <Button
          className={cx("mt-4 w-full text-j-white", {
            "bg-j-ghostwhite": !applicable,
            "bg-j-orange": applicable,
          })}
          disabled={!applicable}
          onClick={() => {
            setApplicable(false);
            setSelected(newSelected);
            setCalenderOpen(false);
          }}
        >
          Apply
        </Button>
      </View>
    );
  }

  const button = (
    <Button
      className={cx(styles.filterButton, {
        "bg-j-magenta text-j-white": selected.length > 0,
        "bg-j-white text-j-magenta": selected.length == 0,
      })}
      unbold
      onClick={() => {
        if (selected.length > 0) {
          setSelected([]);
        } else {
          setCalenderOpen(true);
          scrollTo("calendar");
        }
      }}
    >
      {selected.length > 0 ? "Clear filter" : "Filter by date"}
    </Button>
  );

  const byNight = {};
  shownItineraries.forEach((i) => {
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
    <View description="Cruise routes" className="relative" id="cruises">
      {button}
      <div>
        {keys.map((key) => (
          <RoutesView key={key} nightCount={key} routes={byNight[key]} />
        ))}
      </div>
    </View>
  );
};
