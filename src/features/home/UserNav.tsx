"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js"; // Tipo oficial do Supabase

interface UserNavProps {
  user: User;
}

export function UserNav({ user }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    // Faremos o logout chamando uma rota ou criando o cliente de forma simples no client
    const { createClient } = await import("@/src/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    
    router.refresh(); // Atualiza o servidor para proteger as rotas
    router.push("/auth"); // Redireciona para o login
  };

  // Pegamos a primeira letra do email ou nome para o Avatar caso não haja foto
  const avatarLetter = user.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative inline-block text-left">
      {/* Botão do Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-zinc-200 transition focus:outline-none"
      >
        <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
          {avatarLetter}
        </div>
        <div className="hidden md:flex flex-col text-left text-xs pr-2">
          <span className="font-medium text-zinc-800">Minha Conta</span>
          <span className="text-zinc-500 text-[10px] truncate max-w-30">
            {user.email}
          </span>
        </div>
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop invisível para fechar o menu ao clicar fora */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-zinc-100 focus:outline-none z-20">
            <div className="px-4 py-3">
              <p className="text-xs text-zinc-500">Logado como</p>
              <p className="text-sm font-medium text-zinc-900 truncate">{user.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/dashboard/profile");
                }}
                className="w-full text-left block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Meu Perfil
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/dashboard/settings");
                }}
                className="w-full text-left block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Configurações
              </button>
            </div>
            <div className="py-1">
              <button
                onClick={handleSignOut}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
              >
                Sair da conta
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}