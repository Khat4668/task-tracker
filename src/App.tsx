import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "@/components/AppLayout/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import BoardPage from "@/pages/BoardPage/BoardPage";
import IssuePage from "@/pages/IssuePage";
import LoginPage from "@/pages/LoginPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/board" element={<BoardPage />} />
          <Route path="/issues/:id" element={<IssuePage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
