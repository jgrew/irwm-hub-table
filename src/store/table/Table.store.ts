import type { TableConfig } from "$models/index";
import { AllowedKeys } from "$models/index";
import { exportFunctions } from "$lib/exporters";
import * as SvelteStore from "svelte/store";
import type {
  TableStateInterface,
  TableStoreInterface,
  TableStoreGettersInterface,
  TableStoreActionsInterface,
} from "./models/index";
import { useMapStore } from "../map/Map.store";
import { useConfigStore } from "../config/Config.store";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureTable from "@arcgis/core/widgets/FeatureTable";

const writableTableStore = SvelteStore.writable<TableStateInterface>({
  state: "ready",
});

export const useTableStore = (): TableStoreInterface => {
  const actions: TableStoreActionsInterface = {
    init: (tableNode: HTMLDivElement) => {
      console.log("TableStore: action: init");
      const config = SvelteStore.get(useConfigStore().getters.config);
      writableTableStore.update((state) => {
        state.state = "loading";
        state.config = config;
        return state;
      });

      const layer = new FeatureLayer({
        url: config.featureLayerUrl,
        definitionExpression: config?.definitionExpression,
      });

      const view = SvelteStore.get(useMapStore().getters.view);
      const featureTable = new FeatureTable({
        view,
        layer,
        tableTemplate: config.tableTemplate ? config.tableTemplate : null,
        visibleElements: config.visibleElements ? config.visibleElements : null,
        container: tableNode,
      });

      writableTableStore.update((state) => {
        state.state = "ready";
        state.featureLayer = layer;
        state.tableWidget = featureTable;
        return state;
      });
    },
    export: async () => {
      console.log("TableStore: action: export");
      writableTableStore.update((state) => {
        state.state = "loading";
        return state;
      });

      const featureLayer = SvelteStore.get(writableTableStore).featureLayer;
      const config = SvelteStore.get(writableTableStore).config;
      const query = featureLayer.createQuery();
      query.returnGeometry = false;
      query.outFields = Object.keys(config.exportFields);

      let features: __esri.FeatureSet;
      try {
        features = await featureLayer.queryFeatures(query);
      } catch (error) {
        writableTableStore.update((state) => {
          state.state = "error";
          return state;
        });
      }

      if (features.features.length > 0) {
        config.exportPDF(features);
      }

      writableTableStore.update((state) => {
        state.state = "ready";
        return state;
      });
    },
  };

  const state = SvelteStore.derived(
    writableTableStore,
    ($state) => $state.state
  );

  const getters: TableStoreGettersInterface = {
    state,
  };

  return {
    getters,
    actions,
  };
};
