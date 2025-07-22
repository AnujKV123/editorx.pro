import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOutsideClick = true,
  closeOnEsc = true,
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeOnEsc, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOutsideClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 focus:outline-none"
        tabIndex={-1}
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="secondary" 
          size="icon"
          aria-label="Close Modal"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Title */}
        {title && (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
        )}

        {/* Body */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
