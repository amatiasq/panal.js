import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';
import { forwardRef, spreadProps } from '../utilities';

export type HtmlTag = keyof JSX.HTMLElementTags;

export type TagToElement<T extends HtmlTag> = HTMLElementTagNameMap[T];

// DROP ALL OF THIS
// Use bindings / directives instead
// https://www.solidjs.com/tutorial/bindings_directives

/*
  <div class="modal" use:draggable>
    Some Modal
  </div>

  function draggable(el, accessor) {
    // const onClick = (e) => !el.contains(e.target) && accessor()?.();
    // document.body.addEventListener("click", onClick);
    // onCleanup(() => document.body.removeEventListener("click", onClick));
  }
*/

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
  return (
    <Dynamic
      component={(props.as || 'div') as any}
      ref={(ref: TagToElement<T>) => forwardRef(props, ref)}
      {...spreadProps(props, ['as', 'ref'])}
    />
  );
}
