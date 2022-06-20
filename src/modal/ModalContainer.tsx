import _ from "lodash";
import { useLocation } from "react-router";
import React, { useEffect } from "react";
import { BehaviorSubject, interval } from "rxjs";
import { take } from "rxjs/operators";
import CustomModal from "./CustomModal";

/**
 * 카운트 다운 타이머 처리
 * @param startPoint
 */
export const countDown = (startPoint: number) => {
  const intervalObs = interval(1000);
  const disposeInterval = intervalObs.pipe(take(startPoint));
  return disposeInterval;
};

/**
 * 기본 모달 아이템 정의
 */
interface ModalItemProps {
  key: string;
  styles?: object;
  className?: string;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnOverlayCallback?: (e: any) => void;
  shouldCloseOnEsc?: boolean;
  originComponent?: JSX.Element;
  component: JSX.Element;
}

/**
 * 랜덤 키 생성
 * @return {string} random string
 */
export const randomString = (): string => {
  return Math.random().toString(36).substr(2, 11);
};

/**
 * 모달 컴포넌트 생성
 * @param param0 ModalItem
 * @returns
 */
const createComponent = ({
  key,
  className,
  shouldCloseOnOverlayClick,
  shouldCloseOnOverlayCallback,
  component,
}: ModalItemProps): React.ReactElement => {
  const onClose = () => {
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

const checkDuplicate = (items: Array<ModalItemProps>, compareKey: string) => {
  const result = _.filter(items, { key: compareKey });
  return result.length > 0;
};

/**
 * Modal 인스턴스
 */
export class ModalInstance {
  private static instance: ModalInstance;
  private modal: BehaviorSubject<Array<ModalItemProps>> | undefined;

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
  public create(): BehaviorSubject<Array<ModalItemProps>> {
    this.modal = new BehaviorSubject<Array<ModalItemProps>>([]);
    return this.modal;
  }

  /**
   * show modal
   * @param key modal key
   * @param item child component for modal
   */
  public push(modal: ModalItemProps) {
    const { key } = modal;
    if (this.modal) {
      const current: Array<ModalItemProps> = this.modal.getValue();

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
      const modals: Array<ModalItemProps> = this.modal.getValue();
      _.remove(modals, (n: any) => {
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
  const [modalList, setModalList] = React.useState<Array<ModalItemProps>>([]);
  const { onLoad, onOverlayClick } = props;

  const router = useLocation();

  React.useEffect(() => {
    return () => {
      ModalInstance.getInstance().reset();
    };
  }, [router]);

  React.useEffect(() => {
    const subscriber = ModalInstance.getInstance().create();
    subscriber.subscribe({
      next: (v: Array<ModalItemProps>) => {
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

  useEffect(() => {
    if (modalList.length === 0) {
      document.body.classList.remove("ReactModal__Body--open");
    }
    return () => {
      document.body.classList.add("ReactModal__Body--open");
    };
  }, [modalList]);

  return (
    <>
      {/* Safari에서 Bottom Bar Behavior  숨김/ 보여짐시 height 대응 */}
      {/* {modalList.length > 0 && <ModalLockScroll />} */}
      {modalList.map((item, index) => {
        return <span key={`modal-${index}`}>{item.component}</span>;
      })}
    </>
  );
};

export default ModalContainer;
