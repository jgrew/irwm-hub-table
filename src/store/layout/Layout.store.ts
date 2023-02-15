import * as SvelteStore from "svelte/store";
import type {
  LayoutStateInterface,
  LayoutStoreInterface,
  LayoutStoreGettersInterface,
  LayoutStoreActionsInterface,
} from "./models/index";

const writableLayoutStore = SvelteStore.writable<LayoutStateInterface>({
  activePanel: "legend",
  collapsed: {
    left: true,
    right: true,
    center: true,
  },
  shellConfig: {
    top: [
      {
        id: "legend",
        type: "left",
        icon: "legend",
        text: "Legend",
      },
      {
        id: "information",
        type: "left",
        icon: "information",
        text: "Information",
      },
      {
        id: "delineate",
        type: "left",
        icon: "analysis",
        text: "Delineate",
      },
      {
        id: "discharges",
        type: "center",
        icon: "table",
        text: "Discharges",
      },
      {
        id: "edit",
        type: "right",
        icon: "plus-circle",
        text: "Add New",
      },
    ],
    bottom: [],
  },
});

export const useLayoutStore = (): LayoutStoreInterface => {
  const actions: LayoutStoreActionsInterface = {
    setActivePanel: (nextPanel: string) => {
      console.log("LayoutStore: action: setActivePanel", { nextPanel });
      writableLayoutStore.update((state) => {
        state.activePanel = state.activePanel === nextPanel ? null : nextPanel;
        return state;
      });
    },
  };

  const shellConfig = SvelteStore.derived(
    writableLayoutStore,
    ($state) => $state.shellConfig
  );

  const activePanel = SvelteStore.derived(
    writableLayoutStore,
    ($state) => $state.activePanel
  );

  const collapsed = SvelteStore.derived(
    writableLayoutStore,
    ($state) => $state.collapsed
  );

  const getters: LayoutStoreGettersInterface = {
    shellConfig,
    activePanel,
    collapsed,
  };

  return {
    getters,
    actions,
  };
};
