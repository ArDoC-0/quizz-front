import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./popUp.scss";

type popupParams = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Popup({ open, onClose, children }:popupParams) {
  if (!open) return null;

  return createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}