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
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";

const LoginPage = () => {
  const { data: session, isLoading } = useGetSessionQuery();

  const [pendingAction, setPendingAction] = useState<"google" | "demo" | null>(
    null,
  );

  const navigate = useNavigate();

  const handleLogin = async () => {
    setPendingAction("google");

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (signInError) {
      toast.error("Could not log in. Please try again.");
      setPendingAction(null);
    }
  };

  const handleDemoLogin = async () => {
    setPendingAction("demo");

    const { error: signInError } = await supabase.auth.signInAnonymously();
    if (signInError) {
      toast.error("Could not start the demo. Please try again.");
      setPendingAction(null);
      return;
    }

    const { error: seedError } = await supabase.rpc("seed_demo_board");
    if (seedError) {
      toast.error("Demo data could not be loaded. The board will be empty.");
    }

    navigate("/", { replace: true });
  };

  if (isLoading) {
    return null;
  }

  // Without this the board mounts before the demo data is created.
  if (session && !pendingAction) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Task-tracker</CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            variant="default"
            className="w-full gap-2"
            onClick={handleLogin}
            disabled={pendingAction !== null}
          >
            <GoogleIcon />
            {pendingAction === "google"
              ? "Signing in…"
              : "Continue with Google"}
          </Button>

          <div className="flex items-center gap-3">
            <div className="bg-border h-px flex-1" />
            <span className="text-muted-foreground text-xs">or</span>
            <div className="bg-border h-px flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleDemoLogin}
            disabled={pendingAction !== null}
          >
            {pendingAction === "demo" ? "Preparing demo…" : "Continue as guest"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
