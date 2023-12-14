import LoginForm from "../components/loginForm";
import { logoutUser } from "../lib/api";

export default function LogoutTest() {
  logoutUser();
  return (
    <>
      <h2>
        You have been logged out, if you wish to log in, use the form below
      </h2>
      <LoginForm />
    </>
  );
}
