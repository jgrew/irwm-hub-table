<script lang="ts">
  import MapView from "@arcgis/core/views/MapView";
  import { onMount } from "svelte";
  import { useAppStore } from "$store/index";

  let container: HTMLDivElement;
  const { mapStore } = useAppStore();
  let { map } = mapStore.getters;

  onMount(() => {
    mapStore.actions.setView(
      new MapView({
        container,
        map: $map,
        center: [-117.760746, 33.70296],
        zoom: 9,
      })
    );
  });
</script>

<div class="viewDiv map-panel" bind:this={container} />

<style>
  .viewDiv {
    height: 100%;
    width: 100%;
  }
  .map-panel {
    padding: 0;
    margin: 0;
    height: 600px;
    width: 100%;
    cursor: crosshair !important;
  }
</style>
