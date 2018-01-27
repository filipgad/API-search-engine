import React from "react";
import ReactDOM from "react-dom";

import App from "containers/App";
import Search from "containers/Search";

import 'styles/main.sass';

ReactDOM.render(
  <div>
    <Search />
    <App />
  </div>,
  document.getElementById("root")
);
