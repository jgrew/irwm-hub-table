
/**
 * @name MapStateInterface
 * @description Represents the state of the map component
 */
export interface MapStateInterface {
  view: __esri.MapView;
  map: __esri.Map;
  highlight?: any;
  hasProjectLocation?: boolean;
  projectLocation?: __esri.Graphic;
  mapGraphic?: __esri.Graphic;
  mapLabel?: __esri.Graphic;
}
