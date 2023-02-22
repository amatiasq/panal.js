import { css } from "@emotion/css";

const styles = css`
  flex-basis: 5px;
  background: red;
`

export function Divider() {
  return <div
    class={styles}
    // onDragStart={onDragStart}
    // onDragEnd={onDragEnd}
    draggable />;
}
