import React, { useState } from "react";
import cx from "classnames";
import moment from "moment";

import styles from "./RangeCalendar.module.scss";

const weekTitles = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const DaysStream = ({
  currentMonth,
  startTime,
  endTime,
  selectable,
  selected,
  onClick,
}) => {
  let currentDate = moment(currentMonth).locale("ar");
  let currentDayOfWeek = 6;
  const daysStream = [];
  const className = cx("mb-2", { "cursor-pointer": selectable });

  while (currentDate.month() === currentMonth.month()) {
    currentDayOfWeek++;
    if (currentDayOfWeek === 7) currentDayOfWeek = 0;

    if (currentDayOfWeek !== currentDate.weekday()) {
      daysStream.push(
        <div className={className} key={currentDayOfWeek}>
          &nbsp;
        </div>
      );
      continue;
    }

    const cd = moment(currentDate);
    if (
      (startTime && currentDate < startTime) ||
      (endTime && currentDate > endTime)
    ) {
      daysStream.push(
        <div
          className={className}
          key={currentDate}
          onClick={() => onClick(cd)}
        >
          &nbsp;
        </div>
      );
      currentDate.add(1, "days");
      continue;
    }

    daysStream.push(
      <div
        key={currentDate}
        onClick={() => onClick(cd)}
        className={cx(className, {
          "bg-j-magenta cursor-pointer": selectable,
          [styles.selectable]: selectable,
          [styles.selected]: selectable && selected,
          "text-j-white": selectable && selected,
          "text-j-black": selectable && !selected,
          "rounded-l-full":
            selectable &&
            startTime &&
            currentDate.year() === startTime.year() &&
            currentDate.dayOfYear() === startTime.dayOfYear(),
          "rounded-r-full":
            selectable &&
            startTime &&
            currentDate.year() === endTime.year() &&
            currentDate.dayOfYear() === endTime.dayOfYear(),
        })}
      >
        {currentDate.date()}
      </div>
    );
    currentDate.add(1, "days");
  }
  return (
    <div
      className={cx(styles.calGrid, "text-2xl text-j-gray-lighter leading-11", {
        "absolute top-0 left-0 right-0": selectable,
      })}
    >
      {daysStream}
    </div>
  );
};

// Ranges: startTime, endTime
const RangeCalendar = ({
  ranges,
  selected: preselected,
  onSelectionChanged,
}) => {
  const earliestDate = moment(
    ranges.reduce((a, c) => (!a || a.startTime > c.startTime ? c : a), null)
      .startTime
  ).startOf("month");
  const latestDate = moment(
    ranges.reduce((a, c) => (!a || a.endTime < c.endTime ? c : a), null).endTime
  ).startOf("month");

  const [currentDate, setCurrentDate] = useState(earliestDate);
  const [selected, setSelected] = useState(preselected || []);
  const notSelected = ranges.filter((r) => selected.filter((r2) => r === r2));

  const adder = (nr) => {
    const newDate = moment(currentDate.add(nr, "month"));
    setCurrentDate(newDate);
  };

  const onSelectRange = (date) => {
    const clickedRanges = ranges.filter(
      (r) => r.startTime <= date && r.endTime >= date
    );
    if (clickedRanges.length === 0) return;

    let newSelected = [...selected];

    clickedRanges.forEach((range) => {
      const isSelected =
        newSelected.filter((s) => s.id === range.id).length > 0;
      newSelected = isSelected
        ? newSelected.filter((s) => s.id !== range.id)
        : [...newSelected, range];
    });

    setSelected(newSelected);
    onSelectionChanged && onSelectionChanged(newSelected);
  };

  const prevButton =
    moment(currentDate).add(-1, "month") >= earliestDate ? (
      <i
        className="fal fa-arrow-circle-left text-4xl cursor-pointer"
        onClick={() => adder(-1)}
      ></i>
    ) : null;
  const nextButton =
    moment(currentDate).add(1, "month") <= latestDate ? (
      <i
        className="fal fa-arrow-circle-right text-4xl cursor-pointer"
        onClick={() => adder(1)}
      ></i>
    ) : null;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="text-left w-12">{prevButton}</div>
        <div className="flex-grow text-2xl text-j-magenta text-center pt-1">
          {currentDate.locale("en").format("MMM YYYY")}
        </div>
        <div className="text-right w-12">{nextButton}</div>
      </div>
      <div
        className={cx(styles.calTitles, "text-j-gray uppercase text-xs pb-4")}
      >
        {weekTitles.map((t) => (
          <div key={t}>{t}</div>
        ))}
      </div>
      <div className="relative">
        <DaysStream currentMonth={currentDate} />
        {notSelected.map((range) => (
          <DaysStream
            currentMonth={currentDate}
            startTime={range.startTime}
            endTime={range.endTime}
            selectable
            selected={selected.filter((s) => s.id === range.id).length > 0}
            onClick={(date) => onSelectRange(date)}
          />
        ))}
        {selected.map((range) => (
          <DaysStream
            currentMonth={currentDate}
            startTime={range.startTime}
            endTime={range.endTime}
            selectable
            selected={selected.filter((s) => s.id === range.id).length > 0}
            onClick={(date) => onSelectRange(date)}
          />
        ))}
      </div>
    </div>
  );
};

export default RangeCalendar;
