import { Navigate, Route, Routes } from "react-router-dom";

import BoardPage from "@/pages/BoardPage";
import IssuePage from "@/pages/IssuePage";
import LoginPage from "@/pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/board" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/issues/:id" element={<IssuePage />} />
    </Routes>
  );
};

export default App;
