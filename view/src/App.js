import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./middlewares/protectedRoutes";
import HomePage from "./pages/HomePage";
import Success from "./pages/Success";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/success" element={<Success />} />
        <Route element={<ProtectedRoutes />} >
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
