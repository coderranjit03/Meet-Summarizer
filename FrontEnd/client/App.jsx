import "./global.css";

import { Toaster } from "@/components/ui/toaster";
// import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import NotFound from "./pages/NotFound.jsx";
import AppMain from "./pages/AppMain.jsx";
import { Header } from "@/components/layout/Header.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import { AuthModalProvider } from "@/lib/authModalContext.jsx";
import AuthModal from "@/components/AuthModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Auth modal provider */}
      <AuthModalProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/app" element={<AppMain />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <AuthModal />
        </BrowserRouter>
      </AuthModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// createRoot(document.getElementById("root")).render(<App />);
export default App;
