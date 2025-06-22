import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./styles/config.css"


const router = createBrowserRouter(
 [
   {
     path: "/",
     element: <Home />,
   },
   {
     path: "/qui-suis-je",
     element: <About/>,
   },
 ]
)

function App() {
  return <RouterProvider router={router} />;
}

export default App;
