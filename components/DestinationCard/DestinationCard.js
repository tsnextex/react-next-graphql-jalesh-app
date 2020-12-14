import React from "react";
import cx from "classnames";
import { useSpring, animated } from "react-spring";
import { useQuery } from "@apollo/client";
import scrollTo from "../../utils/scrollTo";
import UserContext from "../../store/UserContext";
import { GET_ROUTES } from "../../store/ApolloClient";
import Button from "../Button/Button";

import styles from "./DestinationCard.module.scss";

const PortView = ({ secondary, typ, port }) => (
  <div
    className={cx("uppercase text-sm font-bold", {
      "text-j-gray-light": secondary,
      "text-j-black": !secondary,
    })}
  >
    {port.name}
    {typ && (
      <div
        className={cx("leading-8 text-xl text-j-orange my-2", {
          "border-dotted border-l-2 border-j-gray-light": typ === "sea",
          "ml-1": typ === "sea",
        })}
      >
        {typ === "sea" ? (
          <span>&nbsp;</span>
        ) : (
          <i className="fal fa-plane fa-rotate-90"></i>
        )}
      </div>
    )}
  </div>
);

const RouteView = ({ route, last, style }) => {
  const [user, setUser] = React.useContext(UserContext);
  const {
    place: { address },
  } = user;

  return (
    <div
      className={cx(styles.route, { "mr-12": last, "mr-3": !last })}
      style={style}
    >
      <div className="pb-8 px-4 flex-grow">
        <PortView port={{ name: address }} secondary typ="air" />
        {route.ports.map(({ port, id }, i) => (
          <PortView
            port={port}
            key={id}
            typ={i + 1 === route.ports.length ? "air" : "sea"}
          />
        ))}
        <PortView port={{ name: address }} secondary />
      </div>
      <Button className="w-full bg-j-orange text-j-white">
        Price and Details
      </Button>
    </div>
  );
};

const RoutesView = ({ destination, routes, setOpen }) => {
  const style =
    routes.length > 1 ? null : { marginLeft: "auto", marginRight: "auto" };

  const cardProps = useSpring({
    from: { height: 105, opacity: 0, overflow: "hidden" },
    to: { height: "auto", opacity: 1, overflow: "visible" },
    delay: 200,
  });

  return (
    <animated.div
      className={cx(styles.routes)}
      style={cardProps}
      id={destination.id}
    >
      <h2
        className="text-j-white uppercase font-bold leading-none px-12 py-7 cursor-pointer"
        onClick={() => setOpen(false)}
      >
        {destination.city}
      </h2>
      <div className="whitespace-no-wrap overflow-x-auto flex pl-10">
        {routes.map((route, i) => (
          <RouteView
            route={route}
            key={route.id}
            last={i + 1 === routes.length}
            style={style}
          />
        ))}
        &nbsp;
      </div>
    </animated.div>
  );
};

const DestinationCard = ({ destination }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [routes, setRoutes] = React.useState([]);

  const { loading, error, data } = useQuery(GET_ROUTES, {
    variables: { portID: destination.id },
    skip: !isOpen || routes.length > 0,
  });

  if (!routes.length && !loading && !error && data) {
    setRoutes(data.routes);
  }

  if (!isOpen || loading)
    return (
      <div
        className={styles.card}
        id={destination.id}
        onClick={() => {
          setOpen(!isOpen);
          if (!isOpen) scrollTo(destination.id);
        }}
      >
        <div className="flex-grow">
          <h2 className="text-j-magenta uppercase font-bold leading-none pb-2">
            {destination.city}
          </h2>
          <p className="text-j-orange">View available cruises</p>
        </div>
        <div>
          {loading && (
            <i className="fas fa-sync-alt fa-spin text-j-magenta text-4xl opacity-25"></i>
          )}
        </div>
      </div>
    );

  return (
    <RoutesView destination={destination} routes={routes} setOpen={setOpen} />
  );
};

export default DestinationCard;
