import { css } from '@emotion/css';
import { ChildrenProp, PanelData, RefProp } from '../types';
import { forwardRef, px } from '../utilities';
import { Draggable } from './Draggable';

const styles = css`
  flex: 1;
  display: flex;
  flex-direction: column;

  header {
    background: rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid gray;
    padding: 0.05em 0.4em;
  }
`;

const panelContentStyles = css`
  padding: 0.5em 1em;
`;

export interface PanelProps
  extends PanelData,
    ChildrenProp,
    RefProp<HTMLDivElement> {}

export function Panel(props: PanelProps) {
  let el: HTMLDivElement;

  return (
    <div
      ref={(ref) => (el = forwardRef(props, ref))}
      class={styles}
      style={{ 'flex-basis': px(props.size) }}
      onDragOver={onDragOver}
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

  function onDragOver() {
    console.log('Drag over panel');
  }
}
