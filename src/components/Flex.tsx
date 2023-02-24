import { css } from '@emotion/css';
import { Branch, isPanelContent, PanelContent } from '../types';
import { Divider } from './Divider';
import { Panel } from './Panel';

const styles = css`
  flex: 1;
  display: flex;
  justify-items: stretch;
`;

let a = 0;

export function Flex(props: {
  ref?: HTMLDivElement;
  content: Branch | PanelContent;
  direction: 'row' | 'column';
}) {
  if (isPanelContent(props.content)) {
    return <Panel ref={props.ref}>{props.content}</Panel>;
  }

  const otherDirection = props.direction === 'row' ? 'column' : 'row';
  const panels = [] as HTMLDivElement[];

  let dragging: {
    a: HTMLDivElement;
    b: HTMLDivElement;
    aSize: number;
    bSize: number;
  } | null = null;

  function startResizeOperation(index: number) {
    const a = panels[index - 1];
    const b = panels[index];
    const prop = props.direction === 'row' ? 'offsetWidth' : 'offsetHeight';
    dragging = { a, b, aSize: a[prop], bSize: b[prop] };
  }

  function endResizeOperation(index: number) {
    dragging = null;
  }

  function resize(delta: number) {
    if (!dragging) {
      throw new Error('Resize operation not started');
    }

    const { a, b, aSize, bSize } = dragging;
    a.style.flexBasis = `${aSize + delta}px`;
    b.style.flexBasis = `${bSize - delta}px`;
  }

  return (
    <div
      ref={props.ref}
      class={styles}
      style={{ 'flex-direction': props.direction }}
    >
      {props.content.map((item, i) => (
        <>
          {i === 0 ? null : (
            <Divider
              direction={props.direction}
              onResizeStart={() => startResizeOperation(i)}
              onResizeEnd={() => endResizeOperation(i)}
              onResize={resize}
            />
          )}
          <Flex ref={panels[i]} direction={otherDirection} content={item} />
        </>
      ))}
    </div>
  );
}
