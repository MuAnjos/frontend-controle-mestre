"use client";

import { usePathname } from "next/navigation";
import { LojaLogo } from "../../../public/svg/LojaLogo";
import Link from "next/link";

export function Header() {
  const pathname = usePathname();
  const displayName = pathname.split("/")[2] ?? "Controle Mestre";

  return (
    <header className="flex items-center justify-center py-6 bg-orange-500 rounded-b-2xl">
      <div className="absolute left-4">
        {pathname.includes("module") && (
          <Link href="/">
            <LojaLogo />
          </Link>
        )}
      </div>
      <h1 className="mx-auto text-4xl font-bold text-white capitalize">
        {displayName}
      </h1>
    </header>
  );
}
