import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import CreateRecipePage from "./pages/CreateRecipePage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-white h-full">
          <Loader className="animate-spin text-primary size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage user={user} /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />

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
