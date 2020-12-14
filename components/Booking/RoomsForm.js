import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import cx from "classnames";
import scrollTo from "../../utils/scrollTo";
import UserContext from "../../store/UserContext";
import { VERIFY_MEMBER } from "../../store/ApolloClient";
import Button from "../Button/Button";
import PhoneField from "../Form/PhoneField";
import Tile from "../Tile/Tile";
import BookingFormView from "./BookingFormView";

export const RoomsForm = () => {
  const [user, setUser] = React.useContext(UserContext);
  const booking = user.booking || {};

  // TODO change me:
  const maxRooms = 999;
  const [rooms, setRooms] = useState(booking.rooms || [createRoom(0)]);
  const maxRoomsReached = rooms.length >= maxRooms;

  const changeRooms = (room) =>
    setRooms(
      rooms.map((r) => (r.id === room.id ? Object.assign({}, r, room) : r))
    );

  const removeRoom = (id) => {
    setRooms(
      rooms
        .filter((r) => r.id !== id)
        .map((r, i) => Object.assign({}, r, { id: i }))
    );
    scrollTo(`room-${id - 1}`);
  };

  const handleSubmit = () => {
    setUser(
      Object.assign({}, user, {
        booking: Object.assign({}, booking, { rooms }),
      })
    );
  };

  React.useEffect(() => {
    scrollTo("room-form");
  }, []);

  return (
    <BookingFormView
      title="Please add rooms and guests"
      id="room-form"
      onClick={handleSubmit}
    >
      {rooms.map((room) => (
        <RoomView
          key={room.id}
          room={room}
          visitorID={booking.visitorID}
          onChange={changeRooms}
          onRemove={room.id > 0 ? () => removeRoom(room.id) : null}
          id={`room-${room.id}`}
        />
      ))}
      {!maxRoomsReached && (
        <Button
          className="bg-j-white text-j-magenta border border-j-magenta w-full mb-12"
          onClick={() => {
            setRooms([
              ...rooms.map((r) => Object.assign({}, r, { open: false })),
              createRoom(rooms.length),
            ]);
            scrollTo(`room-${rooms.length}`);
          }}
        >
          Add another room
        </Button>
      )}
    </BookingFormView>
  );
};

export default RoomsForm;

const RoomView = ({ room, onChange, onRemove, visitorID, ...rest }) => {
  const [open, setOpen] = useState(false);
  const isFull = room.adults + room.children + room.infants >= room.max;

  const updateRoom = (data) => {
    const newRoom = Object.assign({}, room, data);

    // Remove rooms, if needed
    newRoom.discounts = newRoom.discounts.slice(0, newRoom.adults);

    // Add rooms, if needed
    while (newRoom.discounts.length < newRoom.adults)
      newRoom.discounts.push(createDiscount());

    onChange(newRoom);
  };

  const onDiscountChange = (discount, index) => {
    const discounts = [...room.discounts];
    discounts[index] = discount;
    updateRoom({ discounts });
  };

  const onToggleView = () => updateRoom({ open: !room.open });

  const roomHeader = (
    <div className="flex justify-between">
      <h4
        className="text-j-magenta uppercase self-center cursor-pointer"
        onClick={onToggleView}
      >
        State room {room.id + 1}
      </h4>
      {onRemove && (
        <p
          className="leading-none text-xs text-j-orange pt-2 cursor-pointer"
          onClick={onRemove}
        >
          Remove
        </p>
      )}
    </div>
  );

  if (!room.open) {
    return (
      <Tile className="mb-8" {...rest} shadow>
        <Tile.Inner>
          {roomHeader}
          <div
            className="flex justify-between cursor-pointer"
            onClick={onToggleView}
          >
            <MiniWidget icon="fal fa-restroom" value={room.adults} />
            <MiniWidget icon="fal fa-child" value={room.children} />
            <MiniWidget icon="fal fa-baby" value={room.infants} />
          </div>
        </Tile.Inner>
      </Tile>
    );
  }

  const discountsShow = open ? (
    <div className="mt-16 mb-8">
      {room.discounts.map((d, i) => (
        <DiscountView
          key={i}
          id={i + 1}
          discount={d}
          onChange={(discount) => onDiscountChange(discount, i)}
          visitorID={visitorID}
        />
      ))}
    </div>
  ) : null;

  return (
    <Tile className="mb-8" {...rest} shadow>
      <Tile.Top>
        {roomHeader}
        <p className="text-j-gray flex pb-12">
          <i className="fal fa-bed pr-4" />
          Rooms can accommodate 2, 3 or 4 guests
        </p>
        <WidgetView
          min={1}
          value={room.adults}
          disabled={isFull}
          icon="fal fa-restroom"
          title="Adults"
          description="18 or"
          onChange={(value) => updateRoom({ adults: value })}
        />
        <WidgetView
          value={room.children}
          disabled={isFull}
          icon="fal fa-child"
          title="Children"
          description="2 years - 18 years"
          onChange={(value) => updateRoom({ children: value })}
        />
        <WidgetView
          value={room.infants}
          disabled={isFull}
          icon="fal fa-baby"
          title="Infants"
          description="6 months - 2 years"
          onChange={(value) => updateRoom({ infants: value })}
        />
      </Tile.Top>
      <Tile.Bottom theme="magenta">
        <div
          className="flex justify-between h-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <p className="leading-none self-center uppercase">Discount Options</p>
          <p className="leading-none self-center text-xs">
            {open ? (
              <i className="fal fa-times cursor-pointer text-j-orange text-3xl" />
            ) : (
              "Expand"
            )}
          </p>
        </div>
        {discountsShow}
      </Tile.Bottom>
    </Tile>
  );
};

const WidgetView = ({
  value,
  min = 0,
  icon,
  title,
  description,
  disabled,
  onChange,
}) => (
  <div className="flex justify-between mx-8 mb-12">
    <Button
      className={cx(
        "text-j-white text-4xl w-12 self-center",
        value > min ? "bg-j-orange" : "bg-j-gray-lighter"
      )}
      smallPadding
      unbold
      disabled={value <= min}
      onClick={() => onChange(value - 1)}
    >
      -
    </Button>
    <div className="flex-grow self-center text-center">
      <div className="h-9">
        {value ? (
          <span className="text-3xl font-bold leading-none">{value}</span>
        ) : (
          <i className={cx(icon, "text-3xl text-j-gray-lighter")} />
        )}
      </div>
      <p className="leading-4 uppercase text-j-magenta">{title}</p>
      <p className="text-tiny uppercase text-j-gray">{description}</p>
    </div>
    <Button
      className={cx(
        "text-j-white text-4xl w-12 self-center",
        disabled ? "bg-j-gray-lighter" : "bg-j-orange"
      )}
      smallPadding
      unbold
      disabled={disabled}
      onClick={() => onChange(value + 1)}
    >
      +
    </Button>
  </div>
);

const MiniWidget = ({ icon, value }) => (
  <div className="border border-j-gray-lighter w-24 flex justify-between px-4 py-2 text-j-black rounded-l-full rounded-r-full select-none">
    <i className={cx(icon, "text-3xl text-j-gray-lighter self-center")} />
    <span className="text-2xl leading-none self-center">{value}</span>
  </div>
);

const DiscountView = ({ discount, id, onChange, visitorID }) => {
  const [submitted, setSubmitted] = useState(false);
  const [phoneNumber, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { loading, error: err, data } = useQuery(VERIFY_MEMBER, {
    variables: { input: { visitorID, phoneNumber } },
    skip: !submitted || !phoneNumber.length,
  });

  useEffect(() => {
    if (submitted && !loading) {
      console.log("ERROR", err);
      console.log("DATA", data);
      setSubmitted(false);
      setError(err);
      if (data) {
        // TODO: onChange
        // onChange(Object.assign({}, discount, { loyaltyMemberID: val }))
        setSuccess("Member validated!");
      }
    }
  }, [err, data]);

  console.log("PHONE", phoneNumber, visitorID);

  return (
    <div className="mb-16 text-j-white">
      <h4 className="uppercase pb-6">Adult {id}</h4>
      <DiscountFlag
        value={discount.defensePersonal}
        onChange={(val) =>
          onChange(Object.assign({}, discount, { defensePersonal: val }))
        }
      >
        Defense Personnel
      </DiscountFlag>
      <DiscountFlag
        value={discount.freedomFighter}
        onChange={(val) =>
          onChange(Object.assign({}, discount, { freedomFighter: val }))
        }
      >
        Freedom Fighter
      </DiscountFlag>
      <DiscountFlag
        value={discount.member}
        onChange={(val) =>
          onChange(Object.assign({}, discount, { member: val }))
        }
      >
        Jalesh Loyalty Member
      </DiscountFlag>
      {discount.member && (
        <>
          <PhoneField
            name="phone"
            placeholder="Registered mobile number"
            lessSpace
            defaultValue={phoneNumber}
            inverseError
            error={error && "This number doesn't seem valid"}
            onChange={({ target: { value: phone } }) => {
              setPhone(phone.replace(" ", ""));
              setSuccess("");
            }}
          />

          <Button
            className="w-full border border-jwhite bg-j-magenta text-j-white"
            disabled={loading}
            onClick={() => {
              setSubmitted(true);
              setError("");
            }}
          >
            {success || (loading ? "Checking..." : "Apply")}
          </Button>
        </>
      )}
    </div>
  );
};

const DiscountFlag = ({ children, value, onChange }) => (
  <div className="flex mb-6 cursor-pointer" onClick={() => onChange(!value)}>
    <i
      className={cx(
        "fal pr-6 text-lg self-center leading-none",
        value ? "fa-check-square" : "fa-square"
      )}
    />
    <p className="leading-0 pt-1">{children}</p>
  </div>
);

const createRoom = (id) => ({
  id,
  adults: 1,
  children: 0,
  infants: 0,
  min: 1,
  max: 4,
  discounts: [createDiscount()],
  open: true,
});

const createDiscount = () => ({
  defense: false,
  fighter: false,
  member: false,
  memberPhone: null,
});
