import React, { useState } from "react";
import { createPortal } from "react-dom";

const Drawer = ({ isOpen, onClose, children }) => {
  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        className={`relative bg-white w-80 max-w-full h-full shadow-lg p-5 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
