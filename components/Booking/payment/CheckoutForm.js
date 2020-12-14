import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";

const CREATE_BOOKING = gql`
  mutation CreateBooking($input: BookingInput!) {
    createBooking(input: $input) {
      booking {
        id
        status
      }
      paymentData {
        amount
        hash
        cardInfo {
          isDomestic
          issuerBank
          cardType
          cardCategory
        }
      }
    }
  }
`;

const getDiscountCategory = ({ discount }) =>
  !discount
    ? null
    : discount.defense
    ? "defense"
    : discount.fighter
    ? "fighter"
    : discount.member
    ? "member"
    : null;

const CheckoutForm = ({
  booking,
  billingData,
  cancel,
  cardNumber,
  cvv,
  date,
  bank,
  code,
  upi,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const bookingInput = {
    contact: {
      name: billingData.name,
      email: billingData.email,
      phoneNumber: billingData.phone,
    },
    rooms: booking.rooms.map((room) => ({
      priceKey: room.selected.priceKey,
      guests: room.guests.map((guest, i) => ({
        name: guest.name,
        type:
          i < room.adults
            ? "ADULT"
            : i < room.adults + room.children
            ? "CHILD"
            : "INFANT",
        discountCategory: getDiscountCategory(room.discounts[i]), // TODO: what values? It can be pulled from room.discounts
        email: guest.email,
        phoneNumber: guest.phone,
        idType: guest.doc,
        idNumber: guest.passNumber,
        gender: guest.gender.toUpperCase(),
        dateOfBirth: moment(guest.dob).format("YYYY-MM-DD"),
        country: guest.country,
        state: guest.state,
        citizenship: guest.country,
      })),
    })),
    paymentInfo: {
      plan: "",
      voucherNumber: "",
      promoCode: "",
      name: billingData.name,
      email: billingData.email,
    },
  };

  if (cardNumber) {
    bookingInput.paymentInfo.cardInfo = {
      bin: cardNumber.slice(0, 6),
    };
  }

  // console.log("booking", booking);
  // console.log("billingData", billingData);
  // console.log(JSON.stringify(bookingInput, null, 4));

  const [createBooking, { data }] = useMutation(CREATE_BOOKING, {
    onError: (error) => {
      console.log("Apollo contact error", error);
      cancel(true);
    },
  });

  useEffect(() => {
    if (!submitted) {
      createBooking({
        variables: { input: bookingInput },
      });
      setSubmitted(true);
    }
  }, [submitted]);

  useEffect(() => {
    if (submitted && data) {
      console.log("JSH response", data);
      console.log("submitting form", formRef, formRef && formRef.current);
      if (formRef && formRef.current) {
        formRef.current.submit();
      }
    }
  }, [submitted, data]);

  if (!data) return <div />;

  const { createBooking: bookingData } = data;

  const productDescription = `${
    booking.nightCount ? `${booking.nightCount} Nights, ` : ""
  }${booking.route.ports.map((p) => p.port.code).join(" - ")} on ship ${
    booking.itinerary.ship.name
  }`;
  const pg = cardNumber ? "CC" : bank ? "NB" : "UPI";
  const bankCode = code || (upi ? "UPI" : "CC");
  const successUrl = `${window.location.origin}/booking/success`;
  const failUrl = `${window.location.origin}/booking/fail`;

  return (
    <form action={process.env.NEXT_PUBLIC_PAYU_URL} method="post" ref={formRef}>
      <input type="hidden" name="hash" value={bookingData.paymentData.hash} />
      <input type="hidden" name="firstname" value={billingData.name} />
      <input type="hidden" name="surl" value={successUrl} />
      <input type="hidden" name="phone" value={billingData.phone} />
      <input type="hidden" name="furl" value={failUrl} />
      <input
        type="hidden"
        name="key"
        value={process.env.NEXT_PUBLIC_PAYU_KEY}
      />
      <input type="hidden" name="txnid" value={bookingData.booking.id} />
      <input
        type="hidden"
        name="Amount"
        value={parseFloat(bookingData.paymentData.amount).toFixed(2)}
      />
      <input type="hidden" name="productinfo" value="Cruise package" />
      <input type="hidden" name="email" value={billingData.email} />
      <input type="hidden" name="pg" value={pg} />
      <input type="hidden" name="bankcode" value={bankCode} />
      {pg === "CC" && (
        <>
          <input type="hidden" name="ccnum" value={cardNumber} />
          <input type="hidden" name="ccname" value={billingData.name} />
          <input type="hidden" name="ccvv" value={cvv} />
          <input
            type="hidden"
            name="ccexpmon"
            value={moment(date).format("MM")}
          />
          <input
            type="hidden"
            name="ccexpyr"
            value={moment(date).format("YYYY")}
          />
        </>
      )}
      {pg === "UPI" && <input type="hidden" name="vpa" value={upi} />}
      {/*<button type="submit">Submit</button>*/}
    </form>
  );
};

export default CheckoutForm;
