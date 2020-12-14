import React from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import scrollTo from "../../utils/scrollTo";
import goTo from "../../utils/goTo";
import UserContext from "../../store/UserContext";
import { GET_DESTINATIONS } from "../../store/ApolloClient";
import View from "../View/View";

const QuickDestinationsView = ({ destinations, scroll }) => {
  const router = useRouter();
  const [user, setUser] = React.useContext(UserContext);
  const [dest, setDestinations] = React.useState(destinations || []);

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
    <View description="quick links">
      {dest.map(
        (d) =>
          d.destination && (
            <QuickLink
              destination={d}
              key={d.id}
              scroll={scroll}
              router={router}
            />
          )
      )}
    </View>
  );
};

export default QuickDestinationsView;

const QuickLink = ({ destination, scroll, router }) => (
  <a
    className="flex text-lg uppercase text-j-magenta mb-6 cursor-pointer"
    onClick={goTo(router, `/destinations/${destination.code}`, () => {
      if (scroll) {
        scrollTo(destination.id);
        return true;
      }
    })}
  >
    <div className="w-10 text-2xl text-j-gray">
      <i className="fal fa-map-marker-alt"></i>
    </div>
    <div className="pt-2">
      <b className="font-medium">{destination.city}</b>, {destination.country}
    </div>
  </a>
);
