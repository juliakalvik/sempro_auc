import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function LogoutTest() {
  const navigate = useNavigate();

  useEffect(() => {
    // Effect to run when component mounts
    localStorage.clear();
    navigate({ to: "/login" });
    return () => {};
  }, [navigate]);

  return (
    <div>
      <h2>You have been logged out.</h2>
    </div>
  );
}
