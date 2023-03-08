import { ParentProps } from 'solid-js';

export type PanelData = {
  content: number;
  size?: number;
};

export type PanelGroup = {
  children: PanelBranch[];
  size?: number;
};

export type PanelBranch = PanelGroup | PanelData;

export type PanelTree = PanelBranch[];

export function isPanelContent(value: PanelBranch): value is PanelData {
  return (
    value != null &&
    typeof value === 'object' &&
    'content' in value &&
    typeof value.content === 'number'
  );
}

// internals

// export type HtmlTag = keyof JSX.HTMLElementTags;
// type ElementAttributes<T extends HtmlTag> = JSX.HTMLElementTags[T];
// type TagToElement<T extends HtmlTag> = HTMLElementTagNameMap[T];

// export type HtmlProps<T extends HtmlTag> = ElementAttributes<T> &
//   RefProp<TagToElement<T>> &
//   AsProp<T>;

// export type ElementType<Props = any> = HtmlTag | Component<Props>;

export interface RefProp<T extends HTMLElement = HTMLElement> {
  ref?: T | ((r: T) => void);
}

// export interface AsProp<T extends ElementType = ElementType> {
//   as?: T;
// }

export interface ChildrenProp extends ParentProps<{}> {}

export interface ClassProp {
  class?: string;
}
