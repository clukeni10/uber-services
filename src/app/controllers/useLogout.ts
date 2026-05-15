import { useNavigate } from "react-router-dom";
import { logout } from "../models/auth";

export function useLogout() {
      const navigate = useNavigate();

      function handleLogout() {
            logout();
            navigate("/login");
      }

      return { handleLogout };
}