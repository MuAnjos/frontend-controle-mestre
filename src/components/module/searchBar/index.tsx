import { ChangeEvent } from "react";

export function SearchBar({
  onChange,
}: {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex">
      <input
        placeholder="Informe os dados..."
        className="w-full px-4 rounded-l-xl placeholder:text-xl"
        onChange={onChange}
        type="text"
      />
      <button className="px-8 py-2 text-xl font-semibold text-white bg-orange-500 rounded-r-xl hover:bg-orange-600">
        Pesquisar
      </button>
    </div>
  );
}
