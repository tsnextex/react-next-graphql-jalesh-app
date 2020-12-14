import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import cx from "classnames";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import BookingFormView from "./BookingFormView";
import UserContext from "../../store/UserContext";
import Tile from "../Tile/Tile";
import {
  name,
  phone,
  email,
  date,
  passNumber,
  gender,
} from "../../utils/validations";
import InputField from "../Form/InputField";
import PhoneField from "../Form/PhoneField";
import SelectField from "../Form/SelectField";
import RadioField from "../Form/RadioField";

export const GuestInfoForm = () => {
  const [user, setUser] = useContext(UserContext);

  const booking = user.booking || {};
  const { rooms } = booking;
  const joiObject = {};

  rooms.forEach((room, roomIndex) => {
    const count = room.adults + room.children + room.infants;
    for (let guestIndex = 0; guestIndex < count; guestIndex++) {
      const prefix = `${roomIndex}_${guestIndex}`;
      joiObject[`${prefix}_name`] = name;
      joiObject[`${prefix}_gender`] = gender;
      joiObject[`${prefix}_phone`] = phone;
      joiObject[`${prefix}_email`] = email;
      joiObject[`${prefix}_dob`] = date;
      joiObject[`${prefix}_country`] = name;
      joiObject[`${prefix}_state`] = name;
      joiObject[`${prefix}_doc`] = name;
      joiObject[`${prefix}_passNumber`] = passNumber;
    }
  });

  const { register, errors, handleSubmit, setError } = useForm({
    resolver: joiResolver(Joi.object(joiObject)),
  });

  const onSubmit = (data) => {
    const newRooms = [...rooms].map((room) =>
      Object.assign({}, room, {
        guests: [...(room.guests || [])].map((guest) =>
          Object.assign({}, guest)
        ),
      })
    );

    Object.keys(data).forEach((key) => {
      const [roomIndex, guestIndex, field] = key.split("_");
      const guest =
        newRooms[parseInt(roomIndex)].guests[parseInt(guestIndex)] || {};
      newRooms[parseInt(roomIndex)].guests[
        parseInt(guestIndex)
      ] = Object.assign({}, guest, { [field]: data[key] });
    });

    setUser(
      Object.assign({}, user, {
        booking: Object.assign({}, booking, {
          rooms: newRooms,
          guestsFilled: true,
        }),
      })
    );
  };

  return (
    <BookingFormView
      title="Now let's add the details of the guests."
      buttonText="Save & Continue"
      onClick={handleSubmit(onSubmit)}
      id="guest-info-form"
    >
      <p className="text-j-gray">
        To save your reservation, we need the details of each traveler per
        stateroom. Remember, first and last names must match what appears on
        government-issued photo IDs.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {rooms.map((r, i) => (
          <RoomCard
            key={i}
            room={r}
            roomIndex={i}
            errors={errors}
            register={register}
          />
        ))}
      </form>
      {!!Object.keys(errors).length && (
        <p className="text-j-red pt-4 flex">
          <i className="fal fa-exclamation-triangle text-2xl px-4" />
          <span>
            Please enter all guests' details correctly before continuing.
          </span>
        </p>
      )}
    </BookingFormView>
  );
};

export default GuestInfoForm;

const RoomCard = ({ room, roomIndex, errors, register }) => {
  const [open, setOpen] = useState(roomIndex === 0);
  const count = room.adults + room.children + room.infants;
  const guests = room.guests || Array(count).fill({});

  useEffect(() => {
    if (
      !!Object.keys(errors).filter((key) => key.startsWith(`${roomIndex}_`))
        .length
    ) {
      setOpen(true);
    }
  }, [errors]);

  const guestForms = guests.map((guest, i) => (
    <GuestForm
      className={!open && "hidden"}
      guestType={
        i < room.adults
          ? "adult"
          : i < room.adults + room.children
          ? "child"
          : "infant"
      }
      key={i}
      index={i}
      roomIndex={roomIndex}
      guest={guest}
      errors={errors}
      register={register}
    />
  ));

  return (
    <Tile theme="magenta" shadow className="my-5" id={`room-${room.id}`}>
      <Tile.Inner>
        <h4
          className="uppercase pb-4 flex justify-between cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span>State room {room.id + 1}</span>
          <i
            className={cx("fal text-j-orange text-4xl leading-4", {
              "fa-angle-down": !open,
              "fa-angle-up": open,
            })}
          />
        </h4>
        <p>
          {room.selected.name}, {count} Guests
        </p>
        {guestForms}
      </Tile.Inner>
    </Tile>
  );
};

const GuestForm = ({
  index,
  roomIndex,
  guest,
  guestType,
  errors,
  register,
  className,
}) => {
  const [type, setType] = useState("text");
  const prefix = `${roomIndex}_${index}`;

  return (
    <div className={cx("pt-12", className)}>
      <h4>
        Guest {index + 1} ({guestType})
      </h4>
      <InputField
        icon="fal fa-user"
        placeholder="Full name"
        name={`${prefix}_name`}
        withIcon
        lessSpace
        defaultValue={guest.name}
        ref={register({ required: true })}
        inverseError
        error={
          errors && errors[`${prefix}_name`] && "Please enter a valid name"
        }
      />
      <RadioField
        name={`${prefix}_gender`}
        defaultValue={guest.gender}
        options={[
          { value: "female", label: "Female" },
          { value: "male", label: "Male" },
        ]}
        horizontal
        lessSpace
        inverseError
        ref={register({ required: true })}
        error={errors && errors[`${prefix}_gender`] && "Please select a gender"}
      />
      <InputField
        icon="fal fa-calendar-alt"
        type={type}
        onFocus={() => setType("date")}
        onBlur={() => setType("text")}
        placeholder="DOB"
        name={`${prefix}_dob`}
        withIcon
        lessSpace
        defaultValue={moment(guest.dob).format("YYYY-MM-DD")}
        ref={register({ required: true })}
        inverseError
        error={errors && errors[`${prefix}_dob`] && "Please enter a valid date"}
      />
      <SelectField
        icon="fal fa-globe"
        name={`${prefix}_country`}
        withIcon
        lessSpace
        defaultValue={guest.country || ""}
        ref={register({ required: true })}
        inverseError
        error={errors && errors[`${prefix}_country`] && "Please choose"}
      >
        {/* TODO: get from the backend */}
        <option value="" disabled hidden>
          Citizenship
        </option>
        <option value="India">India</option>
        <option value="UK">UK</option>
      </SelectField>
      <SelectField
        icon="fal fa-building"
        name={`${prefix}_state`}
        withIcon
        lessSpace
        defaultValue={guest.state || ""}
        ref={register({ required: true })}
        inverseError
        error={errors && errors[`${prefix}_state`] && "Please choose"}
      >
        {/* TODO: get from the backend */}
        <option value="" disabled hidden>
          State
        </option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Dharamshala">Dharamshala</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Nagpur (Winter)[46]">Nagpur (Winter)[46]</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="Dehradun">Dehradun</option>
        <option value="West Bengal">West Bengal</option>
      </SelectField>
      <PhoneField
        name={`${prefix}_phone`}
        placeholder="A 10-digit mobile number"
        ref={register({ required: true })}
        defaultValue={guest.phone}
        lessSpace
        inverseError
        error={
          errors &&
          errors[`${prefix}_phone`] &&
          "Please enter a correct phone number"
        }
      />
      <InputField
        icon="fal fa-envelope"
        name={`${prefix}_email`}
        placeholder="Email Address"
        ref={register({ required: true })}
        defaultValue={guest.email}
        lessSpace
        inverseError
        error={
          errors && errors[`${prefix}_email`] && "Please enter a valid email"
        }
      />
      <SelectField
        icon="fal fa-passport"
        name={`${prefix}_doc`}
        withIcon
        lessSpace
        defaultValue={guest.doc || ""}
        ref={register({ required: true })}
        inverseError
        error={errors && errors[`${prefix}_doc`] && "Please choose"}
      >
        {/* TODO: get from the backend */}
        <option value="" disabled hidden>
          Choose photo ID document
        </option>
        <option value="id">ID Card</option>
        <option value="passport">Passport</option>
      </SelectField>
      <InputField
        icon="fal fa-hashtag"
        placeholder="Photo ID number"
        name={`${prefix}_passNumber`}
        withIcon
        lessSpace
        defaultValue={guest.passNumber}
        ref={register({ required: true })}
        inverseError
        error={
          errors &&
          errors[`${prefix}_passNumber`] &&
          "Please enter a valid number"
        }
      />
    </div>
  );
};
