import React, { useContext, useState } from "react";
import { withRouter } from "next/router";
import UserContext from "../../store/UserContext";
import goTo from "../../utils/goTo";
import cx from "classnames";
import moment from "moment";
import Button, { ArrowLinkButton } from "../Button/Button";

import styles from "./RouteCard.module.scss";

// NOTE: The route should already have a list of itineraries included!
export const RouteCard = withRouter(({ route, light, nightCount, router }) => {
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const goToBooking = (route, itinerary, nightCount) => {
    setUser(
      Object.assign({}, user, {
        booking: Object.assign({}, user.booking, {
          itinerary,
          route,
          nightCount,
        }),
      })
    );
    goTo(router, "/booking")();
  };

  route.itineraries.sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <div className={cx(styles.routeView, { [styles.open]: open })}>
      {light && (
        <p className="text-j-magenta px-9 pt-5">{nightCount}-night cruise</p>
      )}
      <div className="px-5 pb-0 pt-8">
        {route.ports.map((p) => (
          <h4
            className={cx(
              "flex uppercase leading-tiny",
              open ? "text-j-white" : light ? "text-j-black" : "text-j-magenta"
            )}
            key={p.id}
          >
            <div
              className={cx("text-center w-12", !open && "text-j-gray-lighter")}
            >
              <i className="far fa-anchor"></i>
            </div>
            <span>{p.port.name}</span>
          </h4>
        ))}
      </div>
      <ArrowLinkButton
        className={cx("mb-5", open && "text-j-white", light && "hidden")}
      >
        More about this cruise
      </ArrowLinkButton>
      {open ? (
        <>
          <h4 className="font-medium" id={route.id}>
            Choose a cruise date
          </h4>
          {route.itineraries.map((itinerary) => (
            <div
              className="border rounded-big border-j-gray-lighter p-5 bg-j-white mb-10"
              key={itinerary.id}
            >
              <div className="flex mb-4">
                <div className="w-1/2">
                  <small className="uppercase text-j-gray-lighter">
                    Cruise starts
                  </small>
                  <span className="text-xs uppercase block font-medium text-j-black">
                    {moment(itinerary.startTime)
                      .locale("en")
                      .format("ddd, D MMM YYYY")}
                  </span>
                </div>
                <div className="w-1/2">
                  <small className="uppercase text-j-gray-lighter">
                    Cruise ends
                  </small>
                  <span className="text-xs uppercase block font-medium text-j-black">
                    {moment(itinerary.endTime)
                      .locale("en")
                      .format("ddd, D MMM YYYY")}
                  </span>
                </div>
              </div>
              <Button
                className="bg-j-red-live w-full text-j-white"
                onClick={() => goToBooking(route, itinerary, nightCount)}
              >
                Get price
              </Button>
            </div>
          ))}
        </>
      ) : (
        !light && (
          <Button
            className="bg-j-white text-j-orange w-full mb-4 border border-j-orange"
            onClick={() => {
              setOpen(true);
            }}
          >
            See cruise dates
          </Button>
        )
      )}
      <Button
        className="bg-j-magenta text-j-white w-full"
        onClick={() => goToBooking(route, null, nightCount)}
      >
        {light ? "Calculate price" : "Cruise when you wish"}
      </Button>
    </div>
  );
});

export default RouteCard;
