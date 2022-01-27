import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";

// import ThirdWeb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

// include what chains you wanna support
// 4 = Rinkeby
const supportedChainIds = [4];

// Include what typ of wallet you want to support.
// here, we support Metamask which is an "injected wallet"
const connectors = {
  injected: {},
};

// Render the App component to the DOM
// Wrap app with ThirdwebWeb3Provider
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);