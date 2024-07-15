import React, { useState } from 'react'
import { Cliente } from '@/@types/interfaces/Cliente';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../../searchBar';
import { ClienteCard } from '../clienteCard';
import { getClientes } from '@/service/clientesHttp';

interface ClienteListProps {
    onDeleteClick: (cliente: Cliente) => void;
    onUpdateClick: (cliente: Cliente) => void;
}

export function ClienteList({
    onDeleteClick,
    onUpdateClick
}: ClienteListProps) {
    const [search, setSearch] = useState("");
    const { data: clientes } = useQuery<Cliente[]>({
        queryFn: () => getClientes(),
        initialData: [],
        queryKey: ["clientes"],
    });

    const filteredClientes = clientes?.filter((cliente) =>
        cliente.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <SearchBar onChange={(e) => setSearch(e.currentTarget.value)} />
            <div className="mt-6 overflow-y-scroll max-h-[380px] no-scrollbar">
                {search.length > 0 && filteredClientes.map((cliente) => (
                    <ClienteCard
                        key={cliente.id}
                        onDeleteClick={() => onDeleteClick(cliente)}
                        onUpdateClick={() => onUpdateClick(cliente)}
                        cliente={cliente}
                    />
                ))}
                {search.length === 0 && clientes.map((cliente) => (
                    <ClienteCard
                        key={cliente.id}
                        cliente={cliente}
                        onDeleteClick={() => onDeleteClick(cliente)}
                        onUpdateClick={() => onUpdateClick(cliente)}
                    />
                ))}
            </div>
        </>
    );
}
