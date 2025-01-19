import dynamic from "next/dynamic";
import React, { useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: "modal" | "sidebar";
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  type = "modal",
}) => {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {type === "modal"
        ? isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div
                className="flex h-full w-full items-center justify-center bg-black/80 backdrop-blur-md"
                onClick={handleBackdropClick}
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="relative mx-4 flex items-center justify-center rounded border bg-background p-8 text-text shadow-lg dark:bg-black dark:text-white md:max-w-[60vw]"
                >
                  <button
                    onClick={onClose}
                    className="absolute right-1 top-1 flex aspect-square text-center text-4xl"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {children}
                </motion.div>
              </div>
            </motion.div>
          )
        : isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="fixed inset-0 z-40 bg-black/80 px-5 backdrop-blur-md"
            >
              <div
                className="container mt-[80px] flex h-full w-full justify-end"
                onClick={handleBackdropClick}
              >
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    ease: "easeOut",
                  }}
                  className="relative flex h-fit w-[250px] items-center justify-center rounded bg-background shadow-lg dark:bg-background-dark"
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          )}
    </AnimatePresence>,
    document.body
  );
};

Dialog.displayName = "Dialog";

export default dynamic(() => Promise.resolve(React.memo(Dialog)), {
  ssr: false,
});
