import { Toaster } from "@/utils/toaster";
import { Toaster as Sonner } from "@/utils/sonner";
import { TooltipProvider } from "@/utils/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUp } from "./pages/SignUp/SignUp";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./providers/providers";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import NotFound from "./pages/NotFound/NotFound";
import ReservationsPage from "@/pages/ReservationsPage/ReservationsPage";
import UserList from "./components/UserList/UserList";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            {/* Catch-all route */}
             <Route path="/dashboard" element={<UserList />} />
            <Route path="/home" element={<UserList />} />
            <Route path="/employees" element={<UserList />} />
            <Route path="/" element={<UserList />} />
            <Route path="/dashboard" element={<Dashboard />} />
           {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
           <Route path="*" element={<UserList />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
