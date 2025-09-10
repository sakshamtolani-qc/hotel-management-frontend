import React, { createContext, useContext, useState, useEffect } from 'react';
import { Toaster } from "@/utils/toaster";
import { Toaster as Sonner } from "@/utils/sonner";
import { TooltipProvider } from "@/utils/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUp } from "./pages/SignUpPage/SignUpPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./providers/providers";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import NotFound from "./pages/NotFound/NotFound";
import ReservationsPage from "@/pages/CreateReservationsPage/CreateReservationsPage";
import UserList from "./pages/UserListPage/UserListPage";
import Landing from "./pages/Landing/Landing";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import ReservationsList from '@/pages/ReservationsListPage/ReservationsListPage';
import { mockReservations } from "@/data/mockReservations";
import RoomDetails from '@/pages/RoomDetails/RoomDetails';
import InvoiceDetailsPage from "@/pages/InvoiceDetailsPage/InvoiceDetailsPage";

// Loading Context
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

// Enhanced Layout component that hides header/footer during loading
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();

  // Check for any loader elements in the DOM
  const [hasLoaderInDOM, setHasLoaderInDOM] = useState(false);

  useEffect(() => {
    const checkForLoaders = () => {
      // Check for various loader classes and elements
      const loaderSelectors = [
        '.page-loader',
        '[data-loading="true"]',
        '.loader',
        '.loading',
        '[role="status"]',
        '.animate-spin',
        '.animate-pulse'
      ];

      const hasAnyLoader = loaderSelectors.some(selector => {
        const elements = document.querySelectorAll(selector);
        return elements.length > 0 && Array.from(elements).some(el =>
          el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0
        );
      });

      setHasLoaderInDOM(hasAnyLoader);
    };

    // Initial check
    checkForLoaders();

    // Set up mutation observer to watch for loader changes
    const observer = new MutationObserver(() => {
      setTimeout(checkForLoaders, 50); // Small delay to ensure DOM is updated
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-loading', 'role']
    });

    // Also check periodically
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
              {/* No header/footer */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />

              {/* With header/footer (conditional based on loading) */}
              <Route
                path="/invoice"
                element={
                  <Layout>
                  <InvoiceDetailsPage />
                </Layout>
                }/>
              <Route
                path="/rooms"
                element={
                  <Layout>
                    <RoomsPage />
                  </Layout>
                }
              />

              <Route
                path="/roomdetails"
                element={
                  <Layout>
                    <RoomDetails />
                  </Layout>
                }
              />

              <Route
                path="/reservations/create"
                element={
                  <Layout>
                    <ReservationsPage />
                  </Layout>
                }
              />
              <Route
                path="/reservations"
                element={
                  <Layout>
                    <ReservationsListPage />
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
                    <Landing />
                  </Layout>
                }
              />
              <Route
                path="/"
                element={
                  <Layout>
                    <Dashboard />
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
                path="*"
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
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