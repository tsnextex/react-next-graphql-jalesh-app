import React from "react";
import { withRouter } from "next/router";
import goTo from "../../utils/goTo";
import View from "../View/View";
import Button from "../Button/Button";
import LocationSelect from "../LocationSelect/LocationSelect";

const SearchView = withRouter(({ router }) => (
  <View
    description="search"
    title={
      <>
        Find your <b>perfect cruise</b>
      </>
    }
    theme="magenta"
  >
    <LocationSelect className="mb-12" />
    <div className="my-8">
      <Button
        className="rounded-huge w-full mb-3"
        between
        onClick={goTo(router, "/routes")}
      >
        <i className="fal fa-calendar-alt text-j-gray-light text-2xl pb-1"></i>
        <span className="text-lg text-j-black normal-case font-normal">
          Search by <b>date</b>
        </span>
        <i className="fal fa-arrow-right text-j-magenta text-2xl pb-1"></i>
      </Button>
      <Button
        className="rounded-huge w-full"
        between
        onClick={goTo(router, "/routes")}
      >
        <i className="far fa-rupee-sign text-j-gray-light text-2xl pb-1"></i>
        <span className="text-lg text-j-black normal-case font-normal">
          Search by <b>budget</b>
        </span>
        <i className="fal fa-arrow-right text-j-magenta text-2xl pb-1"></i>
      </Button>
    </div>
  </View>
));

export default SearchView;
