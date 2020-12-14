import Tile from "../Tile/Tile";
import React from "react";
import Button from "../Button/Button";

export const SelectionCard = ({ booking, goTo }) => {
  const { rooms } = booking;

  if (!rooms) return null;
  const roomTypes = {};
  rooms
    .filter((r) => r.selected)
    .forEach(({ selected: { name } }) => {
      roomTypes[name] = roomTypes[name] ? roomTypes[name] + 1 : 1;
    });

  return (
    <Tile shadow className="mb-2">
      <Tile.Inner
        className="rounded-big flex justify-between"
        theme="magenta"
        tiny
      >
        <p className="text-xs leading-none uppercase self-center flex flex-col leading-relaxed">
          {Object.keys(roomTypes).map((k) => (
            <span key={k}>
              {roomTypes[k]} x {k}
            </span>
          ))}
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

export default SelectionCard;
