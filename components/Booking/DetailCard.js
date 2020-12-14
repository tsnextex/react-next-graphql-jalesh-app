import React, { useState } from "react";
import scrollTo from "../../utils/scrollTo";
import Tile from "../Tile/Tile";

export const DetailCard = ({ title, description, children, id }) => {
  const [open, setOpen] = useState(false);
  return (
    <Tile
      padded
      tiny
      className="border rounded-big border-j-gray-lighter mb-6"
      id={id}
    >
      <div
        className="flex justify-between uppercase leading-none cursor-pointer mb-6"
        onClick={() => {
          setOpen(!open);
          if (!open) scrollTo(id);
        }}
      >
        <span className="text-sm text-j-magenta">{title}</span>
        <span className="text-xs text-j-magenta">{open ? "hide" : "show"}</span>
      </div>
      {open ? (
        children
      ) : (
        <div className="flex justify-between text-j-black font-bold text-lg">
          {description}
        </div>
      )}
    </Tile>
  );
};

export default DetailCard;
