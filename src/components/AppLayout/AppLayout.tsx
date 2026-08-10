import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
