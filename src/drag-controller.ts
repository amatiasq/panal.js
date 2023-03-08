let draggingKind: string | null = null;

export function startDragging(kind: string) {
  draggingKind = kind;
}

export function stopDragging() {
  draggingKind = null;
}

export function isDragging(kind: string) {
  return draggingKind === kind;
}
