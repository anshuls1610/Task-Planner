<template>
  <div>
    <vnatk-crud :options="crudoptions"> </vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "role",
  components: { VnatkCrud },
  data() {
    return {
      crudoptions: {
        service: service,
        basepath: "/api/vnatk",
        model: "Role",
        title: "Role",
        create: false,
        read: {
          modeloptions: {},
          serversidepagination: true,
        },
        actions: false,
        override: {
          headers: {},
          actions: [],
        },
      },
    };
  },
  methods: {},
};
</script>
