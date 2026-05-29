"use server";

import { createClient } from "@/src/lib/supabase/server";
import { cookies } from "next/headers";

export async function signInWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signUpWithEmailAndPassword({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }
}
