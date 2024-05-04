"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Modal({
  children,
  className,
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const element = document.querySelector("#modal") as Element;

  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted
    ? createPortal(
        <>
          <div
            className="w-full h-full absolute z-10 backdrop-blur-sm"
            onClick={onClose}
          />
          <dialog
            open
            className="absolute top-1/2 bottom-1/2 z-10 max-w-[90%]"
            onClose={onClose}
          >
            <div className={className ?? ""}>{children}</div>
          </dialog>
        </>,
        element
      )
    : null;
}
