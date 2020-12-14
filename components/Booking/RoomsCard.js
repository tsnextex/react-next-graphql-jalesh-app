import Tile from "../Tile/Tile";
import React from "react";
import Button from "../Button/Button";

export const RoomsCard = ({ booking, goTo }) => {
  const { rooms } = booking;

  if (!rooms) return null;

  const guests = rooms
    .map((r) => r.adults + r.children + r.infants)
    .reduce((t, i) => t + i, 0);

  return (
    <Tile shadow className="mb-2">
      <Tile.Inner
        className="rounded-big flex justify-between"
        theme="magenta"
        tiny
      >
        <p className="text-xs leading-none uppercase self-center">
          {rooms.length} rooms, {guests} guests
        </p>
        <Button
          className="border border-j-white bg-j-orange text-j-white"
          onClick={() => goTo()}
        >
          Change
        </Button>
      </Tile.Inner>
    </Tile>
  );
};

export default RoomsCard;
