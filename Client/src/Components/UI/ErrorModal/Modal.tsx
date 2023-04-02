import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

interface PropsInterface {
  onClose: () => void;
}

export const Backdrop: React.FC<PropsInterface> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

export const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal: React.FC<PropsInterface> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlays")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")!
      )}
    </>
  );
};

export default Modal;
