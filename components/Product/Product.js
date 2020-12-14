import React from "react";
import cx from "classnames";
import scrollTo from "../../utils/scrollTo";
import Button from "../Button/Button";

const Product = ({ title, description, children, id }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="w-full bg-j-blue-lighter py-8 px-5 rounded-big border border-j-blue-light text-sm mb-7"
      id={id}
    >
      <div className="flex">
        <div
          className="flex flex-grow flex-col cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) scrollTo(id);
          }}
        >
          <h4 className="uppercase font-bold pb-0">{title}</h4>
          <span className="text-xs">
            <span className="text-j-orange">
              {isOpen ? "Tap to collapse" : "Tap to expand"}
            </span>
          </span>
        </div>
        <Button className="text-j-white bg-j-orange">Book</Button>
      </div>
      {isOpen && <div className="py-10">{children}</div>}
    </div>
  );
};

export const ProductItem = ({ children, mode }) => (
  <div
    className={cx("leading-11 text-sm flex", {
      "text-j-black": !mode || mode === "save",
      "text-j-gray-light": mode && mode !== "save",
    })}
  >
    <div
      style={{ width: 32 }}
      className={cx("mr-6", {
        "text-tiny": mode === "extra" || mode === "save",
        "text-2xl": !mode || mode === "no",
        "text-j-red": mode === "no",
        "text-j-orange": mode === "extra",
        "text-j-green": !mode || mode === "save",
      })}
    >
      {!mode ? (
        <i className="far fa-check"></i>
      ) : mode === "no" ? (
        <i className="far fa-times pl-1"></i>
      ) : (
        mode
      )}
    </div>
    <span>{children}</span>
  </div>
);

export default Product;
