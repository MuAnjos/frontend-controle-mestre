"use client";

import { usePathname } from "next/navigation";
import { LojaLogo } from "../../../public/svg/LojaLogo";

export function Header() {
  const pathname = usePathname();
  const displayName = pathname.split("/")[2] ?? "Controle Mestre";

  return (
    <header className="flex items-center justify-center py-6 bg-orange-500 rounded-b-2xl">
      <div className="left-4 absolute">
        {pathname.includes("module") && <LojaLogo />}
      </div>
      <h1 className="text-4xl mx-auto font-bold text-white capitalize">
        {displayName}
      </h1>
    </header>
  );
}
