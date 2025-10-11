import React, { createContext, useContext, useState, useEffect } from 'react';
import { Toaster } from "@/utils/toaster";
import { Toaster as Sonner } from "@/utils/sonner";
import { TooltipProvider } from "@/utils/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {SignUp} from "./pages/SignUpPage/SignUpPage";
import {LoginPage}  from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./providers/providers";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import NotFound from "./pages/NotFound/NotFound";
import ReservationsPage from "@/pages/CreateReservationsPage/CreateReservationsPage";
import UserList from "./pages/UserListPage/UserListPage";
import Landing from "./pages/Landing/Landing";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import RoomDetails from '@/pages/RoomDetails/RoomDetails';
import InvoiceDetailsPage from '@/pages/InvoiceDetailsPage/InvoiceDetailsPage';
import ReservationsListPage from '@/pages/ReservationsListPage/ReservationsListPage';
import AddRoomPg from '@/pages/AddRoomPage/AddRoomPage';
import Settings from './pages/SettingsPage/Settings';
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute"; // new wrapper

// -------------------- Loading Context --------------------
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingCount: number;
  incrementLoading: () => void;
  decrementLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const isLoading = loadingCount > 0;

  const setIsLoading = (loading: boolean) => {
    setLoadingCount(loading ? 1 : 0);
  };

  const incrementLoading = () => {
    setLoadingCount(prev => prev + 1);
  };

  const decrementLoading = () => {
    setLoadingCount(prev => Math.max(0, prev - 1));
  };

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setIsLoading,
      loadingCount,
      incrementLoading,
      decrementLoading
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

// -------------------- Layout --------------------
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();
  const [hasLoaderInDOM, setHasLoaderInDOM] = useState(false);

  useEffect(() => {
    const checkForLoaders = () => {
      const loaderSelectors = [
        '.page-loader',
        '[data-loading="true"]',
        // Exclude image loader overlays from hiding header
        '.loader:not(.image-loader-overlay .loader)',
        '.loading:not(.image-loader-overlay)',
        '[role="status"]'
      ];

      const hasAnyLoader = loaderSelectors.some(selector => {
        const elements = document.querySelectorAll(selector);
        return elements.length > 0 && Array.from(elements).some(el =>
          el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0
        );
      });

      setHasLoaderInDOM(hasAnyLoader);
    };

    checkForLoaders();

    const observer = new MutationObserver(() => {
      setTimeout(checkForLoaders, 50);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-loading', 'role']
    });

    const interval = setInterval(checkForLoaders, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const shouldHideHeaderFooter = isLoading || hasLoaderInDOM;

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main className={shouldHideHeaderFooter ? "min-h-screen" : ""}>
        {children}
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

// -------------------- App --------------------
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <LoadingProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/invoice"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <InvoiceDetailsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/rooms"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RoomsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/rooms/:roomId"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <RoomDetails />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reservations/create"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ReservationsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reservations"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ReservationsListPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Landing />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <UserList />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/addroom"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AddRoomPg />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <NotFound />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
