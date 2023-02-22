import { css } from '@emotion/css';

const handlerStyles = css`
  content: '';
  display: block;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: col-resize;
  transition: opacity 0.1s ease, inset 0.1s ease;
`;

const styles = css`
  flex-basis: 3px;
  background: black;
  position: relative;

  :hover,
  &.is-dragging {
    div {
      opacity: 1;
      inset: -5px;
    }
  }

  &.is-dragging div {
    background: red;
  }
`;

export function Divider(props: { onResize: (delta: number) => void }) {
  return (
    <div class={styles}>
      <div class={handlerStyles} />
    </div>
  );
}
