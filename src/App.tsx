import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import BoardPage from "@/pages/BoardPage";
import IssuePage from "@/pages/IssuePage";
import LoginPage from "@/pages/LoginPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issues/:id"
          element={
            <ProtectedRoute>
              <IssuePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
