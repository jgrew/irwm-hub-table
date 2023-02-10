<script lang="ts">
  import { onMount } from "svelte";
  import "@esri/calcite-components/dist/components/calcite-loader";
  import Layout from "./views/Layout.view.svelte";
  import { useAppStore } from "$store/index";

  const { configStore } = useAppStore();
  const { state } = configStore.getters;

  onMount(() => {
    configStore.actions.init();
  });
</script>

{#if $state === "loading"}
  <calcite-loader isActive />
{:else if $state === "ready"}
  <Layout />
{:else}
  <p>error</p>
{/if}
