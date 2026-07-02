import { Navigate, Route, Routes } from "react-router-dom";

import BoardPage from "@/pages/BoardPage";
import IssuePage from "@/pages/IssuePage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/board" />} />
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
  );
};

export default App;
