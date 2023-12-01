import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { Home, Login, Signup } from "./pages";
import { HomeTest } from "./pages/Home";

import { Outlet } from "@tanstack/react-router";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomeTest />} />
          <Route path="/home" element={<HomeTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
