import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Appointments from "./layouts/Appointments";
import Citizens from "./layouts/Citizens";
import Users from "./layouts/Users";
import RootLayout from "./layouts/RootLayout";
import PrivateRoute from "./layouts/PrivateRoute";
import CreateAppointment from "./layouts/CreateAppointment";
import EditAppointment from "./layouts/EditAppointment";
import CreateUser from "./layouts/CreateUser";
import EditUser from "./layouts/EditUser";
import CreateCitizen from "./layouts/CreateCitizen";
import EditCitizen from "./layouts/EditCitizen";
import Referrals from "./layouts/Referrals";
import CreateReferral from "./layouts/CreateReferral";
import EditReferral from "./layouts/EditReferral";
import { useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from "./context/AuthContext";

function App() {
  // Componente principal de la aplicación que define las rutas de navegación

  const {logout} = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (!token) {
      logout()
    } else {
      try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime) {
          logout()
        }
      } catch(e) {
        console.log(e)
        logout()
      }
    }
  }, [logout])

  return (
    <div className="min-h-dvh bg-gray-200">
      {/* Definición de las rutas utilizando el componente Routes */}
      <Routes>
        {/* Ruta para la página de inicio de sesión */}
        <Route path="/login" element={<Login />} />
        {/* Ruta protegida que requiere autenticación */}
        <Route element={<PrivateRoute />}>
          {/* Ruta raíz con el diseño base de la aplicación */}
          <Route path="/" element={<RootLayout />}>
            {/* Ruta de inicio */}
            <Route index element={<Home />} />
            {/* Ruta para gestionar citas */}
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/appointments/create"
              element={<CreateAppointment />}
            />
            <Route path="/appointments/edit" element={<EditAppointment />} />
            {/* Ruta para gestionar derivaciones */}
            <Route path="/referrals/*" element={<Referrals />} />
            <Route path="/referrals/create" element={<CreateReferral />} />
            <Route path="/referrals/edit" element={<EditReferral />} />
            {/* Rutas para gestionar ciudadanos */}
            <Route path="/citizens" element={<Citizens />} />
            <Route path="/citizens/create" element={<CreateCitizen />} />
            <Route path="/citizens/edit" element={<EditCitizen />} />
            {/* Rutas para gestionar usuarios */}
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/edit" element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
