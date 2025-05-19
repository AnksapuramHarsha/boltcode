import React, { FC, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"></div>

      {/* Modal */}
      <div className="relative z-[9999] bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Confirm Deletion</h2>
        <p className="mb-6 text-center text-gray-700">
          Are you sure you want to delete this patient? This action cannot be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-5 py-2 bg-green-700 text-white rounded-md hover:bg-green-600"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;