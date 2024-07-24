import React from 'react'

export interface SexRadioProps extends React.HTMLAttributes<HTMLInputElement> {
    invalid: boolean,
    register: any,
    required?: boolean,
}

export function SexRadio({ register, invalid, required, ...props }: SexRadioProps) {
    return (
        <div className="w-full">
            <label className={`font-semibold ${invalid && "text-red-600"}`}>
                Sexo
                <span className="text-red-500">{required && "*"}</span>
            </label>
            <div className="flex gap-8 mt-2">
                <div className="flex gap-2 justify-center">
                    <input type="radio" name="sex" id="masculino" value="MASCULINO" className="w-8" {...register("sexo")} {...props} />
                    <label htmlFor="masculino" className="text-md text-black-500 font-medium w-full">Masculino</label>
                </div>
                <div className="flex gap-2 justify-center">
                    <input type="radio" name="sex" id="feminino" value="FEMININO" className="w-8" {...register("sexo")} {...props} />
                    <label htmlFor="feminino" className="text-md text-black-500 font-medium w-full">Feminino</label>
                </div>
            </div>
        </div>
    )
}
