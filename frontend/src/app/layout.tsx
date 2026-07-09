import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'; 
import Footer from "@/componentes/Footer/Footer";
import Header from "@/componentes/Header/Header";

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'] 
});

export const metadata: Metadata = {
  title: "SisGestor - Sistema Gestor de Saúde",
  description: "Gerenciamento de Unidades de Saúde - Itajubá - MG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={poppins.className}>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />  
      </body>
    </html>
  );
}