import React, { useState } from "react";
import cx from "classnames";
import Gallery from "react-photo-gallery";
import Overlay from "../Overlay/Overlay";
import View from "../View/View";
import Button from "../Button/Button";
import DetailCard from "./DetailCard";

export const SelectionDetailsView = ({
  rooms,
  selections,
  roomIndex: defaultRoomIndex,
  selectionIndex: defaultSelectionIndex,
  onClose,
  onSelect,
}) => {
  const [roomIndex, setRoomIndex] = useState(defaultRoomIndex);
  const [selectionIndex, setSelectionIndex] = useState(defaultSelectionIndex);

  const getIndex = (currentIndex, length, delta) =>
    delta > 0
      ? delta + currentIndex === length
        ? 0
        : delta + currentIndex
      : delta + currentIndex < 0
      ? length - 1
      : delta + currentIndex;

  const room = rooms[roomIndex];
  const selection = selections[selectionIndex];

  const selectButton = (
    <Button
      className="w-full bg-j-red-live text-j-white my-8"
      onClick={() => {
        onSelect(roomIndex, selection, true);
        let switchedToNext = false;
        rooms.forEach((r, i) => {
          if (switchedToNext) return;
          if (!r.selected && i !== roomIndex) {
            setRoomIndex(i);
            switchedToNext = true;
          }
        });
        if (!switchedToNext) onClose();
      }}
    >
      Select and continue
    </Button>
  );

  return (
    <Overlay>
      <View className="mt-10">
        <Slider
          onStep={(delta) => {
            const newRoomIndex = getIndex(roomIndex, rooms.length, delta);
            setRoomIndex(newRoomIndex);
            setSelectionIndex(
              rooms[newRoomIndex].selected
                ? selections
                    .map((s) => s.name)
                    .indexOf(rooms[newRoomIndex].selected.name)
                : 0
            );
          }}
          className="mb-14"
          inverse
          uppercase
          showFirst={roomIndex > 0}
          showLast={roomIndex < rooms.length - 1}
        >
          State room {room.id + 1}
        </Slider>
        <Slider
          onStep={(delta) =>
            setSelectionIndex(
              getIndex(selectionIndex, selections.length, delta)
            )
          }
          showFirst={selectionIndex > 0}
          showLast={selectionIndex < selections.length - 1}
          className="mb-8"
        >
          {selection.name}
        </Slider>
        <div className="overflow-hidden w-full">
          <Gallery
            photos={selection.images.map((img) =>
              Object.assign({}, img, { thumbnail: img.src })
            )}
            targetRowHeight={120}
          />
        </div>

        {selectButton}

        <div className="pt-2">
          <DetailCard
            title="Room features"
            description={["Comfort on the waves!"]}
            id="features"
          >
            ...
          </DetailCard>
          <DetailCard
            title="Inclusions"
            description={["Stay, food and more!"]}
            id="features"
          >
            ...
          </DetailCard>
          <DetailCard
            title="Price details"
            description={[
              <span key="total">Total</span>,
              <span key="price">
                &#x20B9; {(selection.price.total || 0).toLocaleString("hi-IN")}
              </span>,
            ]}
            id="features"
          >
            <PriceDetails {...selection.price} />
          </DetailCard>
        </div>
        {selectButton}
      </View>
      <button
        tabIndex={0}
        onClick={onClose}
        className="absolute leading-11"
        style={{ top: "0.5rem", right: "1.1rem" }}
      >
        <i className="fal fa-times text-4xl text-j-magenta" />
      </button>
    </Overlay>
  );
};

export default SelectionDetailsView;

const Slider = ({
  onStep,
  children,
  inverse,
  uppercase,
  className,
  showFirst,
  showLast,
}) => (
  <div
    className={cx(
      "border rounded-l-full rounded-r-full border-j-gray flex justify-between p-3",
      inverse ? "bg-j-magenta text-j-white" : "bg-j-white text-j-magenta",
      className
    )}
  >
    <i
      className={cx(
        "fal fa-arrow-circle-left cursor-pointer self-center text-3xl",
        !showFirst && (inverse ? "text-j-magenta" : "text-j-white")
      )}
      onClick={() => onStep(-1)}
    />
    <h2
      className={cx(
        "leading-none pb-0 self-center pt-1",
        uppercase && "uppercase"
      )}
    >
      {children}
    </h2>
    <i
      className={cx(
        "fal fa-arrow-circle-right cursor-pointer self-center text-3xl",
        !showLast && (inverse ? "text-j-magenta" : "text-j-white")
      )}
      onClick={() => onStep(1)}
    />
  </div>
);

const PriceDetails = ({ individual, discounts, taxes, total }) => {
  const subTotal =
    individual.reduce((sum, i) => sum + i.total, 0) +
    (discounts ? discounts.reduce((sum, i) => sum + i.total, 0) : 0);
  const totalTaxes = taxes.reduce((sum, i) => sum + i.value, 0);

  return (
    <div>
      {individual.map((x, i) => (
        <PriceBlock
          key={i}
          title={x.type || `Person ${i + 1}`}
          value={x.total}
          positions={[
            { description: "Fare", value: x.fare },
            { description: "Discount", value: x.discount },
            { description: "Port charges", value: x.portCharges },
            { description: "Gratuity", value: x.gratuity },
          ]}
        />
      ))}
      {discounts && (
        <PriceBlock
          title={"Group discount"}
          value={discounts.total}
          positions={discounts.details}
        />
      )}
      <PriceBlock
        title={"Sub-total"}
        value={subTotal}
        positions={[{ description: "Taxable sub-total", value: subTotal }]}
        bold
      />
      <PriceBlock title={"Taxes"} value={totalTaxes} positions={taxes} bold />
      <h2 className="flex justify-between font-bold">
        <span>Total</span>
        <span>&#x20B9; {(total || 0).toLocaleString("hi-IN")}</span>
      </h2>
    </div>
  );
};

const PriceBlock = ({ title, value, bold, positions }) => (
  <div className="mb-8">
    <h4
      className={cx(
        "flex justify-between leading-loose pb-0",
        bold ? "font-bold" : "font-medium"
      )}
    >
      <span>{title}</span>
      <span>&#x20B9; {(value || 0).toLocaleString("hi-IN")}</span>
    </h4>
    {positions.map((p, i) => (
      <p className="flex justify-between leading-loose">
        <span>{p.description}</span>
        <span>&#x20B9; {(p.value || 0).toLocaleString("hi-IN")}</span>
      </p>
    ))}
  </div>
);
