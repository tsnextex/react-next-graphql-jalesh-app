import React from "react";
import { useQuery } from "@apollo/client";
import scrollTo from "../../utils/scrollTo";
import { GET_DESTINATIONS } from "../../store/ApolloClient";
import UserContext from "../../store/UserContext";
import View from "../View/View";
import LocationSelect from "../LocationSelect/LocationSelect";
import DestinationCard from "../DestinationCard/DestinationCard";
import { ArrowLinkButton } from "../Button/Button";

const MAX_SHOW = 4;

const CruiseDestinationsView = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [isOpen, setOpen] = React.useState(false);
  const [dest, setDestinations] = React.useState([]);

  const { loading, error, data } = useQuery(GET_DESTINATIONS, {
    variables: { coordinates: user.place.coordinates },
    skip: !user.place.coordinates || dest.length > 0,
  });

  React.useEffect(() => {
    if (!loading && !error && data) {
      console.log("Updating destinations...");
      setDestinations(data.destinations);
      setUser(
        Object.assign({}, user, { destinationAddress: user.place.address })
      );
    }
  });

  const destinations = isOpen ? dest : dest.slice(0, MAX_SHOW);
  const firstID = destinations.length && destinations[0].id;
  const lastID =
    destinations.length && destinations[destinations.length - 1].id;

  return (
    <View
      title={
        <>
          Cruise <b>destinations</b>
        </>
      }
      theme="blue"
    >
      <LocationSelect />
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
      {dest.length > MAX_SHOW && (
        <ArrowLinkButton
          down={!isOpen}
          up={isOpen}
          onClick={() => {
            setOpen(!isOpen);
            scrollTo(isOpen ? firstID : lastID);
          }}
          className="mt-10"
        >
          {isOpen
            ? "Show fewer destinations"
            : `View all ${dest.length} destinations`}
        </ArrowLinkButton>
      )}
    </View>
  );
};

export default CruiseDestinationsView;
