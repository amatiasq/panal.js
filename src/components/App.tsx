import { css } from '@emotion/css';
import { createEffect, createSignal } from 'solid-js';
import { JsonStorage } from '../JsonStorage';
import { PanelGroup, PanelTree } from '../types';
import { ResizableStack } from './ResizableStack';

const distributionStorage = new JsonStorage<PanelTree>('panel-distribution');
const DEFAULT_DISTRIBUTION = [
  { content: 1 },
  { children: [{ content: 2 }, { content: 3 }, { content: 4 }] },
];

const styles = css`
  height: 100svh;
  width: 100%;

  > :only-child {
    height: 100%;
  }
`;

export function App() {
  const rootDirection = 'row';
  const [distribution, setDistribution] = createSignal(
    distributionStorage.read()
  );

  createEffect(() => distributionStorage.write(distribution()));

  return (
    <div class={styles}>
      <ResizableStack
        direction={rootDirection}
        content={{ children: distribution() ?? DEFAULT_DISTRIBUTION }}
        onPanelsChange={(newContent) =>
          setDistribution((newContent as PanelGroup).children)
        }
      />
    </div>
  );
}
