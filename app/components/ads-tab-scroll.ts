/** Rola só o ancestral da faixa. Para no limite do componente para não mover a página. */
function scrollParent(el: HTMLElement, boundary: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node) {
    const overflow = getComputedStyle(node).overflowX;
    if (overflow === "auto" || overflow === "scroll") return node;
    if (node === boundary) return null;
    node = node.parentElement;
  }
  return null;
}

/** Traz a aba ativa para a área visível quando a faixa está rolando. */
export function revealActiveTab(scope: HTMLElement | null | undefined) {
  if (!scope) return;
  const active = scope.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
  if (!active) return;
  const scroller = scrollParent(active, scope);
  if (!scroller) return;

  const scrollerBox = scroller.getBoundingClientRect();
  const tabBox = active.getBoundingClientRect();
  const styles = getComputedStyle(scroller);
  const left = scrollerBox.left + (Number.parseFloat(styles.paddingLeft) || 0);
  const right = scrollerBox.right - (Number.parseFloat(styles.paddingRight) || 0);

  if (tabBox.left < left) scroller.scrollLeft -= left - tabBox.left;
  else if (tabBox.right > right) scroller.scrollLeft += tabBox.right - right;
}

/**
 * Com a barra escondida, a roda do mouse em cima da faixa rola as abas.
 * Se a faixa cabe, o evento segue para a página.
 */
export function bindTabWheel(el: HTMLElement) {
  const onWheel = (event: WheelEvent) => {
    if (el.scrollWidth <= el.clientWidth) return;
    if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    el.scrollLeft += event.deltaY;
    event.preventDefault();
  };
  el.addEventListener("wheel", onWheel, { passive: false });
  return () => el.removeEventListener("wheel", onWheel);
}
