
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { SponsorCRM } from "./pages/SponsorCRM";
import { Deliverables } from "./pages/Deliverables";
import { SponsorLists } from "./pages/SponsorLists";
import { SponsorshipTiers } from "./pages/SponsorshipTiers";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="crm" element={<SponsorCRM />} />
            <Route path="deliverables" element={<Deliverables />} />
            <Route path="sponsor-lists" element={<SponsorLists />} />
            <Route path="tiers" element={<SponsorshipTiers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
