import { css } from '@emotion/css';
import { Index } from 'solid-js';
import { isPanelContent, PanelBranch, PanelGroup } from '../types';
import { px } from '../utilities';
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
  content: PanelBranch;
  direction: 'row' | 'column';
  onPanelsChange: (updated: PanelBranch) => void;
}) {
  if (isPanelContent(props.content)) {
    return <Panel ref={props.ref} {...props.content} />;
  }

  const otherDirection = props.direction === 'row' ? 'column' : 'row';
  const panels = [] as HTMLDivElement[];
  const content = () => props.content as PanelGroup;

  let dragging: {
    a: number;
    b: number;
    aSize: number;
    bSize: number;
  } | null = null;

  function startResizeOperation(index: number) {
    const prop = props.direction === 'row' ? 'offsetWidth' : 'offsetHeight';

    dragging = {
      a: index - 1,
      b: index,
      aSize: panels[index - 1][prop],
      bSize: panels[index][prop],
    };
  }

  function endResizeOperation() {
    dragging = null;
  }

  function resize(delta: number) {
    if (!dragging) {
      throw new Error('Resize operation not started');
    }

    const { a, b, aSize, bSize } = dragging;
    const newASize = aSize + delta;
    const newBSize = bSize - delta;

    panels[a].style.flexBasis = px(newASize);
    panels[b].style.flexBasis = px(newBSize);

    const copy = [...content().children];
    copy[a] = { ...copy[a], size: newASize };
    copy[b] = { ...copy[b], size: newBSize };
    props.onPanelsChange({ ...content(), children: copy });
  }

  return (
    <div
      ref={props.ref}
      class={styles}
      style={{
        'flex-direction': props.direction,
        'flex-basis': px(props.content.size),
      }}
    >
      <Index each={props.content.children}>
        {(item, i) => (
          <>
            {i === 0 ? null : (
              <Divider
                direction={props.direction}
                onResizeStart={() => startResizeOperation(i)}
                onResizeEnd={endResizeOperation}
                onResize={resize}
              />
            )}
            <Flex
              ref={panels[i]}
              direction={otherDirection}
              content={item()}
              onPanelsChange={(updated) => {
                const copy = [...content().children];
                copy[i] = updated;
                props.onPanelsChange({ ...content(), children: copy });
              }}
            />
          </>
        )}
      </Index>
    </div>
  );
}
