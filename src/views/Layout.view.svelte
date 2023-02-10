<script lang="ts">
  import { onMount } from "svelte";
  import "@esri/calcite-components/dist/components/calcite-shell";
  import { Table } from "$components/index";
  import { useAppStore } from "$store/index";

  const { layoutStore, configStore } = useAppStore();

  onMount(()=>{
    configStore.actions.init();
  })
</script>

<calcite-shell content-behind>
  <Table />
</calcite-shell>
