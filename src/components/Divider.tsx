import { css } from '@emotion/css';
import { createMemo } from 'solid-js';

const handleStyles = css`
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
  flex-basis: 3px;
  background: red;
  position: relative;
  --offset-row: 0;
  --offset-column: 0;

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

  &.is-fake-dragging:not(.is-dragging) {
    background: blue;
  }

  &.is-dragging div {
    background: red;
  }
`;

export function Divider(props: {
  direction: 'row' | 'column';
  onResize: (delta: number) => void;
}) {
  const hoverStyles = createMemo(
    () => css`
      :hover {
        --offset-${props.direction}: -5px;
      }
      div {
        cursor: ${props.direction === 'row' ? 'col-resize' : 'row-resize'};
      }
    `
  );

  return (
    <div class={`Divider ${styles} ${hoverStyles()}`}>
      <div class={handleStyles} draggable={true} />
    </div>
  );
}

export function asDivider(target: EventTarget | null) {
  const el = find(target, styles) as HTMLDivElement;
  if (!el) return null;

  return {
    startDragging() {
      el.classList.add('is-dragging');
    },
    stopDragging() {
      el.classList.remove('is-dragging');
      el.classList.remove('is-fake-dragging');
    },
    startFakeDragging() {
      el.classList.add('is-fake-dragging');
    },
  };
}

function find(target: EventTarget | null, className: string) {
  while (target && target instanceof HTMLElement) {
    if (target.classList.contains(className)) return target;
    target = target.parentElement;
  }

  return null;
}
