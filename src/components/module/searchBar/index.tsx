import { ChangeEvent } from "react";

export function SearchBar({
  className,
  onChange,
  onSearch
}: {
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}) {
  return (
    <div className={`flex ${className}`}>
      <input
        placeholder="Informe os dados..."
        className="w-full px-4 rounded-l-xl placeholder:text-xl"
        onChange={onChange}
        type="text"
      />
      <button className="px-8 py-2 text-xl font-semibold text-white bg-orange-500 rounded-r-xl hover:bg-orange-600" onClick={onSearch}>
        Pesquisar
      </button>
    </div>
  );
}
