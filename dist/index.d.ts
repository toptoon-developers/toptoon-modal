import React from "react";
import { BehaviorSubject } from "rxjs";
/**
 * 카운트 다운 타이머 처리
 * @param startPoint
 * @param callback
 */
export declare const countDown: (startPoint: number) => import("rxjs").Observable<number>;
/**
 * 기본 모달 아이템 정의
 */
export declare type ModalItem = {
    key: string;
    styles?: object;
    className?: string;
    shouldCloseOnOverlayClick?: boolean;
    shouldCloseOnOverlayCallback?: (e: any) => void;
    shouldCloseOnEsc?: boolean;
    originComponent?: JSX.Element;
    component: JSX.Element;
};
/**
 * 랜덤 키 생성
 * @return {string} random string
 */
export declare const randomString: () => string;
/**
 * Modal 인스턴스
 */
export declare class ModalInstance {
    private static instance;
    private modal;
    init(): void;
    /**
     * Modal 인스턴스 가져오기
     * @returns ModalInstance
     */
    static getInstance(): ModalInstance;
    /**
     * Observer 생성
     * @returns Array<ModalItem>
     */
    create(): BehaviorSubject<Array<ModalItem>>;
    /**
     * show modal
     * @param key modal key
     * @param item child component for modal
     */
    push(modal: ModalItem): BehaviorSubject<ModalItem[]> | undefined;
    /**
     * close modal
     * @param key modal key
     */
    delete(key: string): void;
    /**
     * close all modal
     */
    reset(): void;
}
interface ModalContainerProps {
    onOverlayClick?: () => void | undefined;
    onLoad?: () => void | undefined;
}
/**
 * Modal container
 * @param props ParentCompProps
 * @constructor React
 */
declare const ModalContainer: React.FC<ModalContainerProps>;
export default ModalContainer;
