import Image from "next/image";
import { X } from "../../../../public/svg/X";
import { Modal } from "../modal";

export function MessageModal({
  message,
  icon,
  onClose,
}: {
  message: string;
  icon: string;
  onClose: () => void;
}) {
  return (
    <Modal
      className="flex flex-col items-center justify-center bg-orange-500 shadow-2xl p-8 rounded-2xl"
      onClose={onClose}
    >
      <button onClick={onClose} className="self-end">
        <X />
      </button>
      <Image src={icon} width={150} height={150} alt="Ícone de alerta" />
      <h2 className="text-white font-bold text-3xl py-6 px-16">{message}</h2>
    </Modal>
  );
}
