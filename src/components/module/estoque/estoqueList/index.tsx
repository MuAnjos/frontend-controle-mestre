import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../../searchBar';
import { Estoque } from '@/@types/interfaces/Estoque';
import { getEstoques } from '@/service/estoqueHttp';
import { EstoqueCard } from '../estoqueCard';

interface EstoqueListProps {
    onDeleteClick: (estoque: Estoque) => void;
    onUpdateClick: (estoque: Estoque) => void;
}

export function EstoqueList({
    onDeleteClick,
    onUpdateClick
}: EstoqueListProps) {
    const [search, setSearch] = useState("");
    const { data: estoques } = useQuery<Estoque[]>({
        queryFn: () => getEstoques(),
        initialData: [],
        queryKey: ["estoques"],
    });

    const filteredClientes = estoques?.filter((estoque) =>
        estoque.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <SearchBar onChange={(e) => setSearch(e.currentTarget.value)} />
            <div className="mt-6 overflow-y-scroll max-h-[380px] no-scrollbar">
                {search.length > 0 && filteredClientes.map((estoque) => (
                    <EstoqueCard
                        key={estoque.id}
                        onDeleteClick={() => onDeleteClick(estoque)}
                        onUpdateClick={() => onUpdateClick(estoque)}
                        estoque={estoque}
                    />
                ))}
                {search.length === 0 && estoques.map((estoque) => (
                    <EstoqueCard
                        key={estoque.id}
                        estoque={estoque}
                        onDeleteClick={() => onDeleteClick(estoque)}
                        onUpdateClick={() => onUpdateClick(estoque)}
                    />
                ))}
            </div>
        </>
    );
}
