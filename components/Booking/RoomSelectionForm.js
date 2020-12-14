import React, { useContext, useState, useEffect } from "react";
import cx from "classnames";
import { useQuery } from "@apollo/client";
import UserContext from "../../store/UserContext";
import { CHECK_AVAILABILITY } from "../../store/ApolloClient";
import Tile from "../Tile/Tile";
import Button from "../Button/Button";
import Tag from "../Tag/Tag";
import BookingFormView from "./BookingFormView";
import SelectionDetailsView from "./SelectionDetailsView";
import LoadingIcon from "../Loading/LoadingIcon";

export const RoomSelectionForm = () => {
  const [preview, setPreview] = useState(null);
  const [selection, setSelection] = useState(null);
  const [user, setUser] = useContext(UserContext);

  const booking = user.booking || {};

  const { loading, error, data } = useQuery(CHECK_AVAILABILITY, {
    variables: {
      input: {
        visitorID: booking.visitorID,
        itineraryID: booking.itinerary && booking.itinerary.id,
        promoCode: "", // TODO: connect landing page promo codes here
        rooms: booking.rooms.map((room) => {
          const { adults, infants, children, discounts } = room;

          const guestDiscounts = discounts.map(
            ({ defensePersonal, freedomFighter, loyaltyMemberID }) => ({
              defensePersonal,
              freedomFighter,
              loyaltyMemberID,
            })
          );

          return {
            adults,
            infants,
            children,
            guestDiscounts,
          };
        }),
      },
    },
    skip: selection,
  });

  useEffect(() => {
    if (!loading && data) {
      console.log("ERROR", error);
      console.log("DATA", data);
      setSelection(data.checkAvailability);
    }
  }, [error, data, loading]);

  if (loading || error || !selection) {
    return (
      <h1>
        <LoadingIcon className="py-20 text-j-magenta" />
      </h1>
    );
  }

  const onSelect = (index, selected, noScroll) => {
    const rooms = [...booking.rooms];

    rooms[index] = Object.assign({}, rooms[index], { selected });

    setUser(
      Object.assign({}, user, {
        booking: Object.assign({}, booking, {
          rooms,
        }),
      })
    );
  };

  return (
    <BookingFormView
      title="We have found you some great options!"
      buttonText="Continue"
      onClick={() => {
        setUser(
          Object.assign({}, user, {
            booking: Object.assign({}, booking, {
              roomsSelected: true,
            }),
          })
        );
      }}
      id="otp-form"
      disabled={booking.rooms.filter((room) => !room.selected).length}
    >
      {booking.rooms.map((room, i) => (
        <RoomView
          room={room}
          selections={selection[i].categories}
          key={i}
          onSelect={(selection) => onSelect(i, selection)}
          onDetails={(room, selection, selectionIndex) => {
            setPreview(Object.assign([room.id, selectionIndex]));
          }}
        />
      ))}
      {preview && (
        <SelectionDetailsView
          rooms={booking.rooms}
          selections={selection[preview[0]].categories}
          selectionIndex={preview[1]}
          roomIndex={preview[0]}
          onClose={() => setPreview(null)}
          onSelect={onSelect}
        />
      )}
    </BookingFormView>
  );
};

export default RoomSelectionForm;

const RoomView = ({ room, onSelect, selections, onDetails }) => {
  const selection = room.selected ? (
    <RoomCard
      room={room.selected}
      selected
      onChange={() => onSelect(null)}
      onDetails={(selection) =>
        onDetails(
          room,
          selection,
          selections.map((s) => s.name).indexOf(room.selected.name)
        )
      }
    />
  ) : (
    selections.map((r, i) => (
      <RoomCard
        room={r}
        key={i}
        onChange={(selection) => onSelect(selection)}
        onDetails={(selection) => onDetails(room, selection, i)}
      />
    ))
  );

  return (
    <Tile theme="magenta" shadow className="my-5" id={`room-${room.id}`}>
      <Tile.Inner>
        <h4 className="uppercase">State room {room.id + 1}</h4>
        {selection}
      </Tile.Inner>
    </Tile>
  );
};

const RoomCard = ({ room, onChange, selected, onDetails }) => {
  return (
    <Tile className="mb-8 relative">
      <Tile.Inner
        tiny
        className={cx(
          "rounded-big",
          room.popular ? "bg-j-orange" : "bg-j-white"
        )}
        theme={room.popular ? "orange" : "white"}
      >
        <div className="flex justify-between">
          <h4
            className={cx(
              "font-bold pb-0 self-center",
              room.popular ? "text-j-white" : "text-j-magenta"
            )}
          >
            {room.name}
          </h4>
          <Button
            className={cx(
              "border self-center",
              room.popular
                ? "border-j-white bg-j-orange text-j-white"
                : "border-j-gray bg-j-white text-j-gray"
            )}
            onClick={() => onChange(room)}
          >
            {selected ? "Change" : "Select"}
          </Button>
        </div>
        <div className="flex justify-between pt-5">
          <a
            className={cx(
              "text-xs uppercase cursor-pointer self-center",
              room.popular ? "text-j-white" : "text-j-orange"
            )}
            onClick={() => onDetails(room)}
          >
            Details
          </a>
          <h2
            className={cx(
              "leading-none self-center pb-0",
              room.popular ? "text-j-white" : "text-j-black"
            )}
          >
            &#x20B9; {(room.price.total || 0).toLocaleString("hi-IN")}
          </h2>
        </div>
      </Tile.Inner>
      {room.popular && (
        <Tag
          className="bg-j-white text-j-orange absolute"
          style={{ top: -8, left: 16 }}
        >
          popular
        </Tag>
      )}
    </Tile>
  );
};
