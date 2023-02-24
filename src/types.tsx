export type PanelData = {
  content: number;
  size?: number;
};

export type PanelContainer = {
  children: PanelBranch[];
  size?: number;
};

export type PanelBranch = PanelContainer | PanelData;

export type PanelTree = PanelBranch[];

export function isPanelContent(value: PanelBranch): value is PanelData {
  return (
    value != null &&
    typeof value === 'object' &&
    'content' in value &&
    typeof value.content === 'number'
  );
}
