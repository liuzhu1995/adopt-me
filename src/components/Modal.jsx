import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
const Modal = ({ children }) => {
  const el = useRef(null);
  if (!el.current) {
    el.current = document.createElement("div");
  }
  useEffect(() => {
    modalRoot.appendChild(el.current);
    return () => {
      modalRoot.removeChild(el.current);
    };
  }, []);

  return createPortal(children, el.current);
};
export default Modal;
