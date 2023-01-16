"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

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
    <div className="w-screen h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center flex-col">
      <h1 className="text-center text-3xl text-white mb-10">Welcome</h1>
      <form
        onSubmit={onSubmit}
        className="w-96 bg-white h-96 rounded-md shadow-lg flex items-center justify-center flex-col"
      >
        <h1 className="text-center text-3xl text-slate-400 mb-10">Login</h1>
        <div className="w-72 border border-slate-300 p-2 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 flex mb-5">
          <label htmlFor="email">
            <HiOutlineMail className="text-3xl text-slate-400" />
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={credentials.email}
            autoComplete="off"
            className="ml-5 focus:outline-none"
          />
        </div>
        <div className="w-72 border border-slate-300 p-2 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 flex mb-5">
          <label htmlFor="password">
            <HiOutlineLockClosed className="text-3xl text-slate-400" />
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
            className="ml-5 focus:outline-none"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-400 p-2 text-sm rounded-md text-white transition duration-500 hover:bg-sky-500"
        >
          Iniciar sesión
        </button>
        <small className="text-red-500 mt-5">
          {error && "Error al iniciar sesión, por favor intente de nuevo"}
        </small>
      </form>
    </div>
  );
}
