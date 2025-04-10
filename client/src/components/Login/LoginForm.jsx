import React, { useRef, useState } from "react";
import { login } from "../../services/authService";
import BaseButton from "../ui/BaseButton";
import BaseInput from "../ui/BaseInput";

function LoginForm() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const token = await login(username, password); // Intenta iniciar sesión con los datos del formulario
      localStorage.setItem("jwt", token)
      window.location.href = "/"
    } catch (error) {
      alert(error.message)
      console.log(error.message); // Imprime cualquier error que ocurra en el proceso de inicio de sesión
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}
      // Maneja el envío del formulario usando handleSubmit
      className="bg-slate-200 p-6 rounded w-96" // Aplica clases de Tailwind CSS para el estilo del formulario
    >
      <h1 className="text-2xl text-center border-b border-slate-400 mb-5 pb-4 font-semibold">Sistemas de Audiencias Municipal</h1>
      <div className="flex flex-col gap-2 mb-4">
        <BaseInput value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="Nombre de usuario" />
        <BaseInput value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Contraseña" type="password" />
      </div>
      <BaseButton isLoading={loading} type="submit" text="Entrar" />
    </form>
  );
}

export default LoginForm;
