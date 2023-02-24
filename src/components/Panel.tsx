import { css } from '@emotion/css';
import { type ParentProps } from 'solid-js';

const styles = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Panel(props: ParentProps<{ ref?: HTMLDivElement }>) {
  return (
    <div ref={props.ref} class={styles}>
      {props.children}
    </div>
  );
}
