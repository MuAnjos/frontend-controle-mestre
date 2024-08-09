import { Cliente } from "@/@types/interfaces/Cliente";
import { getClientes } from "@/service/ClientesHttp";
import React, { useEffect, useState } from "react";

interface ClientesDropdownProps extends React.HTMLProps<HTMLSelectElement> {
  register?: any;
  cliente?: Cliente;
  update?: boolean;
}

export function ClienteDropdown({
  register,
  cliente,
  update,
  ...props
}: ClientesDropdownProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  useEffect(() => {
    async function fetchClientes() {
      const cliente = await getClientes();
      setClientes(cliente);
    }
    fetchClientes();
  }, []);

  return (
    <div className="bg-white w-1/2 rounded-lg p-2">
      <label
        htmlFor="opcoes"
        className="block text-sm text-gray-500 font-semibold ml-1">
        Cliente
      </label>
      {clientes.length > 0 && (
        <select
          name="clienteId"
          id="opcoes"
          className="text-lg font-bold outline-none w-full"
          {...props}
          {...register("categoriaId")}>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
