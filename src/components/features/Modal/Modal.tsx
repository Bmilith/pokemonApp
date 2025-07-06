import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { Button } from '@/components/core';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-none sm:rounded-lg shadow-xl w-full h-full sm:w-1/2 sm:h-auto p-4 sm:p-10 relative overflow-auto max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="my-5 ">
          <Button
            onClick={onClose}
            variant="secondary"
            icon={
              <IoIosClose
                size={60}
                className="hover:bg-green-200 hover:cursor-pointer hover:rounded"
              />
            }
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
