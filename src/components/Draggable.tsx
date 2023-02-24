import { ParentProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ElementType } from '../types';

export type DragDelta = [deltaX: number, deltaY: number];
export type DragListener = (delta: DragDelta) => void;

export function Draggable<C extends ElementType>(
  props: ParentProps<{
    as?: C;
    class?: string;
    hideDrawImage?: boolean;
    drawElement?: () => HTMLElement;
    onDrag: DragListener;
    onDragStart?: () => void;
    onDragEnd?: () => void;
  }>
) {
  let dragStartX = 0;
  let dragStartY = 0;
  let lastEmittedDelta = [0, 0] as DragDelta;
  let hasSkippedOne = false;

  return (
    <Dynamic
      component={props.as ?? 'div'}
      class={props.class}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      draggable={true}
    >
      {props.children}
    </Dynamic>
  );

  function emit(deltaX: number, deltaY: number) {
    lastEmittedDelta = [deltaX, deltaY];
    console.log(lastEmittedDelta);
    props.onDrag(lastEmittedDelta);
  }

  function onDrag(e: DragEvent) {
    e.stopPropagation();
    notifyDeltaChange(e);
  }

  function onDragEnd(e: DragEvent) {
    e.stopPropagation();
    notifyDeltaChange(e);

    if (props.onDragEnd) {
      props.onDragEnd();
    }
  }

  function onDragStart(e: DragEvent) {
    e.stopPropagation();

    dragStartX = e.clientX;
    dragStartY = e.clientY;

    if (props.onDragStart) {
      props.onDragStart();
    }

    if (props.hideDrawImage) {
      setImageTo1pxTransparent(e);
    } else if (props.drawElement) {
      setDrawImage(e, props.drawElement());
    }

    emit(0, 0);
  }

  function notifyDeltaChange(e: DragEvent) {
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;

    if (deltaX === lastEmittedDelta[0] && deltaY === lastEmittedDelta[1])
      return;

    if (!hasSkippedOne && mayBeWeirdEventSentByBrowser(deltaX, deltaY)) {
      console.log('Skip', [deltaX, deltaY]);
      hasSkippedOne = true;
      return;
    }

    hasSkippedOne = false;
    emit(deltaX, deltaY);
  }

  function mayBeWeirdEventSentByBrowser(deltaX: number, deltaY: number) {
    const diffX = Math.abs(deltaX - lastEmittedDelta[0]);
    const diffY = Math.abs(deltaY - lastEmittedDelta[1]);
    return diffX > 100 && diffY > 100;
  }
}

function setImageTo1pxTransparent(e: DragEvent) {
  // set the drag image to a transparent pixel
  const img = new Image();
  img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  e.dataTransfer?.setDragImage(img, 0, 0);
  console.log('set image');
}

function setDrawImage(event: DragEvent, el: HTMLElement) {
  event.dataTransfer?.setDragImage(el, el.offsetWidth / 2, 16);
}
