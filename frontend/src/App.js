import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Log from "./pages/log";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/log">Log</Link> |{" "}
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/log" element={<Log />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;