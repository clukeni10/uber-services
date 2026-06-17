import { BrowserRouter, Route, Routes } from "react-router-dom";
import SPA from "../views/spa";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import ClientProfile from "../views/client/profile";
import ProfessionalProfile from "../views/professional/profile";
import ClientDashboard from "../views/client/dashboard";
import ClientProfessionals from "../views/client/professionals";
import WorkerDashboard from "../views/professional/dashboard";
import ClientServices from "../views/client/services";
import WorkerDetail from "../views/client/professionalDetail";
import WorkerServices from "../views/professional/services";
import Workers from "../views/spa/workers";
import ClientInvoices from "@/app/views/client/invoices";
import Services from "@/app/views/spa/services";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        //Rotas Públicas
        <Route path="/" element={<SPA />} />
        <Route path="/services" element={<Services />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        //Rotas Profissional
        <Route path="/worker/profile" element={<ProfessionalProfile />} />
        <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        <Route path="/worker/services" element={<Services />} />


        //Rotas Cliente
        <Route path="/client/profile" element={<ClientProfile />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/workers" element={<ClientProfessionals/>} />
        <Route path="/client/services" element={<ClientServices/>} />
        <Route path="/client/workers/:id" element={<WorkerDetail />} />
<Route path="/client/invoices" element={<ClientInvoices />} />
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
