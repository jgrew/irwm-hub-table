import type { TableConfig, State } from "$models/index";
import type { Readable } from "svelte/store";

/**
 * @name ConfigStoreActionsInterface
 * @description Represents the Config state actions
 */
export interface ConfigStoreActionsInterface {
  /**
   *  @name init
   *  @description Initializes component, check url params and creates configuration
   */
  init(): void;
  /**
   *  @name setConfig
   *  @description Defines how table should look
   */
  setConfig(): void;
  /**
   *  @name getUrlParameters
   *  @description Searches window for key parameter and checks if it is in allowed values
   */
  getUrlParameters(): void;
}

/**
 * @name ConfigStoreGettersInterface
 * @description Interface represents Config store getters
 */
export interface ConfigStoreGettersInterface {
  /** Component state */
  state: Readable<State>;
  /** lookup key for configuration */
  urlKey: Readable<string>;
  /** app table config */
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
