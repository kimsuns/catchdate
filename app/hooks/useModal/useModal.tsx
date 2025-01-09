"use client";

import { useCallback, useRef, useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    console.log("모달 열림");
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const Modal = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        {isModalOpen && (
          <div
            className="absolute w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 p-5"
            ref={ref}
          >
            <div className="bg-white p-5 rounded-lg shadow-lg">{children}</div>
          </div>
        )}
      </>
    );
  };

  return { Modal, openModal, closeModal };
};
