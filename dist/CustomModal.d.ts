import React from "react";
interface CustomModalProps {
    shouldCloseOnEsc?: boolean;
    children: React.ReactNode;
    onClose?: (e: any) => void;
    addClassName?: string;
    shouldCloseOnOverlayClick?: boolean;
    shouldCloseOnOverlayCallback?: (e: any) => void;
}
declare const CustomModal: (props: CustomModalProps) => JSX.Element;
export default CustomModal;
