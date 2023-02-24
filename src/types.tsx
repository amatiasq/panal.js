export type PanelData = {
  content: number;
  size?: number;
};

export type Branch = PanelTree | PanelData;
export type PanelTree = Branch[];

export function isPanelContent(value: Branch): value is PanelData {
  return (
    value != null &&
    typeof value === 'object' &&
    'content' in value &&
    typeof value.content === 'number'
  );
}
