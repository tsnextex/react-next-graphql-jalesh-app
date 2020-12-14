import React, { useState, useEffect } from "react";
import UserContext from "../../store/UserContext";
import View from "../../components/View/View";
import Header from "../../components/Header/Header";
import FooterView from "../../components/Footer/Footer";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Booking/ProductCard";
import RoomsCard from "../../components/Booking/RoomsCard";
import SelectionCard from "../../components/Booking/SelectionCard";
import GuestsCard from "../../components/Booking/GuestsCard";
import NoBookingView from "../../components/Booking/NoBookingView";
import ProfileForm from "../../components/Booking/ProfileForm";
import RoomsForm from "../../components/Booking/RoomsForm";
import OTPForm from "../../components/Booking/OTPForm";
import RoomSelectionForm from "../../components/Booking/RoomSelectionForm";
import GuestInfoForm from "../../components/Booking/GuestInfoForm";
import PaymentView from "../../components/Booking/payment/PaymentView";
import ConfirmationView from "../../components/Booking/ConfirmationView";

const getInitialStep = (booking) => {
  if (!booking.nightCount) {
    return 0;
  }
  if (!booking.OTPSent) {
    return 1;
  }
  if (!booking.visitorID) {
    return 2;
  }
  if (!booking.rooms) {
    return 3;
  }
  if (!booking.roomsSelected) {
    return 4;
  }
  if (!booking.guestsFilled) {
    return 5;
  }
  return 6;
};

const StepForms = [
  NoBookingView,
  ProfileForm,
  OTPForm,
  RoomsForm,
  RoomSelectionForm,
  GuestInfoForm,
  PaymentView,
  ConfirmationView,
];

const Booking = () => {
  const [user, setUser] = React.useContext(UserContext);

  const booking = user.booking || {};
  console.log("Booking", booking);

  const [step, setStep] = React.useState(getInitialStep(booking));
  console.log("Booking step", step);

  useEffect(() => {
    console.log("Switching steps");
    setStep(getInitialStep(booking));
  }, [user]);

  const StepForm = StepForms[step];

  // Fix of rendering debris because of SSR structural mismatch
  if (typeof window === "undefined") return <div />;

  return (
    <Layout title="Booking">
      <Header
        light
        className="bg-j-blue-lighter text-j-white"
        style={{
          height: "auto",
        }}
      />
      <main className="bg-auto">
        <View theme="blue">
          {step < 5 && (
            <>
              {booking.itinerary && <ShipView itinerary={booking.itinerary} />}
              <ProductCard booking={booking} small={step > 1} />
              {step > 3 && (
                <RoomsCard booking={booking} goTo={() => setStep(3)} />
              )}
              {step > 4 && (
                <SelectionCard booking={booking} goTo={() => setStep(4)} />
              )}
              {step > 5 && (
                <GuestsCard booking={booking} goTo={() => setStep(5)} />
              )}
            </>
          )}
          {<StepForm />}
        </View>
      </main>
      <FooterView />
    </Layout>
  );
};

export default Booking;

const ShipView = ({ itinerary }) => (
  <div className="flex mb-1">
    <i className="fal fa-ship pr-4 text-2xl text-j-gray-lighter leading-none pb-0 self-center" />
    <h1 className="alt self-center mt-2 font-medium">
      Ship: {itinerary.ship.name}
    </h1>
  </div>
);
