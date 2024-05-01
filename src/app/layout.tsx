import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Controle Mestre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-orange-100 h-screen">
        <Header />
        <main className="mx-10">{children}</main>
      </body>
    </html>
  );
}
