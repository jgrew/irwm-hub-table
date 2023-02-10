import type { Readable } from "svelte/store";

/**
 * @name MapStoreActionsInterface
 * @description Represents the map state actions
 */
export interface MapStoreActionsInterface {
  zoomToGraphic(graphic: __esri.Graphic): void;
  setView(view: __esri.MapView): Promise<void>;
  /**
   * Highlight a feature on the view, existing highlights will be replaced
   * @param {__esri.Graphic} feature Graphic to highlight
   * @param {string} targetLayer If provided, title of layer in map to target, otherwise layer taken from graphic
   */
  highlight(graphic: __esri.Graphic, layerId: string): void;
  /**
   * Sets the map view padding. Only the provided args are updated, other padding dimensions are kept as-is
   * @param padding Padding values
   */
  setPadding(padding: __esri.ViewPadding): void;
  applyFilter(layer: __esri.FeatureLayer, query: __esri.Query): Promise<void>;
  getSearchGraphic(results: __esri.SearchSearchCompleteEvent): __esri.Graphic;
  setProjectLocation(input: __esri.Graphic | __esri.Geometry): void;
  clearProjectLocation(): void;
  createDisplay(geometry?: __esri.Geometry): void;
}

/**
 * @name MapStoreGettersInterface
 * @description Interface represents our store getters
 * Getters will be used to consume the data from the store.
 */
export interface MapStoreGettersInterface {
  /** Map view */
  view: Readable<__esri.MapView>;
  map: Readable<__esri.Map>;
  projectLocation: Readable<__esri.Graphic>;
  hasProjectLocation: Readable<boolean>;
  mapGraphic: Readable<__esri.Graphic>;
  mapLabel: Readable<__esri.Graphic>;
}

/**
 * @name MapStoreInterface
 * @description Interface represents our Map store module
 */
export interface MapStoreInterface {
  actions: MapStoreActionsInterface;
  getters: MapStoreGettersInterface;
}
