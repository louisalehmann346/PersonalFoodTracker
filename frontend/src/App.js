import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Log from "./pages/log";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notFound";
import Goals from "./pages/goal";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/log" element={<Log />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goal" element={<Goals />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;