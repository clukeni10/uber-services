import { BrowserRouter, Route, Routes } from "react-router-dom";
import SPA from "../views/spa";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import ClientProfile from "../views/client/profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SPA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="client/profile" element={<ClientProfile/>} />
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
