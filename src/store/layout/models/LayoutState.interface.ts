import type {
  CalciteActionBarConfig,
  Collapsed,
} from "$models/index";

export interface LayoutStateInterface {
  shellConfig: CalciteActionBarConfig;
  activePanel: string;
  collapsed: Collapsed;
}
