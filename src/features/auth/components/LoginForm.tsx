"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "../actions";

import Input from "@/src/components/Input";
import Button from "@/src/components/Button";

export default function LoginForm() {
  const router = useRouter();

  const [LoginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  })
  
  const handleChangeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const data = {
      email: LoginFormData.email,
      password: LoginFormData.password
    }

    try {
      console.log("Attempting to sign in with email and password...");
      await signInWithEmailAndPassword(data);
      console.log("Sign in successful, redirecting to home...");
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }
  
  return (
    <form className="flex flex-col gap-4">
      <Input label="Email" type="email" name="email" value={LoginFormData.email} onChange={handleChangeFormData} />
      <Input label="Password" type="password" name="password" value={LoginFormData.password} onChange={handleChangeFormData} />
      <Button label="Entrar" type="submit" onClick={handleSubmit} />
    </form>
  );
}
