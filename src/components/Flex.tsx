import { css } from '@emotion/css';
import { Branch, isPanelContent, PanelContent } from '../types';
import { Divider } from './Divider';
import { Panel } from './Panel';

const styles = css`
  flex: 1;
  display: flex;
  justify-items: stretch;
`;

export function Flex(props: {
  content: Branch | PanelContent;
  direction: 'row' | 'column';
}) {
  if (isPanelContent(props.content)) return <Panel>{props.content}</Panel>;

  const otherDirection = props.direction === 'row' ? 'column' : 'row';

  return (
    <div class={styles} style={{ 'flex-direction': props.direction }}>
      {props.content.map((item, i) => (
        <>
          {i === 0 ? null : (
            <Divider direction={props.direction} onResize={onResize} />
          )}
          <Flex direction={otherDirection} content={item} />
        </>
      ))}
    </div>
  );

  function onResize(delta: number) {
    console.log({ delta });
  }
}
