import React, { useContext, useState } from "react";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";

const inputStyles = "border rounded-md p-2 w-full"; // Define los estilos comunes para los inputs

function LoginForm() {
  const { login } = useContext(AuthContext); // Obtiene login y isLoading del contexto de autenticación
  const {
    register, // Función para registrar los inputs en el formulario
    handleSubmit, // Función para manejar el envío del formulario
    formState: { errors }, // Objeto que contiene los errores del formulario
  } = useForm();

  const [loading, setLoading] = useState(false);

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.username, data.password); // Intenta iniciar sesión con los datos del formulario
    } catch (error) {
      console.log(error.message); // Imprime cualquier error que ocurra en el proceso de inicio de sesión
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // Maneja el envío del formulario usando handleSubmit
      className="bg-slate-200 p-6 rounded w-96" // Aplica clases de Tailwind CSS para el estilo del formulario
    >
      <h1 className="text-2xl text-center border-b border-slate-400 mb-5 pb-4 font-semibold">
        Iniciar sesión
      </h1>
      <div className="mb-4">
        <input
          className={inputStyles} // Aplica estilos comunes al input
          type="text"
          placeholder="Nombre de usuario"
          {...register("username", { required: true })} // Registra el input y especifica que es requerido
        />
        {errors.username && ( // Muestra un mensaje de error si el campo username tiene errores
          <span className="text-red-500 text-sm">
            El nombre de usuario es requerido
          </span>
        )}
      </div>
      <div>
        <input
          className={inputStyles} // Aplica estilos comunes al input
          type="password"
          placeholder="********"
          {...register("password", { required: true })} // Registra el input y especifica que es requerido
        />
        {errors.password && ( // Muestra un mensaje de error si el campo password tiene errores
          <span className="text-red-600 text-sm">
            La contraseña es requerida
          </span>
        )}
      </div>
      <Button
        color="secondary"
        type="submit"
        disabled={loading}
        className={`mt-5 ${loading ? "cursor-wait" : ""}`}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>{" "}
      {/* Renderiza el botón de entrada */}
    </form>
  );
}

export default LoginForm;
