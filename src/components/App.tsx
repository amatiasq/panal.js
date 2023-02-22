import { css } from '@emotion/css';
import { createSignal } from 'solid-js';
import { Branch } from '../types';
import { Flex } from './Flex';

const styles = css`
  border: 1px solid blue;
  height: 100svh;
  width: 100%;

  > :only-child {
    height: 100%
  }
`;

export function App() {
  const [count, setCount] = createSignal(0);

  const rootDirection = 'row';
  const distribution = [[1], [3, 4]] satisfies Branch;

  return (
    <div class={styles}>
      <Flex direction={rootDirection} content={distribution} />
    </div>
  );
}
