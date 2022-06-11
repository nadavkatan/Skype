import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./app/pages/registerPage/RegisterPage";
import LoginPage from "./app/pages/loginPage/LoginPage";
import ProtectedRoute from "./app/components/protectedRoute/ProtectedRoute";
import HomePage from "./app/pages/homePage/HomePage";
import Context from "./app/context/Context";
import { useMediaQuery } from "@mui/material";
import DesktopScreen from "./app/screens/desktopScreen/DesktopScreen";

function App() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <BrowserRouter>
      <Context>
        <div className="App">
          <Routes>
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route
              path={"/"}
              element={
                <ProtectedRoute>
                  {isSmallScreen ? <HomePage /> : <DesktopScreen />}
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Context>
    </BrowserRouter>
  );
}

export default App;
