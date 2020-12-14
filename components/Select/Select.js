import React, { useState, useEffect } from "react";
import cx from "classnames";
import Overlay from "../Overlay/Overlay";
import View from "../View/View";

export const Select = ({
  items,
  selectedItem,
  renderItem,
  onSelect,
  optional,
  icon,
  title,
  overlayTitle,
  children,
}) => {
  const [selected, setSelected] = useState(selectedItem);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(selectedItem);
  }, [selectedItem]);

  if (open) {
    const props = {
      items,
      icon,
      setSelected,
      onSelect,
      setOpen,
      selected,
      renderItem,
      title: overlayTitle || title,
      onCloseClicked: () => setOpen(false),
    };
    return children ? children(props) : <DefaultSelector {...props} />;
  }

  const option = selected ? (
    <i
      className="fal fa-times-circle text-xl pt-1"
      onClick={() => {
        setSelected(null);
        onSelect && onSelect(null);
      }}
    ></i>
  ) : optional ? (
    <span className="text-xs leading-none">Optional</span>
  ) : null;

  return (
    <div
      className={cx(
        selected ? "bg-j-magenta" : "bg-j-white",
        "flex justify-between rounded-l-full rounded-r-full h-12 px-6 border border-j-gray select-none cursor-pointer mb-5"
      )}
    >
      <i
        className={cx(
          selected ? "text-j-white" : "text-j-gray",
          icon,
          "text-2xl pr-4 self-center"
        )}
        onClick={() => setOpen(true)}
      ></i>
      <span
        className={cx(
          selected ? "text-j-white" : "text-j-black",
          "flex-grow font-medium text-lg leading-none self-center pt-1"
        )}
        onClick={() => setOpen(true)}
      >
        {selected
          ? renderItem
            ? renderItem(selected)
            : selected.name
            ? selected.name
            : selected
          : title}
      </span>
      <div
        className={cx(
          selected ? "text-j-white" : "text-j-gray",
          "text-right self-center pt-1"
        )}
        onClick={() => !selected && setOpen(true)}
      >
        {option}
      </div>
    </div>
  );
};

export default Select;

const DefaultSelector = ({
  title,
  icon,
  items,
  selected,
  setSelected,
  onSelect,
  renderItem,
  setOpen,
  onCloseClicked,
}) => (
  <Overlay open>
    <View>
      <h2 className="flex justify-between" id="cruises">
        <span className="pt-1">{title || "Please select"}</span>
        <i
          className="fal fa-times cursor-pointer text-j-orange text-3xl"
          onClick={onCloseClicked}
        ></i>
      </h2>
      <div className="px-4 pt-8 text-j-magenta text-lg font-medium">
        {items.map((item, i) => (
          <div
            className="mb-8 flex select-none cursor-pointer"
            key={i}
            onClick={() => {
              setSelected(item);
              onSelect && onSelect(item);
              setOpen(false);
            }}
          >
            <i
              className={cx(
                icon,
                "text-xl pr-4",
                selected === item ? "text-j-orange" : "text-j-gray"
              )}
            ></i>
            {renderItem ? renderItem(item) : item.name ? item.name : item}
          </div>
        ))}
      </div>
    </View>
  </Overlay>
);
