"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const displayName = pathname.split("/")[2] ?? "Controle Mestre";

  return (
    <header className="flex items-center justify-center py-4 bg-orange-500 rounded-b-2xl">
      <h1 className="text-4xl font-bold text-white capitalize">
        {displayName}
      </h1>
    </header>
  );
}
