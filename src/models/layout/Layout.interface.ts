/** Props for CalciteAction */
export type CalciteActionProps = {
  id: string;
  type: string;
  icon: string;
  text: string;
};

/**
 * Collection of CalciteActions to be placed in top or bottom of CalciteActionBar
 */
export type CalciteActionBarConfig = {
  top: CalciteActionProps[];
  bottom: CalciteActionProps[];
};

/**
 * Collapse prop for calcite-shell left-right-center
 */
export type Collapsed = {
  left: boolean;
  right: boolean;
  center: boolean;
};

/**
 * Component state
 */
export type State = "ready" | "loading" | "error";
