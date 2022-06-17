import React from "react";
import styled from "@emotion/styled";
import cn from "classnames";

interface CustomModalProps {
  shouldCloseOnEsc?: boolean;
  children: React.ReactNode;
  onClose?: (e: any) => void;
  addClassName?: string;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnOverlayCallback?: (e: any) => void;
}

const CustomModal = (props: CustomModalProps) => {
  const {
    children,
    onClose,
    addClassName,
    shouldCloseOnEsc,
    shouldCloseOnOverlayClick,
    shouldCloseOnOverlayCallback,
  } = props;

  return (
    <CustormModalStyled id="ModalContainer" className="modal">
      <div
        id="overLay"
        className="modal-overlay"
        onClick={
          shouldCloseOnOverlayClick ? onClose : shouldCloseOnOverlayCallback
        }
      />
      <div className={cn([`modal-content`, `${addClassName ?? ""}`])}>
        {children}
      </div>
    </CustormModalStyled>
  );
};

export default CustomModal;

const CustormModalStyled = styled.div`
  &#ModalContainer {
    z-index: 110;
    display: flex;
    height: 100%;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    & .modal-overlay {
      z-index: 500;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 500;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    & .modal-content {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1000;
      transform: translate(-50%, -50%);
      min-width: 10px;
      min-height: 10px;
    }

    & .srrckguide {
      width: 100%;
      height: 100%;
    }
  }

  @media (min-width: 0) and (max-width: 767px) {
    &#ModalContainer {
      & .modal-content {
        &.to-bottom {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          top: unset;
        }
      }
    }
  }
`;
