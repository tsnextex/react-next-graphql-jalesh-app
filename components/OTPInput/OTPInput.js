import React, { useRef, useState, useEffect } from "react";
import cx from "classnames";

const OTPInput = ({ error, onChange, fields = 4 }) => {
  const [numbers, setNumbers] = useState([]);
  const f = [];
  const refs = [];

  for (let x = 0; x < fields; x++) {
    refs[x] = useRef();
    f.push(
      <input
        className={cx(
          "w-12 h-12 rounded border text-2xl text-center font-bold leading-none",
          error ? "border-j-red text-j-red shadow-error" : "border-j-gray-light"
        )}
        type="number"
        key={x}
        maxLength={1}
        onChange={(e) => {
          const newNumbers = [...numbers];
          newNumbers[x] = e.target.value;
          console.log("onChange", newNumbers);
          setNumbers(newNumbers);
          onChange && onChange(newNumbers.filter((n) => n).join(""));
        }}
        ref={refs[x]}
      />
    );
  }

  useEffect(() => {
    let focusSet = false;
    refs.forEach((ref, x) => {
      if (focusSet) return;
      if (!numbers[x] && ref.current) {
        ref.current.focus();
        focusSet = true;
      }
    });
  }, [numbers]);

  return (
    <>
      <div className="flex justify-around">{f}</div>
      {error && <div className="text-sm pt-4 pl-7 text-j-red">{error}</div>}
    </>
  );
};

export default OTPInput;
