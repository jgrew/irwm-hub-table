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
}

/**
 * Project submission options
 */
export type LayoutMode = "select" |"new" | "update" | "call"

/** 
 * Component state 
*/
export type State = "ready" | "loading" | "error";


/**
 * String constants
 */
export enum Resources {
  Header = 'Project Submittal Forms',
  ResetHeader = 'Warning',
  ResetContent = 'Starting over will reset all form data and take you back to the beginning'
}
