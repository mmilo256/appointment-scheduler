import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Appointments from "./layouts/Appointments";
import Departments from "./layouts/Departments";
import Citizens from "./layouts/Citizens";
import Users from "./layouts/Users";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/Citizens" element={<Citizens />} />
          <Route path="/Users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
