import { Outlet } from "@tanstack/react-router";
import "./App.css";
import "tailwindcss/tailwind.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <header>{/*   <Navbar /> */}</header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>Created with ❤️ by Julia</small>
      </footer>
    </>
  );
}

export default App;
