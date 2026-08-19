import { supabase } from "@/api/supabase";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSessionQuery } from "@/store/authApi";
import { Navigate } from "react-router";

const LoginPage = () => {
  const { data: session, isLoading } = useGetSessionQuery();

  if (isLoading) {
    return null;
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Task-tracker</CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleLogin}
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
