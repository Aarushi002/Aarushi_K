/** Safari <14 uses addListener/removeListener on MediaQueryList */
export function subscribeMq(mq: MediaQueryList, fn: () => void): () => void {
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }
  mq.addListener(fn);
  return () => mq.removeListener(fn);
}
