import type { TableConfig } from "$models/index";
import { AllowedKeys } from "$models/index";
import { exportFunctions } from "$lib/exporters";
import * as SvelteStore from "svelte/store";
import type {
  ConfigStateInterface,
  ConfigStoreInterface,
  ConfigStoreGettersInterface,
  ConfigStoreActionsInterface,
} from "./models/index";
import TableTemplate from "@arcgis/core/widgets/FeatureTable/support/TableTemplate";
import FieldColumnTemplate from "@arcgis/core/widgets/FeatureTable/support/FieldColumnTemplate";

const writableConfigStore = SvelteStore.writable<ConfigStateInterface>({
  state: "ready",
});

export const useConfigStore = (): ConfigStoreInterface => {
  const actions: ConfigStoreActionsInterface = {
    init: () => {
      console.log("ConfigStore: action: init");
      writableConfigStore.update((state) => {
        state.state = "loading";
        return state;
      });

      useConfigStore().actions.getUrlParameters();
      useConfigStore().actions.setConfig();

      writableConfigStore.update((state) => {
        state.state = state.urlKey !== null ? "ready" : "error";
        return state;
      });
    },
    getUrlParameters: () => {
      console.log("ConfigStore: action: getUrlParameters");
      const urlParameters = new URLSearchParams(window.location.search);
      const hasKey = urlParameters.has("key");
      let urlKey: string = null;

      if (hasKey) {
        const key = urlParameters.get("key");
        urlKey = Object.values(AllowedKeys).includes(key as AllowedKeys)
          ? key
          : null;
      }

      writableConfigStore.update((state) => {
        state.urlKey = urlKey;
        return state;
      });
    },
    setConfig: () => {
      console.log("ConfigStore: action: setConfig");
      const urlKey = SvelteStore.get(writableConfigStore).urlKey;
      let config: TableConfig;
      let fields: { [fieldName: string]: string };
      let columnTemplates: FieldColumnTemplate[];

      switch (urlKey) {
        case "ncirwm":
          fields = {
            OBJECTID: "ID",
            ProjectName: "Project Name",
            IRWMProjectRankingScore: "Prioritization Score",
            ProjectStatus: "Project Status",
            EstimatedTotalProjectCost: "Project Cost ($)",
            ExpectedCompletionDate: "Expected Completion Date",
            PrimaryProjectIRWMGoal: "Primary IRWM Goal",
            ProjectDescription: "Description",
            AgencyName: "Agency",
          };

          columnTemplates = Object.keys(fields).map((fieldName: string) => {
            return new FieldColumnTemplate({
              fieldName: fieldName,
              direction: fieldName === "ProjectName" ? "asc" : null,
              editable: false,
              visible: fieldName === "OBJECTID" ? false : true,
              label: fields[fieldName],
            });
          });

          config = {
            featureLayerUrl:
              "https://www.ocgis.com/arcpub/rest/services/Environmental_Resources/NC_IRWM_Projects_Public/FeatureServer/0",
            definitionExpression: "GrantRound = 'TO BE DETERMINED'",
            urlKey,
            exportEnabled: true,
            exportPDF: exportFunctions[urlKey],
            exportFields: fields,
            visibleElements: {
              header: false,
              selectionColumn: false,
              menu: false,
            },
            tableTemplate: new TableTemplate({
              columnTemplates,
            }),
            editingEnabled: false,
          };
          break;
        case "socirwm":
          fields = {
            OBJECTID: "ID",
            ProjectName: "Project Name",
            IRWMProjectRankingScore: "Prioritization Score",
            ProjectStatus: "Project Status",
            EstimatedTotalProjectCost: "Project Cost ($)",
            ExpectedCompletionDate: "Expected Completion Date",
            PrimaryProjectIRWMGoal: "Primary IRWM Goal",
            ProjectDescription: "Description",
            AgencyName: "Agency",
          };

          columnTemplates = Object.keys(fields).map((fieldName: string) => {
            return new FieldColumnTemplate({
              fieldName: fieldName,
              direction: fieldName === "ProjectName" ? "asc" : null,
              editable: false,
              visible: fieldName === "OBJECTID" ? false : true,
              label: fields[fieldName],
            });
          });

          config = {
            featureLayerUrl:
              "https://www.ocgis.com/arcpub/rest/services/Environmental_Resources/SOC_IRWM_Projects_Public/FeatureServer/0",
            definitionExpression: "GrantRound = 'TO BE DETERMINED'",
            urlKey,
            exportEnabled: true,
            exportPDF: exportFunctions[urlKey],
            exportFields: fields,
            visibleElements: {
              header: false,
              selectionColumn: false,
              menu: false,
            },
            tableTemplate: new TableTemplate({
              columnTemplates,
            }),
            editingEnabled: false,
          };
          break;
        case "swrp":
          fields = {
            OBJECTID: "ID",
            ProjectName: "Project Name",
            AgencyName: "Agency",
            SWRPProjectScore: "Prioritization Score",
            ProjectStatus: "Project Status",
            EstimatedTotalProjectCost: "Project Cost ($)",
            ExpectedCompletionDate: "Expected Completion Date",
            PrimaryBenefit: "Primary Benefit",
            PrimaryBenefitQuantity: "Value",
            PrimaryBenefitUnits: "Units for Primary Benefit",
            SecondaryBenefit: "Secondary Benefit",
            SecondaryBenefitQuantity: "Value",
            SecondaryBenefitUnits: "Units for Secondary Benefit",
            AdditionalBenefit: "Other Benefit",
            AdditionalBenefitQuantity: "Value",
            AdditionalBenefitUnits: "Units for Other Benefit",
            UseOfPublicLands: "Use of Public Lands",
          };

          columnTemplates = Object.keys(fields).map((fieldName: string) => {
            return new FieldColumnTemplate({
              fieldName: fieldName,
              direction: fieldName === "ProjectName" ? "asc" : null,
              editable: false,
              visible: fieldName === "OBJECTID" ? false : true,
              label: fields[fieldName],
            });
          });

          config = {
            featureLayerUrl:
              "https://www.ocgis.com/arcpub/rest/services/Environmental_Resources/SWRP_Projects_Public/FeatureServer/0",
            urlKey,
            exportEnabled: true,
            exportPDF: exportFunctions[urlKey],
            exportFields: fields,
            visibleElements: {
              header: false,
              selectionColumn: false,
              menu: false,
            },
            tableTemplate: new TableTemplate({
              columnTemplates,
            }),
            editingEnabled: false,
          };
          break;
      }

      writableConfigStore.update((state) => {
        state.config = config;
        return state;
      });
    },
  };

  const state = SvelteStore.derived(
    writableConfigStore,
    ($state) => $state.state
  );
  const urlKey = SvelteStore.derived(
    writableConfigStore,
    ($state) => $state.urlKey
  );

  const config = SvelteStore.derived(
    writableConfigStore,
    ($state) => $state.config
  );

  const getters: ConfigStoreGettersInterface = {
    state,
    urlKey,
    config,
  };

  return {
    getters,
    actions,
  };
};
