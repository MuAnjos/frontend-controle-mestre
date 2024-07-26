import React, { useState } from 'react'
import { Fornecedor } from '@/@types/interfaces/Fornecedor';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../../searchBar';
import { getFornecedores } from '@/service/fornecedorHttp';
import { FornecedorCard } from '../fornecedorCard';

interface FornecedorListProps {
    onDeleteClick: (fornecedor: Fornecedor) => void;
    onUpdateClick: (fornecedor: Fornecedor) => void;
}

export function FornecedorList({
    onDeleteClick,
    onUpdateClick
}: FornecedorListProps) {
    const [search, setSearch] = useState("");
    const { data: fornecedores } = useQuery<Fornecedor[]>({
        queryFn: () => getFornecedores(),
        initialData: [],
        queryKey: ["fornecedores"],
    });

    const filteredFornecedores = fornecedores?.filter((Fornecedor) =>
        Fornecedor.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <SearchBar onChange={(e) => setSearch(e.currentTarget.value)} />
            <div className="mt-6 overflow-y-scroll max-h-[380px] no-scrollbar">
                {search.length > 0 && filteredFornecedores.map((fornecedor) => (
                    <FornecedorCard
                        key={fornecedor.id}
                        onDeleteClick={() => onDeleteClick(fornecedor)}
                        onUpdateClick={() => onUpdateClick(fornecedor)}
                        fornecedor={fornecedor}
                    />
                ))}
                {search.length === 0 && fornecedores.map((fornecedor) => (
                    <FornecedorCard
                        key={fornecedor.id}
                        fornecedor={fornecedor}
                        onDeleteClick={() => onDeleteClick(fornecedor)}
                        onUpdateClick={() => onUpdateClick(fornecedor)}
                    />
                ))}
            </div>
        </>
    );
}
