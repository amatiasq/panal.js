import { css } from '@emotion/css';
import { createSignal } from 'solid-js';
import { PanelGroup, PanelTree } from '../types';
import { ResizableStack } from './ResizableStack';

const styles = css`
  border: 1px solid blue;
  height: 100svh;
  width: 100%;

  > :only-child {
    height: 100%;
  }
`;

export function App() {
  const rootDirection = 'row';
  const [distribution, setDistribution] = createSignal<PanelTree>([
    { content: 1 },
    { children: [{ content: 2 }, { content: 3 }, { content: 4 }] },
  ]);

  return (
    <div class={styles}>
      <ResizableStack
        direction={rootDirection}
        content={{ children: distribution() }}
        onPanelsChange={(newContent) =>
          setDistribution((newContent as PanelGroup).children)
        }
      />
    </div>
  );
}
