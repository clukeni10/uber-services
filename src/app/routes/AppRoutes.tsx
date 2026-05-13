import { BrowserRouter, Route, Routes } from "react-router-dom";
import SPA from "../views/spa";
import Login from "../views/auth/login";
import RegisterClient from "../views/auth/registerClient";
import RegisterProfessional from "../views/auth/registerProfessional";
import ClientProfile from "../views/client/profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SPA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/register-client" element={<RegisterClient />} />
        <Route
          path="/auth/register-professional"
          element={<RegisterProfessional />}
        />
        <Route path="client/profile" element={<ClientProfile/>} />
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
