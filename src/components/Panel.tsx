import { css } from '@emotion/css';
import { ChildrenProp, PanelData, RefProp } from '../types';
import { forwardRef, px } from '../utilities';
import { Draggable } from './Draggable';
import { DRAG_OVER_CLASS, DropArea } from './DropArea';

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

  &.${DRAG_OVER_CLASS} {
    background: linear-gradient(to bottom, ${dropGradient}),
      linear-gradient(to right, ${dropGradient});
  }
`;

const panelContentStyles = css`
  padding: 0.5em 1em;
`;

export interface PanelProps extends PanelData, ChildrenProp, RefProp {}

let instances = 0;

export function Panel(props: PanelProps) {
  let el: HTMLElement;
  const instance = instances++;

  return (
    <DropArea
      kind="panel"
      class={styles}
      style={{ 'flex-basis': px(props.size) }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <Draggable
        as="header"
        ref={(ref) => (el = forwardRef(props, ref))}
        kind="panel"
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
    console.log('Draggin panel', instance);
  }

  function onDragEnd() {
    console.log('Drag ended', instance);
  }

  function onDragEnter(event: DragEvent) {}

  function onDragLeave(event: DragEvent) {}

  function onDragOver(event: DragEvent) {}
}
