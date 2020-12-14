import React from "react";
import { useRouter } from "next/router";
import goTo from "../../utils/goTo";
import View from "../View/View";
import Button from "../Button/Button";

import styles from "./HealthyWaves.module.scss";

const HealthyWavesView = () => {
  const router = useRouter();

  return (
    <View
      description="healthy waves"
      title={
        <>
          Is it safe for a <b>cruise holiday</b>?
        </>
      }
      theme="magenta"
    >
      <h3>
        Yes! We have introduced the <b>Healthy Waves</b> program to ensure the
        safety of our guests
      </h3>
      <Button
        className={styles.button}
        onClick={goTo(router, "/healthy-waves")}
      >
        <div className="flex-grow text-center">
          <img src="/images/healthy-waves.png" className="h-13 inline-block" />
        </div>
        <i className="fal fa-arrow-right text-j-magenta text-xl ml-10 pb-1"></i>
      </Button>
    </View>
  );
};

export default HealthyWavesView;
