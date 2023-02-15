/** A function that generates a pdf from the table */
type ExportFunction = (features: __esri.FeatureSet) => void;

/** Object with multile export functions keyed by url parameter */
export interface TableExporters {
  [urlKey: string]: ExportFunction;
}

/** Interface for app table widget with download button */
export interface TableConfig extends Partial<__esri.FeatureTable> {
  /** Table data source */
  featureLayerUrl: string;
  /** Definition expression for creating FeatureLayer */
  definitionExpression?: string;
  /** Corresponding url key this table config matches to */
  urlKey: string;
  /** Show the export button */
  exportEnabled: boolean;
  /** Which fields are included in export */
  exportFields: {[fieldName: string]: string};
  /** Function called to generate pdf export */
  exportPDF: ExportFunction;
}


