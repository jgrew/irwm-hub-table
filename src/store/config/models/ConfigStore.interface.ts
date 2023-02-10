import type { TableConfig, State } from "$models/index";
import type { Readable } from "svelte/store";

/**
 * @name ConfigStoreActionsInterface
 * @description Represents the Config state actions
 */
export interface ConfigStoreActionsInterface {
  init(): void;
  setConfig(): void;
  getUrlParameters(): void;
}

/**
 * @name ConfigStoreGettersInterface
 * @description Interface represents Config store getters
 */
export interface ConfigStoreGettersInterface {
  state: Readable<State>;
  urlKey: Readable<string>;
  config: Readable<TableConfig>;
}

/**
 * @name ConfigStoreInterface
 * @description Interface represents the Config store
 */
export interface ConfigStoreInterface {
  actions: ConfigStoreActionsInterface;
  getters: ConfigStoreGettersInterface;
}
