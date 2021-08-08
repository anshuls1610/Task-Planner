<template>
  <div>
    <vnatk-crud :options="crudoptions"> </vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "note",
  components: { VnatkCrud },
  data() {
    return {
      crudoptions: {
        service: service,
        basepath: "/api/vnatk",
        model: "Note",
        title: "Note",
        create: true,
        read: {
          modeloptions: {},
          serversidepagination: true,
        },
        actions: true,
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
