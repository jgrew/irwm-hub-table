import type { MapStoreInterface } from "src/store/map/models";
import type { LayoutStoreInterface } from "src/store/layout/models";
import type { ConfigStoreInterface } from "src/store/config/models";
import type { TableStoreInterface } from "src/store/table/models";

export interface RootStoreInterface {
    configStore: ConfigStoreInterface,
    mapStore: MapStoreInterface,
    layoutStore: LayoutStoreInterface,
    tableStore: TableStoreInterface
}