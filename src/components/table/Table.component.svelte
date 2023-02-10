<script lang="ts">
  import "@esri/calcite-components/dist/components/calcite-panel";
  import "@esri/calcite-components/dist/components/calcite-block";
  import "@esri/calcite-components/dist/components/calcite-button";
  import { useAppStore } from "$store/index";

  const { tableStore, configStore } = useAppStore();
  const { state } = configStore.getters;
  const tableState = tableStore.getters.state;
  let tableNode: HTMLDivElement;

  $: if (tableNode && $state === "ready") {
    tableStore.actions.init(tableNode);
  }
</script>

<calcite-panel>
  <calcite-block class="min-height pad-15" heightScale="l" open>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <calcite-button
      slot="control"
      icon-start="download"
      loading={$tableState != 'ready'}
      on:click={() => {
        tableStore.actions.export();
      }}>Download Table</calcite-button
    >
    <div bind:this={tableNode} />
  </calcite-block>
</calcite-panel>

<style>
  .min-height {
    min-height: 500px;
  }
  .pad-15 {
    padding: 15px;
  }
</style>
