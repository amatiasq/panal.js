import { css } from '@emotion/css';
import {
  isDraggingSameKind,
  startDragging,
  stopDragging,
} from '../drag-controller';
import { ChildrenProp, PanelData, RefProp } from '../types';
import { createLogger, forwardRef, px } from '../utilities';
import { Draggable } from './Draggable';
import { DropArea } from './DropArea';

const dropGradient = `
  #ff000077,
  #ff000077 20%,
  #ffff0077 20%,
  #ffff0077 40%,
  #00ff0077 40%,
  #00ff0077 60%,
  #ffff0077 60%,
  #ffff0077 80%,
  #ff000077 80%,
  #ff000077
`;

const styles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  header {
    background: rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid gray;
    padding: 0.05em 0.4em;
  }

  &.is-dragging-over {
    background: linear-gradient(to bottom, ${dropGradient}),
      linear-gradient(to right, ${dropGradient});
  }
`;

const panelContentStyles = css`
  padding: 0.5em 1em;
`;

export interface PanelProps extends PanelData, ChildrenProp, RefProp {
  onDragStart?(): void;
  onDragEnd?(): void;
}

export function Panel(props: PanelProps) {
  let el: HTMLElement;
  const log = createLogger('Panel');

  return (
    <DropArea
      ref={(ref) => (el = forwardRef(props, ref))}
      class={styles}
      data-kind="panel"
      style={{ 'flex-basis': px(props.size) }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <Draggable
        as="header"
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        drawElement={() => el}
      >
        {props.content}
      </Draggable>

      <div class={panelContentStyles}>This is the content</div>
    </DropArea>
  );

  function onDrag() {
    // log('Draggin panel');
  }

  function onDragStart() {
    startDragging(el);
    props.onDragStart?.();
    log('Drag started');
  }

  function onDragEnd() {
    stopDragging();
    props.onDragEnd?.();
    log('Drag ended');
  }

  function onDragEnter(event: DragEvent) {
    if (!isDraggingSameKind(el)) return;

    event.stopPropagation();
    log('Drag enter');

    if (!el.classList.contains('is-dragging-over'))
      el.classList.add('is-dragging-over');
  }

  function onDragLeave(event: DragEvent) {
    event.stopPropagation();
    log('Drag leave');

    if (el.classList.contains('is-dragging-over'))
      el.classList.remove('is-dragging-over');
  }

  function onDragOver(event: DragEvent) {
    event.stopPropagation();
    // log('Drag over panel');
  }
}
