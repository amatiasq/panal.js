import { splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';

export type HtmlTag = keyof JSX.HTMLElementTags;

type TagToElement<T extends HtmlTag> = HTMLElementTagNameMap[T];

type ElementProps<T extends HtmlTag> = Pick<
  JSX.HTMLElementTags[T],
  | 'class'
  | 'draggable'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragStart'
  | 'style'
>;

export interface HtmlProps<T extends HtmlTag> extends ElementProps<T> {
  as?: T;
  ref?: TagToElement<T> | ((r: TagToElement<T>) => void);
}

export interface HtmlParentProps<T extends HtmlTag> extends HtmlProps<T> {
  children?: JSX.Element;
}

type DomProps<T extends HtmlTag> = HtmlParentProps<T>;

export function Dom<T extends HtmlTag>(props: DomProps<T>) {
  const [asProp, rest] = splitProps(props, ['as']);
  return <Dynamic component={(asProp.as || 'div') as any} {...rest} />;
}
