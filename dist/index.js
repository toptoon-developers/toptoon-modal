"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalLockScroll = exports.CustomModal = exports.ModalContainer = exports.ModalInstance = void 0;
var ModalContainer_1 = require("./ModalContainer");
Object.defineProperty(exports, "ModalInstance", { enumerable: true, get: function () { return ModalContainer_1.ModalInstance; } });
var ModalContainer_2 = __importDefault(require("./ModalContainer"));
exports.ModalContainer = ModalContainer_2.default;
var CustomModal_1 = __importDefault(require("./CustomModal"));
exports.CustomModal = CustomModal_1.default;
var ModalLockScroll_1 = __importDefault(require("./ModalLockScroll"));
exports.ModalLockScroll = ModalLockScroll_1.default;
