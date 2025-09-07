import { Toaster } from "@/utils/toaster";
import { Toaster as Sonner } from "@/utils/sonner";
import { TooltipProvider } from "@/utils/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUp } from "./pages/SignUp/SignUp";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./providers/providers";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import NotFound from "./pages/NotFound/NotFound";
import ReservationsPage from "@/pages/ReservationsPage/ReservationsPage";
import UserList from "./components/UserList/UserList";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* No header/footer */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />

            {/* With header/footer */}
            <Route
              path="/rooms"
              element={
                <Layout>
                  <RoomsPage />
                </Layout>
              }
            />
            <Route
              path="/reservations"
              element={
                <Layout>
                  <ReservationsPage />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/home"
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />
            <Route
              path="/employees"
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
