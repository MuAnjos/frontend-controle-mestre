import { ProductItem } from "@/@types/interfaces/Product";
import LapisLogo from "../../../../public/svg/LapisLogo";
import { LixeiraLogo } from "../../../../public/svg/LixeiraLogo";
import { formatter } from "@/util/formatter/currencyFormatter";

export default function Product({
  product,
  onDeleteClick,
}: {
  product: ProductItem;
  onDeleteClick: () => void;
}) {
  return (
    <div className="flex items-center justify-center mb-4 drop-shadow-lg">
      <div className="flex justify-between w-full p-3.5 bg-white rounded-l-lg text-[#797979]">
        <div>
          <p>
            Nome: <span className="text-black">{product.name}</span>
          </p>
          <p>
            Marca: <span className="text-black">{product.brand}</span>
          </p>
        </div>
        <div className="text-end">
          <p>
            Código: <span className="text-black">{product.code}</span>
          </p>
          <p>
            Preço:{" "}
            <span className="text-black">
              {formatter.format(+product.price)}
            </span>
          </p>
        </div>
      </div>
      <div>
        <button
          className="flex w-full px-8 py-1 text-sm bg-red-600 rounded-tr-lg h-1/2 hover:bg-red-700"
          onClick={onDeleteClick}
        >
          <LixeiraLogo />
        </button>
        <button className="flex w-full px-8 py-1 rounded-br-lg bg-slate-600 h-1/2 hover:bg-slate-700">
          <LapisLogo />
        </button>
      </div>
    </div>
  );
}
