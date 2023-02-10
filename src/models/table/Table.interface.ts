/** A function that generates a pdf from the table */
type ExportFunction = (features: __esri.FeatureSet) => void;

/** Object with multile export functions keyed by url parameter */
export interface TableExporters {
  [urlKey: string]: ExportFunction;
}

/** Interface for app table widget with download button */
export interface TableConfig extends Partial<__esri.FeatureTable> {
  featureLayerUrl: string;
  definitionExpression?: string;
  urlKey: string;
  exportEnabled: boolean;
  exportFields: {[fieldName: string]: string};
  exportPDF: ExportFunction;
}


