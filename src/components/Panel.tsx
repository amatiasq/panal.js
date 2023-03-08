import { css } from '@emotion/css';
import { isDragging, startDragging, stopDragging } from '../drag-controller';
import { ChildrenProp, PanelData, RefProp } from '../types';
import { forwardRef, px } from '../utilities';
import { Draggable } from './Draggable';

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

export interface PanelProps
  extends PanelData,
    ChildrenProp,
    RefProp<HTMLDivElement> {}

let instances = 0;

export function Panel(props: PanelProps) {
  let el: HTMLDivElement;
  const instance = instances++;

  return (
    <div
      ref={(ref) => (el = forwardRef(props, ref))}
      class={styles}
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
    </div>
  );

  function onDrag() {
    console.log('Draggin panel', instance);
  }

  function onDragStart() {
    startDragging('panel');
    console.log('Drag started', instance);
  }

  function onDragEnd() {
    stopDragging();
    console.log('Drag ended', instance);
  }

  function onDragEnter(event: DragEvent) {
    if (!isDragging('panel')) return;

    event.stopPropagation();
    console.log('Drag enter', instance);

    if (!el.classList.contains('is-dragging-over'))
      el.classList.add('is-dragging-over');
  }

  function onDragLeave(event: DragEvent) {
    event.stopPropagation();
    console.log('Drag leave', instance);

    if (el.classList.contains('is-dragging-over'))
      el.classList.remove('is-dragging-over');
  }

  function onDragOver(event: DragEvent) {
    event.stopPropagation();
    // console.log('Drag over panel', instance);
  }
}
