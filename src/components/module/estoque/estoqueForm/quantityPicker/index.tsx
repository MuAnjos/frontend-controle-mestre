import React, { forwardRef, useRef } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { EstoqueFormFields } from '..';

interface QuantityPickerProps {
    quantityValue: number;
    register: UseFormRegister<EstoqueFormFields>;
    setValue: UseFormSetValue<EstoqueFormFields>;
}

export const QuantityPicker = forwardRef(({ register, quantityValue, setValue }: QuantityPickerProps, _) => {
    const quantity = useRef(quantityValue);
    function increaseQuantity() {
        quantity.current = quantity.current + 1;
        setValue("quantidade", quantity.current);
    }
    function decreaseQuantity() {
        quantity.current = quantity.current > 0 ? quantity.current - 1 : quantity.current;
        setValue("quantidade", quantity.current);
    }
    return (
        <div className="flex flex-col w-max p-2 bg-white rounded-lg">
            <label htmlFor="quantity" className="text-sm text-gray-500 font-medium w-full">Quantidade</label>
            <div className="mx-auto">
                <button
                    className="font-bold text-lg"
                    type="button"
                    onClick={decreaseQuantity}
                >
                    -
                </button>
                <input
                    id="quantity"
                    type="text"
                    className="border-none bg-transparent w-8 text-center"
                    {...register("quantidade")}
                />
                <button
                    className="font-bold text-lg"
                    type="button"
                    onClick={increaseQuantity}
                >
                    +
                </button>
            </div>
        </div >
    )
});
