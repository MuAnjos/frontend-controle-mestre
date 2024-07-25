import { UseFormRegister } from "react-hook-form";
import { FuncionarioFormFields } from "../funcionarioForm";

export function CargoSelect({ register, required }: { register: UseFormRegister<FuncionarioFormFields>, required: boolean }) {
    return (
        <div className="bg-white w-full rounded-lg p-2">
            <label
                htmlFor="cargo"
                className="block text-sm text-gray-500 font-semibold ml-1">
                Cargo
                <span className="text-red-500">{required && "*"}</span>
            </label>
            <select {...register("cargo")} className="text-lg font-bold outline-none w-full">
                <option value="ATENDENTE" id="cargo">Atendente</option>
                <option value="GERENTE" id="cargo">Gerente</option>
            </select>
        </div>
    )
}
