import React from "react";
import { useRouter } from "next/router";
import goTo from "../../utils/goTo";
import View from "../View/View";
import Button from "../Button/Button";

const FaqView = () => {
  const router = useRouter();

  return (
    <View
      description="faq"
      title={
        <>
          Have questions?
          <b>Get the answers</b>
        </>
      }
    >
      <Button
        className="h-15 rounded-huge w-full mb-3 text-lg bg-j-orange text-j-white mt-4"
        onClick={goTo(router, "/faq")}
      >
        <span className="w-full text-center normal-case font-normal">
          Frequently asked questions
        </span>
      </Button>
    </View>
  );
};

export default FaqView;
