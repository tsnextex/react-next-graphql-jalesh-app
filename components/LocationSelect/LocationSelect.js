import React from "react";
import cx from "classnames";
import { gql, useQuery } from "@apollo/client";
import { usePosition } from "use-position";
import { useForm } from "react-hook-form";
import UserContext from "../../store/UserContext";

import styles from "./LocationSelect.module.scss";

const GET_ADDRESS = gql`
  query Location($coordinates: [Float!]!) {
    reverseGeocoding(location: { coordinates: $coordinates, type: "Point" }) {
      id
      address
      coordinates {
        coordinates
        type
      }
    }
  }
`;

const SET_ADDRESS = gql`
  query SetLocation($address: String!) {
    geocoding(address: { id: "", address: $address }) {
      address
      coordinates {
        coordinates
        type
      }
    }
  }
`;

const getAddress = (raw) => {
  const addressTokens = raw.split(", ");
  if (addressTokens.length === 1) return raw;
  if (addressTokens.length === 2) return addressTokens[0];
  if (addressTokens.length === 3 && !addressTokens[0].match(/[0-9]+/))
    return addressTokens[0];
  if (addressTokens.length === 3) return addressTokens[1];
  return addressTokens[addressTokens.length - 3];
};

const LocationSelect = ({ className, color }) => {
  const [user, setUser] = React.useContext(UserContext);
  const [isOpen, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(null);

  const { latitude, longitude, error: locationError } = usePosition();

  const { loading, error, data } = useQuery(GET_ADDRESS, {
    variables: { coordinates: [longitude, latitude] },
    skip: user.placeLoaded || locationError || !longitude || !latitude,
  });

  React.useEffect(() => {
    if (!loading && !error && !user.placeLoaded && data) {
      console.log("Updating location...", data.reverseGeocoding);
      const place = Object.assign({}, data.reverseGeocoding, {
        address: getAddress(data.reverseGeocoding.address),
        coordinates: data.reverseGeocoding.coordinates.coordinates,
      });

      setUser(
        Object.assign({}, user, {
          placeLoaded: true,
          place,
        })
      );
    }
  });

  const { loading: loadingSet, error: errorSet, data: dataSet } = useQuery(
    SET_ADDRESS,
    {
      variables: { address: submitted },
      skip: !submitted,
    }
  );

  React.useEffect(() => {
    if (!loadingSet && submitted) {
      if (!errorSet && dataSet && dataSet.geocoding) {
        console.log("Setting address...", dataSet.geocoding);
        const place = Object.assign({}, dataSet.geocoding, {
          address: getAddress(dataSet.geocoding.address),
          coordinates: dataSet.geocoding.coordinates.coordinates,
        });
        setUser(Object.assign({}, user, { place }));
      }
      setSubmitted(null);
      setOpen(false);
    }
  });

  const { register, errors, handleSubmit, setError } = useForm();
  const onSubmit = (data) => {
    setSubmitted(data.address);
  };

  const inputRef = register({ required: true });

  return (
    <form
      className={cx(
        styles.input,
        {
          "text-j-gray border border-j-magenta bg-j-white": isOpen,
          "border-transparent": !isOpen,
          "text-j-orange": !color,
          [`text-j-${color}`]: color,
        },
        className
      )}
      onClick={() => {
        if (!isOpen) {
          setOpen(true);
          setTimeout(() => {
            const el = document.getElementsByName("address");
            if (el && el.length) el[0].focus();
          }, 1);
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative flex cursor-pointer">
        <i
          className={cx("fal fa-map-marker-alt text-2xl", {
            "text-j-gray-lighter": isOpen,
          })}
        ></i>
        {isOpen ? (
          <input
            type="text"
            placeholder="Enter your location"
            ref={inputRef}
            name="address"
            disabled={!!submitted}
          />
        ) : (
          <span>Not in {user.place.address}?</span>
        )}
      </div>
      {isOpen && (
        <i
          className="fal fa-times-circle text-lg text-j-gray cursor-pointer self-center"
          onClick={() => setOpen(false)}
        ></i>
      )}
    </form>
  );
};

export default LocationSelect;
