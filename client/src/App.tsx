
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { SponsorCRM } from "./pages/SponsorCRM";
import { Deliverables } from "./pages/Deliverables";
import { SponsorLists } from "./pages/SponsorLists";
import { SponsorListMarketplace } from "./pages/SponsorListMarketplace";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Layout>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/crm" component={SponsorCRM} />
            <Route path="/deliverables" component={Deliverables} />
            <Route path="/sponsor-lists" component={SponsorLists} />
            <Route path="/sponsor-marketplace" component={SponsorListMarketplace} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
