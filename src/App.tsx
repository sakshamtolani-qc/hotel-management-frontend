import { Toaster } from "@/utils/toaster";
import { Toaster as Sonner } from "@/utils/sonner";
import { TooltipProvider } from "@/utils/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUp } from "./pages/SignUp/SignUp";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./providers/providers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import NotFound from "./pages/NotFound";

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
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
