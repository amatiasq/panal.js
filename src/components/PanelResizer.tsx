import { css } from '@emotion/css';
import { createMemo } from 'solid-js';
import { startDragging, stopDragging } from '../drag-controller';
import { Draggable } from './Draggable';

export const handleStyles = css`
  content: '';
  display: block;
  position: absolute;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.1s ease, top 0.1s ease, left 0.1s ease, right 0.1s ease,
    bottom 0.1s ease;
`;

const styles = css`
  flex-basis: 2px;
  background: black;
  position: relative;
  --offset-row: 0;
  --offset-column: 0;

  &.row {
    max-width: 2px;
  }

  &.column {
    max-height: 2px;
  }

  :hover,
  &.is-dragging {
    div {
      opacity: 1;
      top: var(--offset-column, 0);
      bottom: var(--offset-column, 0);
      left: var(--offset-row, 0);
      right: var(--offset-row, 0);
    }
  }

  &.is-dragging div {
    background: white;
  }
`;

export function PanelResizer(props: {
  direction: 'row' | 'column';
  onResize: (delta: number) => void;
  onResizeEnd(): void;
  onResizeStart(): void;
}) {
  const hoverStyles = createMemo(
    () => css`
      :hover {
        --offset-${props.direction}: -3px;
      }
      div {
        cursor: ${props.direction === 'row' ? 'col-resize' : 'row-resize'};
      }
    `
  );

  let el!: HTMLDivElement;

  return (
    <div
      ref={el}
      class={`Divider ${styles} ${props.direction} ${hoverStyles()}`}
      data-kind="resizer"
    >
      <Draggable
        class={handleStyles}
        hideDrawImage
        onDragStart={() => {
          el.classList.add('is-dragging');
          startDragging(el);
          props.onResizeStart();
        }}
        onDragEnd={() => {
          el.classList.remove('is-dragging');
          stopDragging();
          props.onResizeEnd();
        }}
        onDrag={([x, y]) => {
          props.onResize(props.direction === 'row' ? x : y);
        }}
      />
    </div>
  );
}
