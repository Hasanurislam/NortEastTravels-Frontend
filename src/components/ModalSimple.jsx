// ModalSimple.jsx
import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-auto max-h-[90vh]">
        <div className="p-4 border-b flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
