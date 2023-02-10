import * as SvelteStore from "svelte/store";
import type {
  MapStateInterface,
  MapStoreInterface,
  MapStoreGettersInterface,
  MapStoreActionsInterface,
} from "./models/index";
import type {
  ScreenPoint,
  ViewOnImmediateClick,
  ViewPadding,
} from "$models/esri.interface";
import * as mapElements from "./Map.esri";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import { useLayoutStore } from "../layout/Layout.store";
import { when } from "@arcgis/core/core/reactiveUtils";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Search from "@arcgis/core/widgets/Search";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion";
import Graphic from "@arcgis/core/Graphic";
import { TextSymbol } from "@arcgis/core/symbols";

const writableMapStore = SvelteStore.writable<MapStateInterface>({
  view: null,
  map: mapElements.map,
  highlight: null,
  hasProjectLocation: false,
});

export const useMapStore = (): MapStoreInterface => {
  const actions: MapStoreActionsInterface = {
    zoomToGraphic: async (graphic: __esri.Graphic) => {
      console.log("MapStore: action: zoomToGraphic", { graphic });
      const mapView = SvelteStore.get(writableMapStore).view;
      mapView.goTo(
        {
          target: graphic,
          zoom: 17,
        },
        { duration: 400 }
      );
    },

    setView: async (view: __esri.MapView) => {
      console.log("MapStore: action: setView", { view });
      // view.popup.autoOpenEnabled = false;
      // view.popup.highlightEnabled = false;

      // when(
      //   () => view.stationary === true,
      //   () => {
      //     console.log("stationary");
      //   }
      // );

      const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "streets-vector",
      });

      const searchProperties: __esri.widgetsSearchProperties = {
        view: view,
        resultGraphicEnabled: false,
        autoSelect: false,
        popupEnabled: false,
      };

      const searchWidget = new Search(searchProperties);

      const searchHandle = searchWidget.viewModel.watch(
        "state",
        async (state) => {
          if (state === "ready") {
            searchWidget.on("search-complete", async (results) => {
              if (results.numResults > 0) {
                useMapStore().actions.clearProjectLocation();
                const graphic = useMapStore().actions.getSearchGraphic(results);

                useMapStore().actions.createDisplay(graphic.geometry);
                useMapStore().actions.zoomToGraphic(graphic);
              }
            });
            searchHandle.remove();
          }
        }
      );

      view.on("click", (event) => {
        const geometry = event.mapPoint;
        useMapStore().actions.clearProjectLocation();
        useMapStore().actions.setProjectLocation(geometry);
        useMapStore().actions.createDisplay(geometry);
      });

      const coordinateWidget = new CoordinateConversion({
        view: view,
        mode: "live",
        visibleElements: {
          settingsButton: false,
          captureButton: false,
          editButton: false,
        },
      });

      view.ui.add(basemapToggle, { position: "bottom-right" });
      view.ui.add(searchWidget, { position: "top-left", index: 0 });
      view.ui.add(coordinateWidget, "bottom-left");

      writableMapStore.update((state) => {
        state.view = view;
        return state;
      });
    },
    highlight: (graphic: __esri.Graphic, layerId: string = null) => {
      console.log("MapStore: action: highlight", { graphic });
      let layer;
      const mapView = SvelteStore.get(writableMapStore).view;
      if (layerId) {
        layer = mapView.map.allLayers.find((layer) => {
          return layer.id === layerId;
        }) as __esri.FeatureLayer;
      } else {
        layer = graphic.layer;
      }

      mapView.whenLayerView(layer).then((layerView: any) => {
        writableMapStore.update((state) => {
          if (state.highlight) {
            state.highlight.remove();
          }
          // console.log(layerView)
          state.highlight = layerView.highlight(graphic.attributes["OBJECTID"]);

          return state;
        });
      });
    },
    setPadding: (padding: __esri.ViewPadding) => {
      console.log("MapStore: action: setPadding", { padding });
      let view = SvelteStore.get(writableMapStore).view;
      let currentPadding: ViewPadding = {
        left: view.padding.left,
        right: view.padding.right,
        top: view.padding.top,
        bottom: view.padding.bottom,
      };
      let newPadding = Object.assign({}, currentPadding, padding);
      SvelteStore.get(writableMapStore).view.padding = newPadding;
    },
    applyFilter: async (layer: __esri.FeatureLayer, query: __esri.Query) => {
      console.log("MapStore: action: setPadding", { layer, query });
      const { geometry, spatialRelationship, where } = query;
      const props: __esri.FeatureFilterProperties = {
        geometry,
        spatialRelationship,
        where,
      };

      // const title = layer.title;

      const layerView = await SvelteStore.get(
        writableMapStore
      ).view.whenLayerView(layer);

      if (layerView) {
        const filter = new FeatureFilter(props);
        layerView.filter = filter;
      }
    },
    getSearchGraphic: (
      results: __esri.SearchSearchCompleteEvent
    ): __esri.Graphic => {
      console.log("MapStore: action: getSearchGeometry", { results });
      let graphic: __esri.Graphic;

      results?.results.some((searchEvent) => {
        return searchEvent.results.some((searchResult) => {
          if (searchResult.feature) {
            graphic = searchResult.feature;
            return true;
          } else {
            return false;
          }
        });
      });

      if (
        graphic.geometry &&
        graphic.geometry.type &&
        graphic.geometry.type === "polygon"
      ) {
        graphic = new Graphic({
          geometry: graphic.geometry.extent.center,
          attributes: graphic.attributes,
        });

        useMapStore().actions.setProjectLocation(graphic);
        
      } else {
        useMapStore().actions.setProjectLocation(graphic);
      }

      return graphic
    },
    setProjectLocation: (input: __esri.Graphic | __esri.Geometry) => {
      console.log("MapStore: action: setProjectLocation");
      let graphic: __esri.Graphic;

      if (!(input instanceof Graphic)) {
        graphic = new Graphic({
          geometry: input,
        });
      } else {
        graphic = input;
      }

      writableMapStore.update((state) => {
        state.hasProjectLocation = true;
        state.projectLocation = graphic;
        return state;
      });
    },
    clearProjectLocation: () => {
      console.log("MapStore: action: clearProjectLocation");
      let view = SvelteStore.get(writableMapStore).view;
      view.graphics.removeAll();

      writableMapStore.update((state) => {
        state.hasProjectLocation = false;
        state.projectLocation = null;
        return state;
      });
    },
    createDisplay: (geometry: __esri.Geometry = null) => {
      console.log("MapStore: action: createLocation");
    
      let mapGraphic = SvelteStore.get(writableMapStore).mapGraphic;
      let mapLabel = SvelteStore.get(writableMapStore).mapLabel;
      const view = SvelteStore.get(writableMapStore).view;

      // const geometry = projectLocation.geometry;

      if (mapGraphic) {
        view.graphics.remove(mapGraphic);
      }
      if (mapLabel) {
        view.graphics.remove(mapLabel);
      }
      const text = "Project Location";
      if (geometry) {
        mapGraphic = new Graphic({
          geometry: geometry,
          symbol: new TextSymbol({
            color: "black",
            haloColor: "white",
            text: "\ue61d",
            yoffset: 0,
            font: {
              size: 30,
              family: "calcite-web-icons",
            },
          }),
        });

        mapLabel = new Graphic({
          geometry: geometry,
          symbol: new TextSymbol({
            text: text,
            haloColor: "#595959",
            haloSize: "1px",
            color: "white",
            horizontalAlignment: "center",
            yoffset: 35,
          }),
        });

        view.graphics.add(mapGraphic);
        view.graphics.add(mapLabel);
      }

      writableMapStore.update((state) => {
        state.mapGraphic = mapGraphic;
        state.mapLabel = mapLabel;
        return state;
      });
    },
  };

  const view = SvelteStore.derived(writableMapStore, ($state) => $state.view);
  const map = SvelteStore.derived(writableMapStore, ($state) => $state.map);
  const projectLocation = SvelteStore.derived(
    writableMapStore,
    ($state) => $state.projectLocation
  );
  const hasProjectLocation = SvelteStore.derived(
    writableMapStore,
    ($state) => $state.hasProjectLocation
  );
  const mapGraphic = SvelteStore.derived(
    writableMapStore,
    ($state) => $state.mapGraphic
  );
  const mapLabel = SvelteStore.derived(
    writableMapStore,
    ($state) => $state.mapLabel
  );

  const getters: MapStoreGettersInterface = {
    view,
    map,
    projectLocation,
    hasProjectLocation,
    mapGraphic,
    mapLabel,
  };

  return {
    getters,
    actions,
  };
};
