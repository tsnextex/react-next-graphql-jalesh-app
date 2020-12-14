import React from "react";
import moment from "moment";
import cx from "classnames";
import { withRouter } from "next/router";
import Button from "../Button/Button";
import goTo from "../../utils/goTo";
import Tile from "../Tile/Tile";

export const ProductCard = withRouter(({ booking, router, small }) => (
  <Tile shadow className="mb-2">
    {small && (
      <Tile.Inner
        className="rounded-big flex justify-between"
        theme="magenta"
        tiny
      >
        <p className="text-xs leading-none uppercase self-center">
          Selected cruise
        </p>
        <Button
          className="border border-j-white bg-j-orange text-j-white"
          onClick={() => router.back()}
        >
          Change
        </Button>
      </Tile.Inner>
    )}
    {!small && (
      <Tile.Top theme="magenta">
        <p className="text-xs leading-none uppercase self-center">
          Selected cruise
        </p>
        {booking.route ? (
          <p className="font-medium uppercase pt-4">
            {booking.route.ports.map((p) => p.port.name).join(" - ")}
            {booking.nightCount ? (
              <>
                <br />({booking.nightCount} nights)
              </>
            ) : null}
          </p>
        ) : booking.nightCount ? (
          <WhiteButton disabled>
            Any {booking.nightCount}-night{" "}
            {booking.jurisdiction ? `${booking.jurisdiction} ` : ""}cruise
          </WhiteButton>
        ) : null}
      </Tile.Top>
    )}
    {!small && (
      <Tile.Bottom theme="orange">
        {booking.itinerary ? (
          <div className="flex">
            <div className="w-1/2">
              <small className="uppercase">Departure</small>
              <p className="text-xs text-j-black">
                <b className="font-medium uppercase block">
                  {moment(booking.itinerary.startTime).format(
                    "ddd, D MMM YYYY"
                  )}
                </b>
                {moment(booking.itinerary.startTime).format("h:mm A z")}
              </p>
            </div>
            <div className="w-1/2">
              <small className="uppercase">Return</small>
              <p className="text-xs text-j-black">
                <b className="font-medium uppercase block">
                  {moment(booking.itinerary.endTime).format("ddd, D MMM YYYY")}
                </b>
                {moment(booking.itinerary.endTime).format("h:mm A z")}
              </p>
            </div>
          </div>
        ) : (
          <WhiteButton disabled>Flexible dates</WhiteButton>
        )}
        <div className="flex justify-between mt-4">
          <Button
            className="border border-j-white bg-j-orange text-j-white"
            onClick={() => router.back()}
          >
            Change
          </Button>
          {!(booking.itinerary && booking.route) && (
            <small className="text-xs leading-tiny pt-1">
              Valid for: <br />
              <b className="font-medium">6 months</b>
            </small>
          )}
        </div>
      </Tile.Bottom>
    )}
  </Tile>
));

export default ProductCard;

const WhiteButton = ({ children, className, ...props }) => (
  <Button
    className={cx(
      className,
      "rounded-l-full rounded-r-full bg-j-white text-j-magenta w-full"
    )}
    {...props}
  >
    {children}
  </Button>
);
