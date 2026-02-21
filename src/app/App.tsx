import { useEffect } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  // Set dark theme by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <Dashboard />
      <Toaster />
    </>
  );
}