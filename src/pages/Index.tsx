import { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";

const Index = () => {
  // Temporarily mock authentication until Supabase is properly connected
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // For demo purposes, show dashboard directly
  // Replace with: return user ? <Dashboard /> : <AuthLayout />;
  return <Dashboard />;
};

export default Index;
