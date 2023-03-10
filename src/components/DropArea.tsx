import { createLogger, forwardRef, spreadProps } from '../utilities';
import { Dom, HtmlParentProps, HtmlTag, TagToElement } from './Dom';

export interface DropAreaProps<T extends HtmlTag>
  extends Omit<
    HtmlParentProps<T>,
    'onDragEnter' | 'onDragLeave' | 'onDragOver'
  > {
  kind?: string;
  onDragEnter?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
}

export const DRAG_OVER_CLASS = 'is-dragging-over';

export function DropArea<T extends HtmlTag>(props: DropAreaProps<T>) {
  let el: HTMLElement;
  let dragOverCount = 0;
  const log = createLogger('DropArea');

  return (
    <Dom
      ref={(ref: TagToElement<T>) => (el = forwardRef(props, ref))}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      {...spreadProps(props, ['onDragEnter', 'onDragLeave', 'onDragOver'])}
    />
  );

  function onDragEnter(event: DragEvent) {
    if (!isRightKind(event)) return;
    dragOverCount++;

    event.stopPropagation();
    log('Drag enter', dragOverCount);

    if (!el.classList.contains(DRAG_OVER_CLASS))
      el.classList.add(DRAG_OVER_CLASS);
  }

  function onDragLeave(event: DragEvent) {
    if (!isRightKind(event)) return;
    dragOverCount--;
    log('Drag leave', dragOverCount);
    if (dragOverCount > 0) return;

    event.stopPropagation();

    if (el.classList.contains(DRAG_OVER_CLASS))
      el.classList.remove(DRAG_OVER_CLASS);
  }

  function onDragOver(event: DragEvent) {
    if (!isRightKind(event)) return;

    event.stopPropagation();
    // console.log('Drag over panel', instance);
  }

  function isRightKind(event: DragEvent) {
    if (!props.kind) return true;
    if (!event.dataTransfer) return false;

    const kinds = Array.from(event.dataTransfer.items)
      .filter((item) => item.type.startsWith('drag-kind/'))
      .map((item) => item.type.replace('drag-kind/', ''));

    return kinds.includes(props.kind);
  }
}
