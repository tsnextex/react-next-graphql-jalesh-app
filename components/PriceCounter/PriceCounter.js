import React, { useEffect, useState } from "react";
import moment from "moment";

export const PriceCounter = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    setTimeout(() => setTimeLeft(getTimeLeft()), 1000);
  }, [timeLeft]);

  return (
    <>
      {children}{" "}
      {`${padWithZeros(timeLeft.get("hours"))}:${padWithZeros(
        timeLeft.get("minutes")
      )}:${padWithZeros(timeLeft.get("seconds"))}`}
    </>
  );
};

export default PriceCounter;

const padWithZeros = (n) => Number(n).toString().padStart(2, "0");

const getTimeLeft = () => {
  const now = moment().utcOffset("+05:30");
  const priceDate = moment(now).hour(3).minute(0).second(0);
  const left = priceDate.diff(now);
  return moment.duration(left >= 0 ? left : priceDate.add(1, "day").diff(now));
};
