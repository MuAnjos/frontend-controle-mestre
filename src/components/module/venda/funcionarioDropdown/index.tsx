import { Funcionario } from "@/@types/interfaces/Funcionario";
import { getFuncionarios } from "@/service/funcionarioHttp";
import React, { useEffect, useState } from "react";

interface FuncionarioDropdownProps extends React.HTMLProps<HTMLSelectElement> {
  register?: any;
  funcionario?: Funcionario;
  update?: boolean;
}

export function FuncionarioDropdown({
  register,
  funcionario,
  update,
  ...props
}: FuncionarioDropdownProps) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  useEffect(() => {
    async function fetchFuncionarios() {
      const funcionario = await getFuncionarios();
      setFuncionarios(funcionario);
    }
    fetchFuncionarios();
  }, []);

  return (
    <div className="bg-white w-1/2 rounded-lg p-2">
      <label
        htmlFor="opcoes"
        className="block text-sm text-gray-500 font-semibold ml-1">
        funcionario
      </label>
      {funcionarios.length > 0 && (
        <select
          name="categoriaId"
          id="opcoes"
          className="text-lg font-bold outline-none w-full"
          {...props}
          {...register("funcionarioId")}>
          {funcionarios.map(func => (
            <option key={func.id} value={func.id}>
              {func.nome}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
