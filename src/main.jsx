import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Router, store } from "./config";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql/apollo-client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
