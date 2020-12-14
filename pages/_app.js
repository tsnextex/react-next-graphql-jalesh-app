import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { PageTransition } from "next-page-transitions";
import apolloClient from "../store/ApolloClient";
import { UserProvider } from "../store/UserContext";

import "../styles/globals.scss";

const DEFAULT_STATE = {
  placeLoaded: false,
  place: {
    // TODO: Set default place here, might be flexible depending on the theme.
    address: "Bangalore",
    coordinates: [40.741895, -73.989308],
  },
};
const STORE_NAME = "store";

function MyApp({ Component, pageProps, router }) {
  const hasLocal = typeof window !== "undefined" && window.localStorage;
  const storedState = hasLocal
    ? JSON.parse(window.localStorage.getItem(STORE_NAME))
    : {};
  const [user, setUser] = useState(
    Object.assign({}, DEFAULT_STATE, storedState)
  );

  const setStore = (value) => {
    if (hasLocal)
      window.localStorage.setItem(STORE_NAME, JSON.stringify(value));
    setUser(value);
  };

  return (
    <PageTransition timeout={300} classNames="page-transition">
      <ApolloProvider client={apolloClient} key={router.route}>
        <UserProvider value={[user, setStore]}>
          <Component {...pageProps} />
        </UserProvider>
      </ApolloProvider>
    </PageTransition>
  );
}

export default MyApp;
