import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProgramList from "./components/Program/ProgramList";
import ProgramForm from "./components/Program/ProgramForm";
import ClientList from "./components/Client/ClientList";
import ClientForm from "./components/Client/ClientForm";
import ClientProfile from "./components/Client/ClientProfile";
import EnrollProgram from "./components/Client/EnrollProgram";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/programs"
            element={
              <ProtectedRoute>
                <ProgramList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programs/create"
            element={
              <ProtectedRoute>
                <ProgramForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programs/edit/:id"
            element={
              <ProtectedRoute>
                <ProgramForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/create"
            element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/edit/:id"
            element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <ProtectedRoute>
                <ClientProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/:id/enroll"
            element={
              <ProtectedRoute>
                <EnrollProgram />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
