import { useEffect, useState } from "react";
// import { User } from "@supabase/supabase-js";
// import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  email?: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement Supabase auth session management
    setLoading(false);
  }, []);

  const signOut = async () => {
    // TODO: Implement Supabase signOut
    setUser(null);
  };

  return {
    user,
    loading,
    signOut,
  };
};