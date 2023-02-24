import { Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

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

export type DOMElements = keyof JSX.IntrinsicElements;
export type ElementType<Props = any> = DOMElements | Component<Props>;
