import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { SidebarProvider } from "@/app/context/SidebarContext";

// Públicas
import SPA from "../views/spa";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Services from "../views/spa/services";
import Workers from "../views/spa/workers";
import NotFound from "../views/404";

// Cliente
import ClientProfile from "../views/client/profile";
import ClientDashboard from "../views/client/dashboard";
import ClientWorkers from "../views/client/workers";
import ClientServices from "../views/client/services";
import ClientInvoices from "../views/client/invoices";
import WorkerDetail from "../views/client/workerDetail";

// Worker
import ProfessionalProfile from "../views/worker/profile";
import WorkerDashboard from "../views/worker/dashboard";
import WorkerServices from "../views/worker/services";

// Admin
import AdminDashboard from "../views/admin/dashboard";
import AdminUsers from "../views/admin/users";
import AdminInvoices from "../views/admin/invoices";
import AdminProfile from "../views/admin/profile";

function ClientLayout() {
  return (
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  );
}

function WorkerLayout() {
  return (
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  );
}

function AdminLayout() {
  return (
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rotas Públicas */}
        <Route path="/" element={<SPA />} />
        <Route path="/services" element={<Services />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas Cliente */}
        <Route element={<ClientLayout />}>
          <Route path="/client/profile"            element={<ClientProfile />} />
          <Route path="/client/dashboard"          element={<ClientDashboard />} />
          <Route path="/client/workers"      element={<ClientWorkers />} />
          <Route path="/client/workers/:id"  element={<WorkerDetail />} />
          <Route path="/client/services"           element={<ClientServices />} />
          <Route path="/client/invoices"           element={<ClientInvoices />} />
        </Route>

        {/* Rotas Worker */}
        <Route element={<WorkerLayout />}>
          <Route path="/worker/profile"   element={<ProfessionalProfile />} />
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/services"  element={<WorkerServices />} />
        </Route>

        {/* Rotas Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users"     element={<AdminUsers />} />
          <Route path="/admin/invoices"  element={<AdminInvoices />} />
          <Route path="/admin/profile"   element={<AdminProfile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}