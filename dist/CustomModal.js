"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_1 = __importDefault(require("@emotion/styled"));
var classnames_1 = __importDefault(require("classnames"));
var CustomModal = function (props) {
    var children = props.children, onClose = props.onClose, addClassName = props.addClassName, shouldCloseOnEsc = props.shouldCloseOnEsc, shouldCloseOnOverlayClick = props.shouldCloseOnOverlayClick, shouldCloseOnOverlayCallback = props.shouldCloseOnOverlayCallback;
    return (react_1.default.createElement(CustormModalStyled, { id: "ModalContainer", className: "modal" },
        react_1.default.createElement("div", { id: "overLay", className: "modal-overlay", onClick: shouldCloseOnOverlayClick ? onClose : shouldCloseOnOverlayCallback }),
        react_1.default.createElement("div", { className: (0, classnames_1.default)(["modal-content", "".concat(addClassName !== null && addClassName !== void 0 ? addClassName : "")]) }, children)));
};
exports.default = CustomModal;
var CustormModalStyled = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &#ModalContainer {\n    z-index: 110;\n    display: flex;\n    height: 100%;\n    position: fixed;\n    width: 100%;\n    top: 0;\n    left: 0;\n\n    & .modal-overlay {\n      z-index: 500;\n      position: absolute;\n      top: 0;\n      left: 0;\n      z-index: 500;\n      width: 100%;\n      height: 100%;\n      background: rgba(0, 0, 0, 0.5);\n    }\n\n    & .modal-content {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      z-index: 1000;\n      transform: translate(-50%, -50%);\n      min-width: 10px;\n      min-height: 10px;\n    }\n\n    & .srrckguide {\n      width: 100%;\n      height: 100%;\n    }\n  }\n\n  @media (min-width: 0) and (max-width: 767px) {\n    &#ModalContainer {\n      & .modal-content {\n        &.to-bottom {\n          position: fixed;\n          bottom: 30px;\n          left: 50%;\n          transform: translateX(-50%);\n          top: unset;\n        }\n      }\n    }\n  }\n"], ["\n  &#ModalContainer {\n    z-index: 110;\n    display: flex;\n    height: 100%;\n    position: fixed;\n    width: 100%;\n    top: 0;\n    left: 0;\n\n    & .modal-overlay {\n      z-index: 500;\n      position: absolute;\n      top: 0;\n      left: 0;\n      z-index: 500;\n      width: 100%;\n      height: 100%;\n      background: rgba(0, 0, 0, 0.5);\n    }\n\n    & .modal-content {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      z-index: 1000;\n      transform: translate(-50%, -50%);\n      min-width: 10px;\n      min-height: 10px;\n    }\n\n    & .srrckguide {\n      width: 100%;\n      height: 100%;\n    }\n  }\n\n  @media (min-width: 0) and (max-width: 767px) {\n    &#ModalContainer {\n      & .modal-content {\n        &.to-bottom {\n          position: fixed;\n          bottom: 30px;\n          left: 50%;\n          transform: translateX(-50%);\n          top: unset;\n        }\n      }\n    }\n  }\n"])));
var templateObject_1;
