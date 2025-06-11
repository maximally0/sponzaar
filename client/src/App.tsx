
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { SponsorListProvider } from "./hooks/useSponsorListStore";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
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
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Dashboard /> : <Login />}
        </Route>
        {user ? (
          <Layout>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/crm" component={SponsorCRM} />
              <Route path="/automations" component={Automations} />
              <Route path="/sponsor-lists" component={SponsorLists} />
              <Route path="/sponsor-marketplace" component={SponsorListMarketplace} />
              <Route path="/settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        ) : (
          <Login />
        )}
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
