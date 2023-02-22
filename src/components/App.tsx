import { css } from '@emotion/css';
import { Branch } from '../types';
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
  const distribution = [[1], [3, 4]] satisfies Branch;
  let dragStart = 0;

  return (
    <div class={styles} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Flex direction={rootDirection} content={distribution} />
    </div>
  );

  function onDragStart(e: DragEvent) {
    console.log('drag start');
    dragStart = e.clientX;

    const target = e.target as HTMLElement;
    target.classList.add('is-dragging');

    // set the drag image to a transparent pixel
    // const img = new Image();
    // img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    // e.dataTransfer?.setDragImage(img, 0, 0);
  }

  function onDragEnd(e: DragEvent) {
    console.log('drag end');

    const target = e.target as HTMLElement;
    target.classList.remove('is-dragging');

    const delta = e.clientX - dragStart;
    console.log('delta: ', delta, 'px');
  }
}
