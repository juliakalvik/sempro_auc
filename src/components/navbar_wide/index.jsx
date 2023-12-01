import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <>
      <h1>Header: react hello</h1>
      <nav className="bar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
