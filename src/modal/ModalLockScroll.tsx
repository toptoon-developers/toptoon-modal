import { useEffect } from "react";
import { isMobileSafari } from "react-device-detect";

const ModalLockScroll = () => {
  const body: HTMLBodyElement | null = document.querySelector("body");
  const root: HTMLElement | null = document.getElementById("__next");
  const html: HTMLElement | null = document.querySelector("html");
  const scrollPosition = window.scrollY;

  const syncHeight = () => {
    document.documentElement.style.setProperty(
      "height",
      `${window.innerHeight}px`
    );
  };

  useEffect(() => {
    if (!body) return;

    if (!isMobileSafari) return;

    if (!root) return;

    if (!html) return;

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
  }, [body, root, html, scrollPosition]);

  return <></>;
};

export default ModalLockScroll;
