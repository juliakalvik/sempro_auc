import { Link } from "@tanstack/react-router";
import "./navbar.css";

export default function Header() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/addlisting" className="nav-link">
            + listing
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">
            My profile
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
            Log in
          </Link>
        </li>
        <li>
          <Link to="/signup" className="nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
}
