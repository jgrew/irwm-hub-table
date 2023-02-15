import type { Readable } from "svelte/store";
import type { CalciteActionBarConfig, Collapsed } from "$models/index";

/**
 * @name LayoutStoreActionsInterface
 * @description Represents the layout state actions
 */
export interface LayoutStoreActionsInterface {
  /**
   * Set the string name of current active panel
   * @param {string} nextPanel panel name, should match shell config
   */
  setActivePanel(nextPanel: string): void;
}

/**
 * @name LayoutStoreGettersInterface
 * @description Interface represents Layout store getters
 * Getters will be used to consume the data from the store.
 */
export interface LayoutStoreGettersInterface {
  /** Defines the actions available in the main FAB bar */
  shellConfig: Readable<CalciteActionBarConfig>;
  /** String name of the currently visible panel in Layout*/
  activePanel: Readable<string>;
  /** Object representing collapsed prop for various calcite-shell-panels */
  collapsed: Readable<Collapsed>;
}

/**
 * @name LayoutStoreInterface
 * @description Interface represents our Layout store module
 */
export interface LayoutStoreInterface {
  actions: LayoutStoreActionsInterface;
  getters: LayoutStoreGettersInterface;
}
