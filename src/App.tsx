import React from "react";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/dashboard/header";
import { UserProfile } from "./components/dashboard/user-profile";
import { BenefitsSection } from "./components/dashboard/benefits-section";
import { RewardProgressSection } from "./components/dashboard/reward-progress";
import { mockDashboardData } from "./data/mockData";
import "./index.css";

function Dashboard() {
  const { user, benefits, rewardProgress } = mockDashboardData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <UserProfile user={user} />
        <BenefitsSection benefits={benefits} />
        <RewardProgressSection rewardProgress={rewardProgress} />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="cred-garage-theme">
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route>
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Page Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                The page you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;