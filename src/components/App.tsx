import { css } from '@emotion/css';
import { createSignal } from 'solid-js';
import { PanelContainer, PanelTree } from '../types';
import { Flex } from './Flex';

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
    { children: [{ content: 2 }, { content: 3 }] },
  ]);

  return (
    <div class={styles}>
      <Flex
        direction={rootDirection}
        content={{ children: distribution() }}
        onPanelsChange={(x) => setDistribution((x as PanelContainer).children)}
      />
    </div>
  );
}
