import { ChangeEvent, useEffect, useState } from "react";
import styles from "./PriceInterval.module.scss";
import { debounce } from "../../../../utils/debounce";

interface PriceIntervalProps {
  from?: number;
  to?: number;
  min: number;
  max: number;
  setPriceInterval: (interval: { from: number, to: number; }) => void;
}

export function PriceInterval({
  from,
  to,
  min,
  max,
  setPriceInterval
}: PriceIntervalProps) {
  from = from || min;
  to = to || max;

  const onChangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (value!==from) setPriceInterval({
      from: value,
      to:to!,
    });
  };
  const onChangeTo = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (value!==to) setPriceInterval({
      from:from!,
      to: value,
    });
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Price</h3>
      <span>From</span>
      <input
        type="number"
        className={styles.input}
        value={from}
        min={min}
        max={to}
        onChange={onChangeFrom}
      />
      <span>To</span>
      <input
        type="number"
        className={styles.input}
        value={to}
        min={from}
        max={max}
        onChange={onChangeTo}
      />
    </div>
  );
}
