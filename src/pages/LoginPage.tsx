import { supabase } from "@/api/supabase";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ provider: "google" });
  };
  return (
    <div>
      <Button onClick={handleLogin}>Continue with Google</Button>
    </div>
  );
};

export default LoginPage;
