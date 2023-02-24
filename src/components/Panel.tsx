import { css } from '@emotion/css';
import { type ParentProps } from 'solid-js';
import { PanelData } from '../types';
import { px } from '../utilities';

const styles = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Panel(
  props: ParentProps<PanelData & { ref?: HTMLDivElement }>
) {
  return (
    <div
      ref={props.ref}
      class={styles}
      style={{ 'flex-basis': px(props.size) }}
    >
      {props.content}
    </div>
  );
}
