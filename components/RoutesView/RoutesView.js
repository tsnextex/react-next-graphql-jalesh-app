import React, { useState, useEffect } from "react";
import cx from "classnames";
import scrollTo from "../../utils/scrollTo";
import RouteCard from "../RouteCard/RouteCard";

export const RoutesView = ({ nightCount, routes, open: parentOpen, light }) => {
  const [open, setOpen] = useState(parentOpen || light || false);
  const id = `${nightCount}-nights`;

  useEffect(() => {
    if (parentOpen && open !== parentOpen) setOpen(parentOpen);
  }, [parentOpen]);

  return (
    <div className="mt-4">
      <h2
        className="flex justify-between cursor-pointer select-none"
        id={id}
        onClick={() => {
          setOpen(!open);
          if (!open) scrollTo(id);
        }}
      >
        <span className="pt-1">{nightCount}-Night Cruises</span>
        <i
          className={cx("fal cursor-pointer text-j-gray-light text-4xl", {
            "fa-angle-down": !open,
            "fa-angle-up": open,
            hidden: light,
          })}
        ></i>
      </h2>
      {open &&
        Object.values(routes).map((route) => (
          <RouteCard
            route={route}
            key={route.id}
            light={light}
            nightCount={nightCount}
          />
        ))}
    </div>
  );
};

export default RoutesView;
