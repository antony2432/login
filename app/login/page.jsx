"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const [error, sertError] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", credentials);

      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      sertError(true);
      setcredentials({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={credentials.email}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={credentials.password}
        />
        <button type="submit">Iniciar sesión</button>
        <p>{error && "Error al iniciar sesión, por favor intente de nuevo"}</p>
      </form>
    </div>
  );
}
