import type {
  CalciteActionBarConfig,
  Collapsed,
  LayoutMode,
} from "$models/index";

export interface LayoutStateInterface {
  shellConfig: CalciteActionBarConfig;
  activePanel: string;
  collapsed: Collapsed;
  mode: LayoutMode;
}
