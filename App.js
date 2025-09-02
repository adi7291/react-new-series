import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./logo.png";

import Header from "./src/components/Header";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";

const AppLayout = () => {
  return (
    <React.Fragment>
      {/* Header */}
      <Header />
      {/* Body */}
      <Body />

      {/*Footer */}
      <Footer />
    </React.Fragment>
  );
};

const rootDom = ReactDOM.createRoot(document.getElementById("root"));

rootDom.render(<AppLayout />);
