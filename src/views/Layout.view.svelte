<script lang="ts">
  import "@esri/calcite-components/dist/components/calcite-shell";
  import { Table } from "$components/index";
  import { useAppStore } from "$store/index";

  const { layoutStore } = useAppStore();

</script>

<calcite-shell content-behind>
  <Table />
</calcite-shell>
