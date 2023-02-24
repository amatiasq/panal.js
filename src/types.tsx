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
