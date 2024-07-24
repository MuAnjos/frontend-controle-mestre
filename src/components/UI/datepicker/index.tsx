import "react-datepicker/dist/react-datepicker.css";
import React, { forwardRef } from "react";
import DatePicker, { DatePickerProps, registerLocale } from "react-datepicker";
import { ptBR } from 'date-fns/locale/pt-BR';

registerLocale("pt_BR", ptBR);

interface CDatePickerProps extends React.HTMLAttributes<DatePickerProps> {
    label: string;
    invalid: boolean;
    onChange: any;
    selected: any;
    required?: boolean;
    register?: any;
}

export const CDatePicker = forwardRef(
    (
        { label, invalid, register, required, ...props }: CDatePickerProps, _
    ) => {
        return (
            <div className="flex flex-col w-full p-2 bg-white rounded-lg">
                <label htmlFor={props.id} className={`text-sm text-gray-500 ${invalid && "text-red-500"} false font-medium w-full`}>
                    {label}<span className="text-red-500">{required && "*"}</span>
                </label>
                <DatePicker
                    className="focus:outline-none"
                    locale="pt_BR"
                    maxDate={new Date()}
                    {...register("dataDeNascimento")}
                    {...props}
                />
            </div>
        );
    }
);