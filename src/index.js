import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = document.getElementById("root");
const Root = createRoot(Container);
Root.render(

    <App />

);
