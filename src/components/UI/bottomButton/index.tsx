import React from 'react'

interface BottomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    text: string;
}
export function BottomButton({ className, text, ...props }: BottomButtonProps) {
    return (
        <div className={`absolute mt-6 bottom-4 right-10 ${className}`}>
            <button className="px-4 py-3 text-xl font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600" {...props}>
                {text}
            </button>
        </div>
    )
}
