import React from "react";
import { VendasLogo } from "../../public/svg/VendasLogo";
import { ClientesLogo } from "../../public/svg/ClientesLogo";
import { FuncionariosLogo } from "../../public/svg/FuncionariosLogo";
import { SaidasLogo } from "../../public/svg/SaidasLogo";
import { Produtos } from "../../public/svg/ProdutosLogo";
import { EstoqueLogo } from "../../public/svg/EstoqueLogo";
import { Fornecedores } from "../../public/svg/FornecedoresLogo";

export const modules: {
  name: string;
  url: string;
  logo: React.ReactNode;
}[] = [
  {
    name: "Vendas",
    url: "/vendas",
    logo: <VendasLogo />,
  },
  {
    name: "Clientes",
    url: "/clientes",
    logo: <ClientesLogo />,
  },
  {
    name: "Funcionários",
    url: "/funcionarios",
    logo: <FuncionariosLogo />,
  },
  {
    name: "Saídas",
    url: "/saidas",
    logo: <SaidasLogo />,
  },
  {
    name: "Produtos",
    url: "/produtos",
    logo: <Produtos />,
  },
  {
    name: "Estoques",
    url: "/estoques",
    logo: <EstoqueLogo />,
  },
  {
    name: "Fornecedores",
    url: "/fornecedores",
    logo: <Fornecedores />,
  },
];
