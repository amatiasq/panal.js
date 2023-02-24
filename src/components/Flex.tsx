import { css } from '@emotion/css';
import { Index } from 'solid-js';
import { isPanelContent, PanelBranch, PanelGroup } from '../types';
import { px, replaceItem, replaceItems } from '../utilities';
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
    index: number;
    a: HTMLDivElement;
    b: HTMLDivElement;
    aSize: number;
    bSize: number;
  } | null = null;

  function startResizeOperation(index: number) {
    const a = panels[index - 1];
    const b = panels[index];
    const prop = props.direction === 'row' ? 'offsetWidth' : 'offsetHeight';
    dragging = { index, a, b, aSize: a[prop], bSize: b[prop] };
  }

  function endResizeOperation() {
    dragging = null;
  }

  function resize(delta: number) {
    if (!dragging) {
      throw new Error('Resize operation not started');
    }

    const { index, a, b, aSize, bSize } = dragging;
    const newASize = aSize + delta;
    const newBSize = bSize - delta;

    a.style.flexBasis = px(newASize);
    b.style.flexBasis = px(newBSize);

    const list = content().children;
    props.onPanelsChange({
      ...content(),
      children: replaceItems(
        list,
        index - 1,
        2,
        { ...list[index - 1], size: newASize },
        { ...list[index], size: newBSize }
      ),
    });
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
                console.log('Propagating panels change', updated);
                const content = props.content as PanelGroup;
                props.onPanelsChange({
                  ...content,
                  children: replaceItem(content.children, i, updated),
                });
              }}
            />
          </>
        )}
      </Index>
    </div>
  );
}
