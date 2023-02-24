import { css } from '@emotion/css';
import { Branch } from '../types';
import { asDivider } from './Divider';
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
    <div
      class={styles}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
    >
      <Flex direction={rootDirection} content={distribution} />
    </div>
  );

  function onDrag(e: DragEvent) {
    console.log('dragging');

    asDivider(e.target)?.startDragging();
    const delta = e.clientX - dragStart;
    console.log('delta: ', delta, 'px');
  }

  function onDragStart(e: DragEvent) {
    console.log('drag start');
    dragStart = e.clientX;

    asDivider(e.target)?.startDragging();

    // set the drag image to a transparent pixel
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    e.dataTransfer?.setDragImage(img, 0, 0);
  }

  function onDragEnd(e: DragEvent) {
    console.log('drag end');

    asDivider(e.target)?.stopDragging();

    const delta = e.clientX - dragStart;
    console.log('delta: ', delta, 'px');
  }
}
