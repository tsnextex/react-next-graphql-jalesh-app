import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import goTo from "../../utils/goTo";
import Button, { ArrowLinkButton } from "../Button/Button";

const calculateTimeLeft = (d) => {
  if (!d) return null;
  let difference = d - new Date();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const padWithZeros = (n) => Number(n).toString().padStart(2, "0");

const MainPromotion = ({ promotion }) => {
  const [initialTime, setInitialTime] = useState(promotion.endDate);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(initialTime));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(initialTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <h1 className="alt">promotion</h1>
      <h2 className="text-j-magenta">{promotion.longTitle}</h2>
      <div className="flex mb-8">
        <Button className="bg-j-red text-j-white">Book now</Button>
        {timeLeft && (
          <div className="flex flex-col text-j-gray-light justify-center ml-1">
            <span className="text-xs">Offer ends in</span>
            <span className="leading-6 text-2xl">
              {`${padWithZeros(timeLeft.days)}:${padWithZeros(
                timeLeft.hours
              )}:${padWithZeros(timeLeft.minutes)}:${padWithZeros(
                timeLeft.seconds
              )}`}
            </span>
          </div>
        )}
      </div>
      <ArrowLinkButton>See all promotions</ArrowLinkButton>
    </>
  );
};

export default MainPromotion;

export const MainPromotionFallback = withRouter(({ title, router }) => (
  <>
    <h1 className="alt">search</h1>
    <h2 className="text-j-magenta">{title}</h2>
    <div className="flex mb-8">
      <Button
        className="bg-j-red text-j-white"
        onClick={goTo(router, "/destinations")}
      >
        Book now
      </Button>
    </div>
    <ArrowLinkButton onClick={goTo(router, "/destinations")}>
      See all destinations
    </ArrowLinkButton>
  </>
));
