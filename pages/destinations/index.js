import React from "react";
import { useQuery } from "@apollo/client";
import { withRouter } from "next/router";
import { GET_DESTINATIONS } from "../../store/ApolloClient";
import goTo from "../../utils/goTo";
import CDN from "../../utils/cdn";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import FooterView from "../../components/Footer/Footer";
import View from "../../components/View/View";
import UserContext from "../../store/UserContext";
import { BaseImageCard } from "../../components/Card/Card";
import Button, { ArrowLinkButton } from "../../components/Button/Button";
import QuickDestinationsView from "../../components/views/QuickDestinations";

const DestinationCard = withRouter(({ destination, router }) => {
  const go = goTo(router, `/destinations/${destination.code}`);
  const { destination: dest } = destination;

  return (
    <BaseImageCard src={CDN(dest.imageUrl)} id={destination.id}>
      <h1 className="leading-0 pb-0">{destination.city}</h1>
      <p className="uppercase text-j-magenta">{destination.country}</p>
      <h4 className="mt-6">{dest.description1}</h4>
      <small className="text-xs text-j-gray leading-none">
        {dest.description2}
      </small>
      <Button className="bg-j-orange text-j-white w-full my-8" onClick={go}>
        Criuses and prices
      </Button>
      <ArrowLinkButton onClick={go}>MORE ABOUT THE DESTINATION</ArrowLinkButton>
    </BaseImageCard>
  );
});

const Destinations = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [dest, setDestinations] = React.useState([]);

  const { loading, error, data } = useQuery(GET_DESTINATIONS, {
    variables: { coordinates: user.place.coordinates },
    skip: !user.place.coordinates || dest.length,
  });

  React.useEffect(() => {
    if (!loading && !error && data) {
      console.log("Updating destinations...", data.destinations);
      setDestinations(data.destinations);
      setUser(
        Object.assign({}, user, { destinationAddress: user.place.address })
      );
    }
  });

  return (
    <Layout title="Jalesh Cruises">
      <Header
        className="bg-j-magenta text-j-white"
        style={{
          height: "100vh",
          backgroundImage: 'url("/images/karnika-top.jpg")',
        }}
      >
        <div className="flex flex-col justify-around pt-32 pb-4">
          <h1 className="self-center">
            Where will you <b>go next</b>?
          </h1>
          <h2 className="self-center">
            Choose a destination for your next luxury adventure
          </h2>
        </div>
      </Header>
      <main className="bg-auto">
        <QuickDestinationsView destinations={dest} scroll />
        <View>
          {dest.map(
            (d) =>
              d.destination && <DestinationCard destination={d} key={d.id} />
          )}
        </View>
        {/*
        // TODO: Missing content
        <PromotionsView />
        */}
      </main>
      <footer>
        <FooterView showPromoBanner />
      </footer>
    </Layout>
  );
};

export default Destinations;
