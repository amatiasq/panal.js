import { css } from '@emotion/css';
import { type ParentProps } from 'solid-js';
import { PanelData } from '../types';
import { px } from '../utilities';
import { Draggable } from './Draggable';

const styles = css`
  flex: 1;
  display: flex;
  flex-direction: column;

  header {
    background: rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid gray;
    padding: 0.5em 1em;
  }
`;

const panelContentStyles = css`
  padding: 0.5em 1em;
`;

export function Panel(
  props: ParentProps<PanelData & { ref?: HTMLDivElement }>
) {
  let el: HTMLDivElement;

  return (
    <div
      ref={(ref) => {
        props.ref = ref;
        el = ref;
      }}
      class={styles}
      style={{ 'flex-basis': px(props.size) }}
    >
      <Draggable
        as="header"
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
    console.log('Draggin panel');
  }

  function onDragEnd() {
    console.log('Drag ended');
  }
}
