import { splitProps } from 'solid-js';
import { forwardRef } from '../utilities';
import { Dom, HtmlParentProps, HtmlTag } from './Dom';

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

let instances = 0;

export const DRAG_OVER_CLASS = 'is-dragging-over';

export function DropArea<T extends HtmlTag>(props: DropAreaProps<T>) {
  let el: HTMLElement;
  const instance = instances++;
  const log = (...args: any[]) => console.log(`DropArea[${instance}]`, ...args);

  const [, spread] = splitProps(props, [
    'onDragEnter',
    'onDragLeave',
    'onDragOver',
  ]);

  return (
    <Dom
      ref={(ref) => (el = forwardRef(props, ref))}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      {...spread}
    />
  );

  function onDragEnter(event: DragEvent) {
    if (!isRightKind(event)) return;

    event.stopPropagation();
    log('Drag enter');

    if (!el.classList.contains(DRAG_OVER_CLASS))
      el.classList.add(DRAG_OVER_CLASS);
  }

  function onDragLeave(event: DragEvent) {
    if (!isRightKind(event)) return;

    event.stopPropagation();
    log('Drag leave');

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
