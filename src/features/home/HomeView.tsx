import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
import { UserNav } from "./UserNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Busca o usuário logado validando o JWT no servidor
  const { data: { user }, error } = await supabase.auth.getUser();

  // Proteção de rota profissional: Se não houver usuário ou der erro, manda para a tela de login
  if (error || !user) {
    redirect("/auth");
  }

  return (
    <div className="w-full min-h-screen bg-zinc-50 flex flex-col">
      {/* Header/Navbar do Sistema */}
      <header className="bg-white border-b border-zinc-200 h-16 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-zinc-900">Wefinance</span>
        </div>
        
        {/* Renderiza o componente profissional passando o usuário já validado */}
        <UserNav user={user} />
      </header>

      {/* Conteúdo da página */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}