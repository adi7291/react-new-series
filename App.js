import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./logo.png";

import Header from "./src/components/Header";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";
import Body1 from "./src/components/Body1";
import Error from "./src/components/Error";

import { createBrowserRouter, RouterProvider } from "react-router";

import About from "./src/components/About";
import Contact from "./src/components/Contact";

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
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

const rootDom = ReactDOM.createRoot(document.getElementById("root"));

rootDom.render(<RouterProvider router={appRouter} />);
