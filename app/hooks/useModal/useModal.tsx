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
          <div className="" ref={ref}>
            <div>{children}</div>
          </div>
        )}
      </>
    );
  };

  return { Modal, openModal, closeModal };
};
