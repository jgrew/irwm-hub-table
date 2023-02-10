import type { TableConfig, State } from "$models/index";
import type { Readable } from "svelte/store";

/**
 * @name TableStoreActionsInterface
 * @description Represents the Table state actions
 */
export interface TableStoreActionsInterface {
  init(tableNode: HTMLDivElement): void;
  export(): Promise<void>;
}

/**
 * @name TableStoreGettersInterface
 * @description Interface represents Table store getters
 */
export interface TableStoreGettersInterface {
  state: Readable<State>;
}

/**
 * @name TableStoreInterface
 * @description Interface represents the Table store
 */
export interface TableStoreInterface {
  actions: TableStoreActionsInterface;
  getters: TableStoreGettersInterface;
}
