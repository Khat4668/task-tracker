import { supabase } from "@/api/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetSessionQuery } from "@/store/authApi";
import { LayoutGrid, LogOut } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  const { data: session } = useGetSessionQuery();

  const isDemo = session?.user.is_anonymous === true;

  return (
    <header className="h-14 shrink-0 border-b border-border">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        <Link
          to="/board"
          className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Task Tracker</span>
        </Link>
        <div className="flex items-center gap-2">
          {isDemo && <Badge variant="secondary">Demo</Badge>}
          <Button
            variant="ghost"
            size="sm"
            className="-mr-2.5"
            onClick={() => supabase.auth.signOut()}
          >
            <LogOut />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
