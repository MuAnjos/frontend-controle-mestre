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
      <body className="h-screen bg-orange-100">
        <Header />
        <main className="mx-10 h-max">{children}</main>
      </body>
    </html>
  );
}
