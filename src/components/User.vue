<template>
  <div>
    <vnatk-crud :options="crudoptions"> </vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "user",
  components: { VnatkCrud },
  data() {
    return {
      crudoptions: {
        service: service,
        basepath: "/api/vnatk",
        model: "User",
        title: "User",
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
