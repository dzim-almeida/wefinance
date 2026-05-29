"use client";

import { useState } from "react";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export function AuthView() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  }

  return (
    <section className="p-4 min-w-1/2 max-h-[80vh] bg-zinc-100 rounded-md shadow-md">
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="text-2xl font-bold">Wefinance</h1>
        <h3 className="text-md text-muted-foreground">
          { isLogin ? "Faça login para acessar sua conta" : "Crie uma conta para começar a usar" }
        </h3>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <p className="text-sm text-muted-foreground mt-4">
        {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
        <span className="text-green-700 hover:underline cursor-pointer" onClick={toggleForm}>
          {isLogin ? "Cadastre-se" : "Faça login"}
        </span>
      </p>
    </section>
  );
}
