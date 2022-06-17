"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalInstance = exports.randomString = exports.countDown = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_router_1 = require("react-router");
var react_1 = __importStar(require("react"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CustomModal_1 = __importDefault(require("./CustomModal"));
/**
 * 카운트 다운 타이머 처리
 * @param startPoint
 * @param callback
 */
var countDown = function (startPoint) {
    var intervalObs = (0, rxjs_1.interval)(1000);
    var disposeInterval = intervalObs.pipe((0, operators_1.take)(startPoint));
    return disposeInterval;
};
exports.countDown = countDown;
/**
 * 랜덤 키 생성
 * @return {string} random string
 */
var randomString = function () {
    return Math.random().toString(36).substr(2, 11);
};
exports.randomString = randomString;
/**
 * 모달 컴포넌트 생성
 * @param param0 ModalItem
 * @returns
 */
var createComponent = function (_a) {
    var key = _a.key, className = _a.className, shouldCloseOnOverlayClick = _a.shouldCloseOnOverlayClick, shouldCloseOnOverlayCallback = _a.shouldCloseOnOverlayCallback, component = _a.component;
    var onClose = function () {
        ModalInstance.getInstance().delete(key);
    };
    return (react_1.default.createElement(CustomModal_1.default, { addClassName: className, onClose: onClose, shouldCloseOnOverlayClick: shouldCloseOnOverlayClick, shouldCloseOnOverlayCallback: shouldCloseOnOverlayCallback }, component));
};
var checkDuplicate = function (items, compareKey) {
    var result = lodash_1.default.filter(items, { key: compareKey });
    return result.length > 0;
};
/**
 * Modal 인스턴스
 */
var ModalInstance = /** @class */ (function () {
    function ModalInstance() {
    }
    // eslint-disable-next-line class-methods-use-this
    ModalInstance.prototype.init = function () { };
    /**
     * Modal 인스턴스 가져오기
     * @returns ModalInstance
     */
    ModalInstance.getInstance = function () {
        // eslint-disable-next-line no-return-assign
        return this.instance || (this.instance = new this());
    };
    /**
     * Observer 생성
     * @returns Array<ModalItem>
     */
    ModalInstance.prototype.create = function () {
        this.modal = new rxjs_1.BehaviorSubject([]);
        return this.modal;
    };
    /**
     * show modal
     * @param key modal key
     * @param item child component for modal
     */
    ModalInstance.prototype.push = function (modal) {
        var key = modal.key;
        if (this.modal) {
            var current = this.modal.getValue();
            // 중복 제외 처리
            if (checkDuplicate(current, key)) {
                return;
            }
            this.modal.next(this.modal.value.concat(__assign(__assign({}, modal), { originComponent: modal.component, component: createComponent(modal) })));
            return this.modal;
        }
    };
    /**
     * close modal
     * @param key modal key
     */
    ModalInstance.prototype.delete = function (key) {
        if (this.modal) {
            var modals = this.modal.getValue();
            lodash_1.default.remove(modals, function (n) {
                return n.key === key;
            });
            this.modal.next(__spreadArray([], modals, true));
        }
    };
    /**
     * close all modal
     */
    ModalInstance.prototype.reset = function () {
        if (this.modal) {
            this.modal.next([]);
        }
    };
    return ModalInstance;
}());
exports.ModalInstance = ModalInstance;
/**
 * Modal container
 * @param props ParentCompProps
 * @constructor React
 */
var ModalContainer = function (props) {
    var _a = react_1.default.useState([]), modalList = _a[0], setModalList = _a[1];
    var onLoad = props.onLoad, onOverlayClick = props.onOverlayClick;
    var router = (0, react_router_1.useLocation)();
    react_1.default.useEffect(function () {
        return function () {
            ModalInstance.getInstance().reset();
        };
    }, [router]);
    react_1.default.useEffect(function () {
        var subscriber = ModalInstance.getInstance().create();
        subscriber.subscribe({
            next: function (v) {
                setModalList(v);
            },
        });
        if (onLoad) {
            onLoad();
        }
        return function cleanup() {
            subscriber.complete();
        };
    }, []);
    (0, react_1.useEffect)(function () {
        if (modalList.length === 0) {
            document.body.classList.remove("ReactModal__Body--open");
        }
        return function () {
            document.body.classList.add("ReactModal__Body--open");
        };
    }, [modalList]);
    return (react_1.default.createElement(react_1.default.Fragment, null, modalList.map(function (item, index) {
        return react_1.default.createElement("span", { key: "modal-".concat(index) }, item.component);
    })));
};
exports.default = ModalContainer;
