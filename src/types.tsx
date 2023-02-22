export type PanelContent = number;

export type Branch = (PanelContent | Branch)[];

export function isPanelContent(value: Branch | PanelContent): value is PanelContent {
  return typeof value === 'number';
}
