<template>
  <vnatk-crud :options="crudoptions"> </vnatk-crud>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "../services/service";

export default {
  name: "Role",
  components: {
    VnatkCrud,
  },
  data() {
    return {
      crudoptions: {
        service: service,
        basepath: "/api/vnatk",
        model: "Role",
        title: "Roles",
      },
    };
  },
};
</script>
