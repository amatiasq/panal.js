import { Dynamic } from 'solid-js/web';
import { AsProp, ChildrenProp, ClassProp } from '../types';

export type DragDelta = [deltaX: number, deltaY: number];
export type DragListener = (delta: DragDelta) => void;

export interface DraggableProps extends AsProp, ChildrenProp, ClassProp {
  hideDrawImage?: boolean;
  drawElement?: () => HTMLElement;
  onDrag: DragListener;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function Draggable(props: DraggableProps) {
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

  function onDrag(event: DragEvent) {
    event.stopPropagation();
    notifyDeltaChange(event);
  }

  function onDragEnd(event: DragEvent) {
    event.stopPropagation();
    notifyDeltaChange(event);

    if (props.onDragEnd) {
      props.onDragEnd();
    }
  }

  function onDragStart(event: DragEvent) {
    event.stopPropagation();

    dragStartX = event.clientX;
    dragStartY = event.clientY;

    if (props.onDragStart) {
      props.onDragStart();
    }

    if (props.hideDrawImage) {
      setImageTo1pxTransparent(event);
    } else if (props.drawElement) {
      setDrawImage(event, props.drawElement());
    }

    emit(0, 0);
  }

  function notifyDeltaChange(event: DragEvent) {
    const deltaX = event.clientX - dragStartX;
    const deltaY = event.clientY - dragStartY;

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
  const bounds = el.getBoundingClientRect();
  const x = event.clientX - bounds.x;
  const y = event.clientY - bounds.y;
  event.dataTransfer?.setDragImage(el, x, y);
}
