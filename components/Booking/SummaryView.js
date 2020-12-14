import React from "react";
import moment from "moment";
import Tile from "../Tile/Tile";

const SummaryView = ({ booking }) => {
  const { rooms } = booking;

  const guests = rooms
    .map((r) => r.adults + r.children + r.infants)
    .reduce((t, i) => t + i, 0);

  const selected = {};
  rooms.forEach((r) => {
    if (!selected[r.selected.name]) selected[r.selected.name] = 0;
    selected[r.selected.name]++;
  });
  const totalPrice = rooms.reduce((x, r) => x + r.selected.price.total, 0);

  return (
    <>
      <h1 className="alt">Order summary</h1>
      <Tile tiny theme="white" className="mb-5 border border-j-gray-lighter">
        <Tile.Inner className="pb-0">
          <OrderDetail title="Ship">{booking.itinerary.ship.name}</OrderDetail>
          <OrderDetail title="Selected route">
            {booking.nightCount ? <>{booking.nightCount} Nights, </> : null}
            {booking.route.ports.map((p) => p.port.code).join(" - ")}
          </OrderDetail>
          <OrderDetail title="Date of cruise">
            {moment(booking.itinerary.startTime).format("ddd, D MMM YYYY")}
          </OrderDetail>
          <OrderDetail title="Itinerary">
            {Object.keys(selected)
              .map((k) => `${selected[k]} x ${k}`)
              .join(", ")}
            , {guests} Guest{guests > 1 ? "s" : null}
          </OrderDetail>
          <OrderDetail title="Total amount payable" big>
            &#x20B9; {totalPrice.toLocaleString("hi-IN")}
          </OrderDetail>
        </Tile.Inner>
      </Tile>
    </>
  );
};

export default SummaryView;

const OrderDetail = ({ title, children, big }) => (
  <>
    <h1 className="uppercase pb-0 text-j-gray text-tiny leading-none">
      {title}
    </h1>
    <h4
      className={
        big ? "text-j-magenta text-3xl font-bold pt-4" : "text-j-magenta pt-2"
      }
    >
      {children}
    </h4>
  </>
);
