import React from 'react'
import { X } from '../../../../public/svg/X'

export function ModalHeader({ title, onClose }: { title: string, onClose: () => void }) {
    return <div className="flex justify-between w-full">
        <h1 className="mx-auto text-3xl font-bold text-white">
            {title}
        </h1>
        <button onClick={onClose}>
            <X />
        </button>
    </div>
}
