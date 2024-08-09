import LapisLogo from "../../../../public/svg/LapisLogo";
import { LixeiraLogo } from "../../../../public/svg/LixeiraLogo";
import { formatter } from "@/util/formatter/currencyFormatter";
import { ItemVenda } from "@/@types/interfaces/Venda";



export function Venda({
  venda,
  onDeleteClick,
  onUpdateClick
}: {
  venda: ItemVenda;
  onUpdateClick: (venda: ItemVenda) => void;
  onDeleteClick: () => void;
}) {
  return (
    <div className="flex items-center justify-center mb-4 drop-shadow-lg">
      <div className="flex justify-between w-full p-3.5 bg-white rounded-l-lg text-[#797979]">
        <div>
          <p>
            Cliente: <span className="text-black">{venda.cliente.nome}</span>
          </p>
          <p>
            Funcionário: <span className="text-black">{venda.funcionario.nome}</span>
          </p>
        </div>
        <div className="text-end">
          <p>
            Código: <span className="text-black">{venda.id}</span>
          </p>
          <p>
            Total: <span className="text-black">{formatter.format(+venda.valor)}</span>
          </p>
        </div>
      </div>
      <div>
        <button
          className="flex w-full px-8 py-1 text-sm bg-red-600 rounded-tr-lg h-1/2 hover:bg-red-700"
          onClick={onDeleteClick}>
          <LixeiraLogo />
        </button>
        <button
          className="flex w-full px-8 py-1 rounded-br-lg bg-slate-600 h-1/2 hover:bg-slate-700"
          onClick={() => onUpdateClick(venda)}>
          <LapisLogo />
        </button>
      </div>
    </div>
  );
}
