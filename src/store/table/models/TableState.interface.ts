import type { State, TableConfig } from "$models/index";

/** Table widget config */
export interface TableStateInterface {
  state: State;
  config?: TableConfig;
  featureLayer?: __esri.FeatureLayer;
  tableWidget?: __esri.FeatureTable;
}
