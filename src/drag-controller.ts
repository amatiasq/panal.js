import { createSignal } from 'solid-js';

const [dragging, setDragging] = createSignal<HTMLElement | null>(null);

export const startDragging = setDragging;

export function stopDragging() {
  setDragging(null);
}

export function isDraggingSameKind(el: HTMLElement) {
  const draggingElement = dragging();

  if (!draggingElement || draggingElement === el) return false;

  const draggedKind = draggingElement.dataset.kind;
  const expectedKind = el.dataset.kind;
  return draggedKind === expectedKind;
}

export function isDragging() {
  return Boolean(dragging());
}
