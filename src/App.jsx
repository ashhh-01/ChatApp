import { useContext } from "react";
import "./style.scss";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/ChatApp/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ChatApp/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/ChatApp/login" element={<Login />} />
          <Route path="/ChatApp/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;