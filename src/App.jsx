import { Outlet } from "@tanstack/react-router";
import "./App.css";

function App() {
  return (
    <>
      <header>{/*   <Navbar /> */}</header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>Created with ❤️ Julia</small>
      </footer>
    </>
  );
}

export default App;
