import {BrowserRouter,Routes, Route} from 'react-router-dom';
import RegisterPage from './app/pages/registerPage/RegisterPage';
import LoginPage from './app/pages/loginPage/LoginPage';
import ProtectedRoute from './app/components/protectedRoute/ProtectedRoute';
import HomePage from './app/pages/homePage/HomePage';
import Context from './app/context/Context';
import io from 'socket.io-client';

// const BASE_URL=process.env.REACT_APP_BASE_URL;

// const socket = io.connect(BASE_URL)

function App() {
  return (
    <BrowserRouter>
    <Context>
    <div className="App">
    <Routes>
    <Route path={"/register"} element={<RegisterPage />} />
    <Route path={"/login"} element={<LoginPage />} />
    <Route path={"/"} element={
    <ProtectedRoute>
    <HomePage />
    </ProtectedRoute>
    
    } />
    </Routes>
    </div>
    </Context>
    </BrowserRouter>

  );
}

export default App;
