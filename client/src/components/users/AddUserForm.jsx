import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

function AddUserForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isValid, setIsValid] = useState(false);

  const createUser = useUserStore((state) => state.createUser);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: name,
      last_name: lastName,
      email,
      username,
      password,
      role,
    };
    await createUser(data);
    navigate("/users");
  };

  const roleOptions = [
    { label: "1. Administrador", value: 1 },
    { label: "2. Gestor", value: 2 },
    { label: "3. Operador", value: 3 },
  ];

  useEffect(() => {
    const validateForm = () => {
      if (name && lastName && email && password && username && role) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validateForm();
  }, [email, lastName, name, password, role, username]);

  return (
    <>
      <div className="bg-blue-200 p-2 rounded mb-5">
        <p className="font-bold text-lg">Permisos de usuario</p>
        <p>
          <span className="font-semibold">1 - Administrador:</span> Puede
          realizar todas las operaciones
        </p>
        <p>
          <span className="font-semibold">2 - Gestor:</span> Puede realizar
          todas las operaciones menos crear usuarios
        </p>
        <p>
          <span className="font-semibold">3 - Operador:</span> Puede realizar
          todas las operaciones menos crear usuarios, agregar propuestas a las
          audiencias, derivar audiencias ni editar derivaciones
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            label="Nombres"
          />
          <Input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label="Apellidos"
          />
        </div>
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          label="Correo electrónico"
        />
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label="Nombre de usuario"
        />
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Contraseña"
          type="password"
        />
        <Input
          value={role}
          options={roleOptions}
          onChange={(e) => {
            setRole(e.target.value);
          }}
          type="select"
          label="Permisos"
        />
        <div className="flex w-72 gap-4 ml-auto my-5">
          <Button href="/users">Volver</Button>
          <Button disabled={!isValid} type="submit" color="secondary">
            Crear usuario
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddUserForm;
