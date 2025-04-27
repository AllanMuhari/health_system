import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProgramList from "./components/Program/ProgramList";
import ProgramForm from "./components/Program/ProgramForm";
import ClientList from "./components/Client/ClientList";
import ClientForm from "./components/Client/ClientForm";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {" "}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/programs" element={<ProgramList />} />
          <Route path="/programs/create" element={<ProgramForm />} />
          <Route path="/programs/edit/:id" element={<ProgramForm />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/create" element={<ClientForm />} />
          <Route path="/clients/edit/:id" element={<ClientForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
