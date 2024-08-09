import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../../searchBar';
import { Venda } from '..';
import { ItemVenda } from '@/@types/interfaces/Venda';
import { getVendas } from '@/service/vendaHttp';

interface VendaListPros {
    onDeleteClick: (venda: ItemVenda) => void;
    onUpdateClick: (venda: ItemVenda) => void;
}

export function VendaList({
    onDeleteClick,
    onUpdateClick
}: VendaListPros) {
    const [search, setSearch] = useState("");
    const { data: venda } = useQuery<ItemVenda[]>({
        queryFn: () => getVendas(),
        initialData: [],
        queryKey: ["venda"],
    });

    const filteredVendas = venda?.filter((venda) =>
        venda.funcionario.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <SearchBar onChange={(e) => setSearch(e.currentTarget.value)} />
            <div className="mt-6 overflow-y-scroll max-h-[380px] no-scrollbar">
                {search.length > 0 && filteredVendas.map((venda) => (
                    <Venda
                        key={venda.id}
                        venda={venda}
                        onDeleteClick={() => onDeleteClick(venda)}
                        onUpdateClick={() => onUpdateClick(venda)}
                    />
                ))}
                {search.length === 0 && filteredVendas.map((venda) => (
                    <Venda
                        key={venda.id}
                        venda={venda}
                        onDeleteClick={() => onDeleteClick(venda)}
                        onUpdateClick={() => onUpdateClick(venda)}
                    />
                ))}
            </div>
        </>
    );
}
