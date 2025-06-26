import { useEffect, useState } from "react";

export default function Modal({ children, open, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  const cerrarConAnimacion = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  const modalContent = (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={cerrarConAnimacion}
      />

      <div
        className={`relative bg-white rounded-lg p-6 shadow-lg w-full max-w-md transform transition-all duration-300 ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children({ cerrar: cerrarConAnimacion })}
      </div>
    </div>
  );

  // Sin portal
  return modalContent;

  // Con portal
  // return ReactDOM.createPortal(modalContent, document.body);
}
