import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../../searchBar';
import { Funcionario } from '@/@types/interfaces/Funcionario';
import { FuncionarioCard } from './funcionarioCard';
import { getFuncionarios } from '@/service/funcionarioHttp';

interface FuncionarioListProps {
    onDeleteClick: (funcionario: Funcionario) => void;
    onUpdateClick: (funcionario: Funcionario) => void;
}

export function FuncionarioList({
    onDeleteClick,
    onUpdateClick
}: FuncionarioListProps) {
    const [search, setSearch] = useState("");
    const { data: funcionarios } = useQuery<Funcionario[]>({
        queryFn: () => getFuncionarios(),
        initialData: [],
        queryKey: ["funcionarios"],
    });

    const filteredFuncionarios = funcionarios?.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <SearchBar onChange={(e) => setSearch(e.currentTarget.value)} />
            <div className="mt-6 overflow-y-scroll max-h-[380px] no-scrollbar">
                {search.length > 0 && filteredFuncionarios.map((funcionario) => (
                    <FuncionarioCard
                        key={funcionario.id}
                        funcionario={funcionario}
                        onDeleteClick={() => onDeleteClick(funcionario)}
                        onUpdateClick={() => onUpdateClick(funcionario)}
                    />
                ))}
                {search.length === 0 && funcionarios.map((funcionario) => (
                    <FuncionarioCard
                        key={funcionario.id}
                        funcionario={funcionario}
                        onDeleteClick={() => onDeleteClick(funcionario)}
                        onUpdateClick={() => onUpdateClick(funcionario)}
                    />
                ))}
            </div>
        </>
    );
}
