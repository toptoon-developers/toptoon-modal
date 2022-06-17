import _ from "lodash";
import React, { useEffect } from "react";
import { isMobileSafari } from "react-device-detect";
import { BehaviorSubject, interval } from "rxjs";
import { take } from "rxjs/operators";
import { useHistory, useLocation } from "react-router-dom";
import CustomModal from "./CustomModal";

/**
 * 카운트 다운 타이머 처리
 * @param startPoint
 * @param callback
 */
export const countDown = (startPoint: number) => {
  const intervalObs = interval(1000);
  const disposeInterval = intervalObs.pipe(take(startPoint));
  return disposeInterval;
};

/**
 * ANCHOR: mobileSafari 에서 Modal 활성화 시 스크롤 방지하기
 */
export const ModalLockScroll = () => {
  const body = document.querySelector("body");
  const root = document.getElementById("root");
  const html = document.querySelector("html");
  const scrollPosition = window.scrollY;

  const syncHeight = () => {
    document.documentElement.style.setProperty(
      "height",
      `${window.innerHeight}px`
    );
  };

  useEffect(() => {
    if (!isMobileSafari) return null;

    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.overflow = "hidden";
    body.style.width = "100%";
    root.style.overflow = "unset";
    html.style.height = `${window.innerHeight}px`;
    window.addEventListener("resize", syncHeight);

    return () => {
      if (isMobileSafari) {
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("overflow");
        body.style.removeProperty("width");
        root.style.removeProperty("overflow");
        html.style.removeProperty("height");
        window.scrollTo(0, scrollPosition);
        window.removeEventListener("resize", syncHeight);
      }
    };
  }, []);

  return <></>;
};

/**
 * 기본 모달 아이템 정의
 */
export type ModalItem = {
  key: string;
  styles?: object;
  className?: string;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnOverlayCallback?: (e) => void;
  shouldCloseOnEsc?: boolean;
  originComponent?: JSX.Element;
  component: JSX.Element;
};

/**
 * 랜덤 키 생성
 * @return {string} random string
 */
export const randomString = (): string => {
  return Math.random().toString(36).substr(2, 11);
};

/**
 * 모달 기본 스타일 지정
 */
const defaultStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  content: {
    outline: "none",
  },
};

/**
 * 모달 컴포넌트 생성
 * @param param0 ModalItem
 * @returns
 */
const createComponent = ({
  key,
  styles,
  className,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
  shouldCloseOnOverlayCallback,
  component,
}: ModalItem): React.ReactElement => {
  const onClose = (e) => {
    ModalInstance.getInstance().delete(key);
  };

  return (
    <CustomModal
      addClassName={className}
      onClose={onClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnOverlayCallback={shouldCloseOnOverlayCallback}
    >
      {component}
    </CustomModal>
  );
};

const checkDuplicate = (items: Array<ModalItem>, compareKey: string) => {
  const result = _.filter(items, { key: compareKey });
  return result.length > 0;
};

/**
 * Modal 인스턴스
 */
export class ModalInstance {
  private static instance: ModalInstance;

  private modal: BehaviorSubject<Array<ModalItem>> | undefined;

  // eslint-disable-next-line class-methods-use-this
  init() {}

  /**
   * Modal 인스턴스 가져오기
   * @returns ModalInstance
   */
  public static getInstance(): ModalInstance {
    // eslint-disable-next-line no-return-assign
    return this.instance || (this.instance = new this());
  }

  /**
   * Observer 생성
   * @returns Array<ModalItem>
   */
  public create(): BehaviorSubject<Array<ModalItem>> {
    this.modal = new BehaviorSubject<Array<ModalItem>>([]);
    return this.modal;
  }

  /**
   * show modal
   * @param key modal key
   * @param item child component for modal
   */
  public push(modal: ModalItem) {
    const { key } = modal;
    if (this.modal) {
      const current: Array<ModalItem> = this.modal.getValue();

      // 중복 제외 처리
      if (checkDuplicate(current, key)) {
        return;
      }

      this.modal.next(
        this.modal.value.concat({
          ...modal,
          originComponent: modal.component,
          component: createComponent(modal),
        })
      );
      return this.modal;
    }
  }

  /**
   * close modal
   * @param key modal key
   */
  public delete(key: string) {
    if (this.modal) {
      const modals: Array<ModalItem> = this.modal.getValue();
      _.remove(modals, (n) => {
        return n.key === key;
      });
      this.modal.next([...modals]);
    }
  }

  /**
   * close all modal
   */
  public reset() {
    if (this.modal) {
      this.modal.next([]);
    }
  }
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
const ModalContainer: React.FC<ModalContainerProps> = (props) => {
  const [modalList, setModalList] = React.useState<Array<ModalItem>>([]);
  const location = useLocation();
  const history = useHistory();
  const { onLoad, onOverlayClick } = props;

  React.useEffect(() => {
    return () => {
      ModalInstance.getInstance().reset();
    };
  }, [location]);
  React.useEffect(() => {
    const subscriber = ModalInstance.getInstance().create();
    subscriber.subscribe({
      next: (v: Array<ModalItem>) => {
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

  return (
    <>
      {/* Safari에서 Bottom Bar Behavior  숨김/ 보여짐시 height 대응 */}
      {modalList.length > 0 && <ModalLockScroll />}
      {modalList.map((item) => {
        return item.component;
      })}
    </>
  );
};

export default ModalContainer;
