import React from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
  invalid?: boolean;
}

export function Input({ label, id, type, invalid, ...props }: InputProps) {
  return (
    <div className="flex flex-col w-full p-2 bg-white rounded-lg">
      <label
        htmlFor={id}
        className={`text-sm text-gray-500 ${
          invalid && "text-red-600"
        } font-medium w-full`}
      >
        {label}
      </label>
      <input
        className="text-lg font-bold outline-none"
        name={id}
        id={id}
        type={type ?? "text"}
        {...props}
      />
    </div>
  );
}
