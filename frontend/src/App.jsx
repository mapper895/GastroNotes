import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import CreateRecipePage from "./pages/CreateRecipePage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, authCheck } = useAuthStore();
  useEffect(() => {
    authCheck();
  }, [authCheck]);
  console.log("user in App.jsx:", user);
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/"
          element={user ? <HomePage user={user} /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/dashboard"} />}
        />
        <Route path="/register" element={<SignupPage />} />

        <Route
          path="create-recipe"
          element={user ? <CreateRecipePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
