import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Navigate to="/?section=research" replace />} />
        <Route path="/publications" element={<Navigate to="/?section=publications" replace />} />
        <Route path="/presentations" element={<Navigate to="/?section=presentations" replace />} />
        <Route path="/resume" element={<Navigate to="/?section=cv" replace />} />
        <Route path="/contact" element={<Navigate to="/?section=contact" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
