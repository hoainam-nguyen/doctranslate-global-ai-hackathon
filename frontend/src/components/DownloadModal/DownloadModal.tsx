import React from 'react';
import { Dialog, DialogBackdrop, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import ic_close from "@src/assets/close-outline.svg";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  fileName: string;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, downloadUrl, fileName }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />
          </TransitionChild>

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full max-w-md p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <DialogTitle as="h3" className="text-2xl font-medium leading-6 text-gray-900">
                Download Your Video 🥳
              </DialogTitle>
              <div className="mt-4">
                <p className="text-gray-500">
                  Your video has been successfully created. Click the button below to download your file.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={downloadUrl}
                  download={fileName}
                  className="px-4 py-2 bg-gradient text-lg text-white font-semibold rounded-full"
                  onClick={onClose}
                >
                  <span>{`Download`}</span>
                </a>
              </div>

              <div className="top-0 right-0 absolute ">
                <button
                  type="button"
                  className="inline-flex justify-center p-4"
                  onClick={onClose}
                >
                  <img src={ic_close} />
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DownloadModal;
