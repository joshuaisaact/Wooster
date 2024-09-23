function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="z-500 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-lg rounded-lg bg-white p-6">
        <button className="absolute right-4 top-4 text-black" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
