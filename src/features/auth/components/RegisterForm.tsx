import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { signUpWithEmailAndPassword } from "../actions";

import Input from "@/src/components/Input";
import Button from "@/src/components/Button";

export default function RegisterForm() {
  const router = useRouter();

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChangeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const data = {
      email: registerFormData.email,
      password: registerFormData.password,
      confirmPassword: registerFormData.confirmPassword
    }

    try {
      console.log("Attempting to sign up with email and password...");
      await signUpWithEmailAndPassword(data);
      console.log("Sign up successful, redirecting to home...");
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  return (
    <form className="flex flex-col gap-4">
      <Input label="Email" type="email" name="email" value={registerFormData.email} onChange={handleChangeFormData} />
      <Input label="Password" type="password" name="password" value={registerFormData.password} onChange={handleChangeFormData} />
      <Input label="Confirm Password" type="password" name="confirmPassword" value={registerFormData.confirmPassword} onChange={handleChangeFormData} />
      <Button label="Registrar" type="submit" onClick={handleSubmit} />
    </form>
  );
}
