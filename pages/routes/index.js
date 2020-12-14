/* filter by date/route/budget */
import React, { useState } from "react";
import moment from "moment";
import cx from "classnames";
import { useQuery } from "@apollo/client";
import apolloClient, {
  serverApolloClient,
  GET_ALL_ROUTES,
} from "../../store/ApolloClient";
import scrollTo from "../../utils/scrollTo";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import FooterView from "../../components/Footer/Footer";
import Select from "../../components/Select/Select";
import View from "../../components/View/View";
import Overlay from "../../components/Overlay/Overlay";
import RangeCalendar from "../../components/RangeCalendar/RangeCalendar";
import Button from "../../components/Button/Button";
import PromotionView from "../../components/views/Promotion";
import CertificateView from "../../components/views/Certificate";
import RoutesView from "../../components/RoutesView/RoutesView";

const uniques = (value, index, self) => self.indexOf(value) === index;

export default function Routes({ routes, itinerariesList }) {
  const [openFilters, setOpenFilters] = useState(true);
  const [openStates, setOpenStates] = useState({});
  const [filterDestination, setFilterDestination] = useState(null);
  const [filterOrigin, setFilterOrigin] = useState(null);
  const [filteredItineraries, setFilteredItineraries] = useState([]);

  const { loading, error, data } = useQuery(GET_ALL_ROUTES, {});

  const itineraries = itinerariesList.map((i) =>
    Object.assign({}, i, {
      startTime: moment(i.startTime).startOf("day"),
      endTime: moment(i.endTime).startOf("day"),
    })
  );

  const origins = Object.values(routes)
    .map(
      (route) => route.ports && route.ports.length && route.ports[0].port.name
    )
    .filter(uniques);
  origins.sort();

  const destinations = Object.values(routes)
    .map(
      (route) =>
        route.ports &&
        route.ports.length &&
        route.ports.slice(1, route.ports.length).map((p) => p.port.name)
    )
    .flat(1)
    .filter(uniques);
  destinations.sort();

  const byNight = {};
  (filteredItineraries && filteredItineraries.length
    ? filteredItineraries
    : itineraries
  ).forEach((i) => {
    const route = routes[i.routeID];

    // Filter by origin
    if (
      filterOrigin &&
      !(
        route.ports &&
        route.ports.length &&
        route.ports[0].port.name === filterOrigin
      )
    ) {
      return;
    }

    // Filter by destination
    if (
      filterDestination &&
      !(
        route.ports &&
        route.ports.length &&
        route.ports
          .slice(1, route.ports.length)
          .map((p) => p.port.name)
          .flat(1)
          .includes(filterDestination)
      )
    ) {
      return;
    }

    // Block
    if (!byNight[i.nightCount]) {
      byNight[i.nightCount] = {};
    }
    const block = byNight[i.nightCount];

    // Route
    if (!block[i.routeID])
      block[i.routeID] = Object.assign({}, route, {
        itineraries: [],
      });

    block[i.routeID].itineraries.push(i);
  });

  const calenderItineraries = {};
  Object.values(byNight)
    .flat(1)
    .map((o) => Object.values(o))
    .flat(1)
    .map((r) => r.itineraries)
    .flat(1)
    .forEach((i) => (calenderItineraries[i.id] = i));

  const keys = Object.keys(byNight);
  keys.sort();

  const filtersView = openFilters ? (
    <View description="Filter by cruise duration" theme="blue">
      <div className="my-2">
        {keys.map((key) => (
          <div
            key={key}
            className="flex cursor-pointer"
            onClick={() => {
              setOpenStates({ [key]: true });
              scrollTo(`${key}-nights`);
            }}
          >
            <i className="fal fa-clock pr-4 text-2xl text-j-gray-light"></i>
            <h4 className="text-j-magenta uppercase">
              Show {key} night cruises
            </h4>
          </div>
        ))}
      </div>
      <Select
        icon="fal fa-map-marker-alt"
        title="Filter by destination"
        overlayTitle="Choose destination"
        optional
        onSelect={(dest) => {
          setFilterDestination(dest);
          setFilteredItineraries([]);
        }}
        items={destinations}
      />
      <Select
        icon="fal fa-map-marker-alt"
        title="Filter by origin"
        overlayTitle="Choose origin"
        optional
        onSelect={(orig) => {
          setFilterOrigin(orig);
          setFilteredItineraries([]);
        }}
        items={origins}
      />
      <RangeCalendarSelect
        itineraries={Object.values(calenderItineraries)}
        selected={filteredItineraries.filter(
          (i) => !!calenderItineraries[i.id]
        )}
        onSelectionChanged={(sel) => setFilteredItineraries(sel || [])}
      />
    </View>
  ) : null;

  return (
    <Layout title="Jalesh Cruises">
      <Header
        className="bg-j-magenta text-j-white"
        style={{
          height: "50vh",
          backgroundImage: `url("/images/shipfront.jpg")`,
          backgroundSize: "contain",
          backgroundPositionY: -60,
        }}
      >
        <div className="pt-32 pb-4">
          <h1 className="font-bold">Cruise finder</h1>
          <h2 className="self-center">
            Choose from a variety of domestic and international cruises below
          </h2>
        </div>
      </Header>
      <main className="bg-auto">
        <div className="bg-j-magenta text-j-white p-6" id="filters">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setOpenFilters(!openFilters);
              if (!openFilters) scrollTo("filters");
            }}
          >
            <span className="self-center">Show all filters</span>
            <i
              className={cx("fal cursor-pointer text-j-gray-light text-4xl", {
                "fa-angle-down": !openFilters,
                "fa-angle-up": openFilters,
              })}
            ></i>
          </div>
        </div>
        {filtersView}
        <TipView />
        <View id="cruises">
          <div>
            {keys.map((key) => (
              <RoutesView
                key={key}
                nightCount={key}
                routes={byNight[key]}
                open={openStates[key]}
              />
            ))}
          </div>
        </View>
        {/*
        // TODO: Missing content
        <PromotionView />
        <CertificateView />
        */}
      </main>
      <footer>
        <FooterView />
      </footer>
    </Layout>
  );
}

Routes.getInitialProps = async () => {
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

const RangeCalendarSelect = ({ itineraries, selected, onSelectionChanged }) => {
  const [newSelected, setNewSelected] = useState([]);
  const [applicable, setApplicable] = useState(false);

  return (
    <Select
      icon="fal fa-calendar-alt"
      title="Filter by date"
      overlayTitle="Cruise calendar"
      optional
      onSelect={(s) => {
        onSelectionChanged && onSelectionChanged(s);
        setApplicable(false);
      }}
      selectedItem={(selected && selected.length && selected) || null}
      renderItem={() => "Dates selected"}
      items={itineraries}
    >
      {({
        items,
        selected,
        setSelected,
        onSelect,
        setOpen,
        onCloseClicked,
      }) => (
        <Overlay open>
          <View>
            <h2 className="flex justify-between" id="cruises">
              <span className="pt-1">Cruise calendar</span>
              <i
                className="fal fa-times cursor-pointer text-j-orange text-3xl"
                onClick={() => {
                  setApplicable(false);
                  onCloseClicked();
                }}
              ></i>
            </h2>
            <RangeCalendar
              ranges={items}
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
                const result = newSelected.length ? newSelected : null;
                setApplicable(false);
                setSelected(result);
                onSelect && onSelect(result);
                setNewSelected(null);
                setOpen(false);
              }}
            >
              Apply
            </Button>
          </View>
        </Overlay>
      )}
    </Select>
  );
};

const TipView = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-j-orange text-j-white px-6 py-8 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <h4 className="leading-none pb-0 font-medium">
        <i className="fal fa-lightbulb-on text-2xl pr-4"></i>
        Tip
      </h4>
      {open && (
        <>
          <p className="py-6 pl-12">
            Jalesh Cruises allows you to purchase cruise packages that start
            from your doorstep, so you don’t have to worry about the origin port
          </p>
          <div className="flex justify-between text-5xl px-4">
            <i className="fal fa-ship"></i>
            <i className="fal fa-plane fa-rotate-270"></i>
            <i className="fal fa-hotel"></i>
            <i className="fal fa-taxi"></i>
          </div>
        </>
      )}
    </div>
  );
};
