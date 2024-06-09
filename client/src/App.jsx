import { Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Appointments from "./layouts/Appointments";
import Departments from "./layouts/Departments";
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

function App() {
  // Componente principal de la aplicación que define las rutas de navegación
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
            {/* Ruta para gestionar departamentos */}
            <Route path="/departments" element={<Departments />} />
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
