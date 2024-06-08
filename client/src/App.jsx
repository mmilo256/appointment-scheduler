import { Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Appointments from "./layouts/Appointments";
import Departments from "./layouts/Departments";
import Citizens from "./layouts/Citizens";
import Users from "./layouts/Users";
import RootLayout from "./layouts/RootLayout";
import PrivateRoute from "./layouts/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/Citizens" element={<Citizens />} />
          <Route path="/Users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
