import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
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
import WorkerInvoices from "../views/worker/invoices";

// Admin
import AdminDashboard from "../views/admin/dashboard";
import AdminUsers from "../views/admin/users";
import AdminInvoices from "../views/admin/invoices";
import AdminProfile from "../views/admin/profile";

// Função auxiliar para pegar a role (centralizada)
function getUserRole(): string {
  const stored = localStorage.getItem("user");
  if (!stored) return "guest";
  try {
    return JSON.parse(stored).role ?? "guest";
  } catch {
    return "guest";
  }
}

// Componente de Proteção de Rotas
interface ProtectedRouteProps {
  allowedRoles: string[];
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const role = getUserRole();

  if (role === "guest") {
    // Se não estiver logado, vai para o login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Se estiver logado mas tentar aceder a uma rota que não é dele, vai para o 404 (ou página não autorizado)
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
}

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
        <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
          <Route element={<ClientLayout />}>
            <Route path="/client/profile" element={<ClientProfile />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/workers" element={<ClientWorkers />} />
            <Route path="/client/workers/:id" element={<WorkerDetail />} />
            <Route path="/client/services" element={<ClientServices />} />
            <Route path="/client/invoices" element={<ClientInvoices />} />
          </Route>
        </Route>

        {/* Rotas Worker */}
        <Route element={<ProtectedRoute allowedRoles={["worker"]} />}>
          <Route element={<WorkerLayout />}>
            <Route path="/worker/profile" element={<ProfessionalProfile />} />
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/worker/services" element={<WorkerServices />} />
            <Route path="/worker/invoices" element={<WorkerInvoices />} />
          </Route>
        </Route>

        {/* Rotas Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/invoices" element={<AdminInvoices />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
