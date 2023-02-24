import { css } from '@emotion/css';
import { Index } from 'solid-js';
import { isPanelContent, PanelBranch, PanelContainer } from '../types';
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

  function endResizeOperation(index: number) {
    dragging = null;
  }

  function resize(delta: number) {
    if (!dragging) {
      throw new Error('Resize operation not started');
    }

    const { index, a, b, aSize, bSize } = dragging;
    const newASize = aSize + delta;
    const newBSize = bSize - delta;

    a.style.flexBasis = `${newASize}px`;
    b.style.flexBasis = `${newBSize}px`;

    const list = (props.content as PanelContainer).children;

    console.log(
      'Emitting panels change',
      { ...list[index - 1], size: newASize },
      { ...list[index], size: newBSize }
    );

    props.onPanelsChange({
      ...props.content,
      children: replaceItems(
        list,
        index,
        2,
        { ...list[index], size: newASize },
        { ...list[index + 1], size: newBSize }
      ),
    });
  }

  return (
    <div
      ref={props.ref}
      class={styles}
      style={{ 'flex-direction': props.direction }}
    >
      <Index each={props.content.children}>
        {(item, i) => (
          <>
            {i === 0 ? null : (
              <Divider
                direction={props.direction}
                onResizeStart={() => startResizeOperation(i)}
                onResizeEnd={() => endResizeOperation(i)}
                onResize={resize}
              />
            )}
            <Flex
              ref={panels[i]}
              direction={otherDirection}
              content={item()}
              onPanelsChange={(updated) => {
                console.log('Propagating panels change', updated);
                const content = props.content as PanelContainer;
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

function replaceItem<T>(list: T[], index: number, value: T) {
  const before = list.slice(0, index);
  const after = list.slice(index + 1);
  return [...before, value, ...after];
}

function replaceItems<T>(
  list: T[],
  index: number,
  amount: number,
  ...values: T[]
) {
  const before = list.slice(0, index);
  const after = list.slice(index + amount);
  return [...before, ...values, ...after];
}
