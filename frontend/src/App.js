import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./app/pages/registerPage/RegisterPage";
import LoginPage from "./app/pages/loginPage/LoginPage";
import ProtectedRoute from "./app/components/protectedRoute/ProtectedRoute";
import Context from "./app/context/Context";
import { useMediaQuery } from "@mui/material";
import DesktopScreen from "./app/screens/desktopScreen/DesktopScreen";
import MobileScreen from './app/screens/mobileScreen/MobileScreen';
import EditPage from "./app/pages/editPage/EditPage";

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
               {
                    isSmallScreen 
                      ? <MobileScreen />
                      : <DesktopScreen />
               }
                </ProtectedRoute>
              }
            />
            <Route path={"/edit/:id"} element={<EditPage/>}/>
          </Routes>
        </div>
      </Context>
    </BrowserRouter>
  );
}

export default App;
