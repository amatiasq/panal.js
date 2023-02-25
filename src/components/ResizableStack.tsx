import { css } from '@emotion/css';
import { Index } from 'solid-js';
import { isPanelContent, PanelBranch, PanelGroup } from '../types';
import { px } from '../utilities';
import { Panel } from './Panel';
import { PanelResizer } from './PanelResizer';

const styles = css`
  flex: 1;
  display: flex;
  justify-items: stretch;
`;

export function ResizableStack(props: {
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
    sizes: number[];
  } | null = null;

  function startResizeOperation(index: number) {
    const prop = props.direction === 'row' ? 'offsetWidth' : 'offsetHeight';
    const sizes = panels.map((el) => el[prop]);

    dragging = { a: index - 1, b: index, sizes };

    props.onPanelsChange({
      ...content(),
      children: sizes.map((x, i) => setPanelSize(i, x)),
    });
  }

  function endResizeOperation() {
    dragging = null;
  }

  function resize(delta: number) {
    if (!dragging) {
      throw new Error('Resize operation not started');
    }

    const { a, b, sizes } = dragging;
    const aSize = sizes[a] + delta;
    const bSize = sizes[b] - delta;

    const copy = [...content().children];
    copy[a] = setPanelSize(a, aSize);
    copy[b] = setPanelSize(b, bSize);

    props.onPanelsChange({
      ...content(),
      children: copy,
    });
  }

  function setPanelSize(index: number, newSize: number) {
    panels[index].style.flexBasis = px(newSize);
    const data = content().children;
    return { ...data[index], size: newSize };
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
              <PanelResizer
                direction={props.direction}
                onResizeStart={() => startResizeOperation(i)}
                onResizeEnd={endResizeOperation}
                onResize={resize}
              />
            )}
            <ResizableStack
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
