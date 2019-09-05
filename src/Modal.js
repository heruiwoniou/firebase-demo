import React, { useEffect, useCallback } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";

const Portal = ({ children }) => {
  const mountNode = document.createElement("div");
  useEffect(() => {
    document.body.appendChild(mountNode);
    return () => {
      document.body.removeChild(mountNode);
    };
  });

  return ReactDom.createPortal(children, mountNode);
};

const Modal = ({ open, title = "", children, onClose }) => {
  const onCloseHanlder = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  return (
    open && (
      <Portal>
        <StyledModalWrapper>
          <StyledModal>
            <StyledHeader>
              <StyledTitle>{title}</StyledTitle>
              <StyledClose onClick={onCloseHanlder}>X</StyledClose>
            </StyledHeader>
            <StyledBody>{children}</StyledBody>
          </StyledModal>
        </StyledModalWrapper>
      </Portal>
    )
  );
};

export default Modal;

const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
`;
const StyledModal = styled.div`
	position: absolute;
	background: white;
	left: 50%;
	top: 50%;
  transform: translate(-50%, -50%);
`;
const StyledBody = styled.div`
  width: 500px;
  height: auto;
	overflow: auto;
	padding: 10px;
`;
const StyledHeader = styled.div`
  display: flex;
  height: 50px;
  line-height: 50px;
`;
const StyledTitle = styled.div`
  flex-grow: 1;
`;
const StyledClose = styled.button`
  height: 50px;
  width: 50px;
`;
