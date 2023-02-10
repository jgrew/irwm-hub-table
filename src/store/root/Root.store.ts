import type { RootStoreInterface } from "./models";
import { useMapStore } from "../map/Map.store";
import { useLayoutStore } from "../layout/Layout.store";
import { useConfigStore } from "../config/Config.store";
import { useTableStore } from "../table/Table.store";

export const useAppStore = (): RootStoreInterface => {
  return {
    configStore: useConfigStore(),
    mapStore: useMapStore(),
    layoutStore: useLayoutStore(),
    tableStore: useTableStore()
  };
};
