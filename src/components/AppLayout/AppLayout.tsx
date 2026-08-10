import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
