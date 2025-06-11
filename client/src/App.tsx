
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { SponsorListProvider } from "./hooks/useSponsorListStore";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { SponsorCRM } from "./pages/SponsorCRM";
import { Automations } from "./pages/Automations";
import { SponsorLists } from "./pages/SponsorLists";
import { SponsorListMarketplace } from "./pages/SponsorListMarketplace";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/crm">
          <ProtectedRoute>
            <Layout>
              <SponsorCRM />
            </Layout>
          </ProtectedRoute>
        </Route>
        <Route path="/automations">
          <ProtectedRoute>
            <Layout>
              <Automations />
            </Layout>
          </ProtectedRoute>
        </Route>
        <Route path="/sponsor-lists">
          <ProtectedRoute>
            <Layout>
              <SponsorLists />
            </Layout>
          </ProtectedRoute>
        </Route>
        <Route path="/sponsor-marketplace">
          <ProtectedRoute>
            <Layout>
              <SponsorListMarketplace />
            </Layout>
          </ProtectedRoute>
        </Route>
        <Route path="/settings">
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        </Route>
        <Route path="/">
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SponsorListProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRouter />
        </TooltipProvider>
      </SponsorListProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
