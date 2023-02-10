import type { State, TableConfig } from "$models/index";

/** Application config */
export interface ConfigStateInterface {
  state: State;
  config?: TableConfig;
  urlKey?: string;
};
