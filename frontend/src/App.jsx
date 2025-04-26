import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
// import ClientDetails from "./pages/ClientDetails";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            {/* <Route path="/clients/:id" element={<ClientDetails />} /> */}
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:id" element={<ProgramDetails />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
