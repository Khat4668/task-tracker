import { supabase } from "@/api/supabase";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-14 shrink-0 border-b border-border">
      <div className="h-full px-8 flex items-center justify-between">
        <Link
          to="/board"
          className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Task Tracker</span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          className="-mr-2.5"
          onClick={() => supabase.auth.signOut()}
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </header>
  );
};

export default Header;
